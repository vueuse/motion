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
  // Lifecycle hooks bindings
  if (options.lifeCycleHooks) {
    registerLifeCycleHooks(instance)
  }

  if (options.syncVariants) {
    registerVariantsSync(instance)
  }

  // Visibility hooks
  if (options.visibilityHooks) {
    registerVisibilityHooks(instance)
  }

  // Event listeners
  if (options.eventListeners) {
    registerEventListeners(instance)
  }
}
