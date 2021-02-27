import sync, { FrameData, getFrameData } from 'framesync'
import { velocityPerSecond } from 'popmotion'
import { PassiveEffect, StartAnimation, Subscriber } from './types'
import { SubscriptionManager } from './utils/subscription-manager'

const isFloat = (value: any): value is string => {
  return !isNaN(parseFloat(value))
}

/**
 * `MotionValue` is used to track the state and velocity of motion values.
 */
export class MotionValue<V = any> {
  /**
   * The current state of the `MotionValue`.
   */
  private current: V

  /**
   * The previous state of the `MotionValue`.
   */
  private prev: V

  /**
   * Duration, in milliseconds, since last updating frame.
   */
  private timeDelta: number = 0

  /**
   * Timestamp of the last time this `MotionValue` was updated.
   */
  private lastUpdated: number = 0

  /**
   * Functions to notify when the `MotionValue` updates.
   */
  updateSubscribers = new SubscriptionManager<Subscriber<V>>()

  /**
   * Functions to notify when the `MotionValue` updates and `render` is set to `true`.
   */
  private renderSubscribers = new SubscriptionManager<Subscriber<V>>()

  /**
   * Add a passive effect to this `MotionValue`.
   */
  private passiveEffect?: PassiveEffect<V>

  /**
   * A reference to the currently-controlling Popmotion animation
   */
  private stopAnimation?: null | (() => void)

  /**
   * Tracks whether this value can output a velocity.
   */
  private canTrackVelocity = false

  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   */
  constructor(init: V) {
    this.current = init
    this.canTrackVelocity = isFloat(this.current)
  }

  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   */
  onChange(subscription: Subscriber<V>): () => void {
    return this.updateSubscribers.add(subscription)
  }

  clearListeners() {
    this.updateSubscribers.clear()
  }

  /**
   * Adds a function that will be notified when the `MotionValue` requests a render.
   */
  onRenderRequest(subscription: Subscriber<V>) {
    // Render immediately
    subscription(this.get())

    return this.renderSubscribers.add(subscription)
  }

  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @param passiveEffect
   */
  attach(passiveEffect: PassiveEffect<V>) {
    this.passiveEffect = passiveEffect
  }

  /**
   * Sets the state of the `MotionValue`.
   *
   * @param v
   * @param render
   */
  set(v: V, render = true) {
    if (this.current === undefined && !this.canTrackVelocity) {
      this.canTrackVelocity = isFloat(v)
    }

    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v, render)
    } else {
      this.passiveEffect(v, this.updateAndNotify)
    }
  }

  /**
   * Update and notify `MotionValue` subscribers.
   *
   * @param v
   * @param render
   */
  updateAndNotify = (v: V, render = true) => {
    this.prev = this.current
    this.current = v

    if (this.prev !== this.current) {
      this.updateSubscribers.notify(this.current)
    }

    if (render) {
      this.renderSubscribers.notify(this.current)
    }

    // Update timestamp
    const { delta, timestamp } = getFrameData()

    if (this.lastUpdated !== timestamp) {
      this.timeDelta = delta
      this.lastUpdated = timestamp
      sync.postRender(this.scheduleVelocityCheck)
    }
  }

  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   */
  get() {
    return this.current
  }

  /**
   * Get previous value.
   *
   * @returns - The previous latest state of `MotionValue`
   */
  getPrevious() {
    return this.prev
  }

  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   */
  getVelocity() {
    // This could be isFloat(this.prev) && isFloat(this.current), but that would be wasteful
    return this.canTrackVelocity
      ? // These casts could be avoided if parseFloat would be typed better
        velocityPerSecond(
          parseFloat(this.current as any) - parseFloat(this.prev as any),
          this.timeDelta,
        )
      : 0
  }

  /**
   * Schedule a velocity check for the next frame.
   */
  private scheduleVelocityCheck = () => sync.postRender(this.velocityCheck)

  /**
   * Updates `prev` with `current` if the value hasn't been updated this frame.
   * This ensures velocity calculations return `0`.
   */
  private velocityCheck = ({ timestamp }: FrameData) => {
    if (timestamp !== this.lastUpdated) {
      this.prev = this.current
    }
  }

  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   */
  start(animation: StartAnimation) {
    this.stop()

    return new Promise((resolve) => {
      const { stop } = animation(resolve as () => void)

      this.stopAnimation = stop
    }).then(() => this.clearAnimation())
  }

  /**
   * Stop the currently active animation.
   */
  stop() {
    if (this.stopAnimation) this.stopAnimation()

    this.clearAnimation()
  }

  /**
   * Returns `true` if this value is currently animating.
   */
  isAnimating() {
    return !!this.stopAnimation
  }

  private clearAnimation() {
    this.stopAnimation = null
  }

  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   */
  destroy() {
    this.updateSubscribers.clear()
    this.renderSubscribers.clear()
    this.stop()
  }
}

export function getMotionValue<V>(init: V) {
  return new MotionValue<V>(init)
}
