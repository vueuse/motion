import { registerEventListeners } from './features/eventListeners'
import { registerLifeCycleHooks } from './features/lifeCycleHooks'
import { registerVariantsSync } from './features/syncVariants'
import { registerVisibilityHooks } from './features/visibilityHooks'
import type { MotionInstance, MotionVariants, UseMotionOptions } from './types'

/**
 * A Composable executing resolved variants features from variants declarations.
 *
 * Supports:
 * - lifeCycleHooks: Bind the motion hooks to the component lifecycle hooks.
 */
export function useMotionFeatures<T extends string, V extends MotionVariants<T>>(
  instance: MotionInstance<T, V>,
  options: UseMotionOptions = {
    syncVariants: true,
    lifeCycleHooks: true,
    visibilityHooks: true,
    eventListeners: true,
  },
) {
  // Lifecycle hooks bindings
  if (options.lifeCycleHooks)
    registerLifeCycleHooks(instance)

  if (options.syncVariants)
    registerVariantsSync(instance)

  // Visibility hooks
  if (options.visibilityHooks)
    registerVisibilityHooks(instance)

  // Event listeners
  if (options.eventListeners)
    registerEventListeners(instance)
}
