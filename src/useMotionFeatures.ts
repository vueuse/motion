import { Fn, tryOnUnmounted } from '@vueuse/core'
import { ref } from 'vue-demi'
import { registerEventListeners } from './features/eventListeners'
import { registerLifeCycleHooks } from './features/lifeCycleHooks'
import { registerVariantsSync } from './features/syncVariants'
import { registerVisibilityHooks } from './features/visibilityHooks'
import { MotionInstance, MotionVariants, UseMotionOptions } from './types'

/**
 * A Composable executing resolved variants features from variants declarations.
 *
 * Supports:
 * - lifeCycleHooks: Bind the motion hooks to the component lifecycle hooks.
 *
 * @param variant
 * @param variants
 * @param options
 */
export function useMotionFeatures<T extends MotionVariants>(
  instance: MotionInstance<T>,
  options: UseMotionOptions = {
    syncVariants: true,
    lifeCycleHooks: true,
    visibilityHooks: true,
    eventListeners: true,
  },
) {
  // Features stop callback to enforce it
  const toStop = ref<Fn[]>([])

  // Lifecycle hooks bindings
  if (options.lifeCycleHooks) {
    const { stop: stopLifeCycleHooks } = registerLifeCycleHooks(instance)

    toStop.value.push(stopLifeCycleHooks)
  }

  if (options.syncVariants) {
    const { stop: stopVariantSync } = registerVariantsSync(instance)

    toStop.value.push(stopVariantSync)
  }

  // Visibility hooks
  if (options.visibilityHooks) {
    const { stop: stopVisibilityHooks } = registerVisibilityHooks(instance)

    toStop.value.push(stopVisibilityHooks)
  }

  // Event listeners
  if (options.eventListeners) {
    const { stop: stopEventListeners } = registerEventListeners(instance)

    toStop.value.push(stopEventListeners)
  }

  // Stop all the registered features
  const stop = () => toStop.value.forEach((_stop) => _stop())

  // Enforce cleanup on unmounted
  tryOnUnmounted(stop)

  return { stop }
}
