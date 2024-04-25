import { type Mock, vi } from 'vitest'
import { h } from 'vue'
import { MotionComponent } from '../../src/components'

export function useCompletionFn() {
  return vi.fn(() => {})
}

// Get component using either `v-motion` directive or `<Motion>` component
export function getTestComponent(t: string) {
  if (t === 'directive') {
    return { template: `<div v-motion>Hello world</div>` }
  }

  return { render: () => h(MotionComponent) }
}

// Waits until mock has been called and resets the call count
export async function waitForMockCalls(fn: Mock, calls = 1, options: Parameters<typeof vi.waitUntil>['1'] = { interval: 10 }) {
  try {
    await vi.waitUntil(() => fn.mock.calls.length === calls, options)
    fn.mockReset()
  } catch (e) {
    console.error(`Waited for ${calls} calls but failed at ${fn.mock.calls.length} calls.`)
    throw e
  }
}
