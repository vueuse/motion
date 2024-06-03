import { computed, createSSRApp, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { describe, expect, it } from 'vitest'
import { MotionPlugin } from '../src'
import { directiveTransform as MotionDirectiveTransform } from '../src/directive/transform'

describe('directiveTransform', () => {
  const compilerOptions = {
    directiveTransforms: {
      'motion': MotionDirectiveTransform,
      'motion-fade-visible': MotionDirectiveTransform,
    },
  }

  it('renders `:initial` variant style during SSR (constant)', async () => {
    const app = createSSRApp({
      template: `<div v-motion :initial="{ opacity: 0, x: 100 }"></div>`,
      // @ts-expect-error does not accept `directiveTransforms`?
      compilerOptions,
    })

    app.use(MotionPlugin)

    expect(await renderToString(app)).toMatchInlineSnapshot(
      `"<div style="opacity:0;transform:translate3d(100px,0px,0px);"></div>"`,
    )
  })

  it('renders `:initial` variant style during SSR (compound)', async () => {
    const app = createSSRApp({
      template: `<div v-motion :initial="{ ...state }"></div>`,
      setup: () => {
        const myValue = ref(100)

        return {
          state: computed(() => ({
            opacity: 0,
            x: myValue.value,
            scale: 10,
          })),
        }
      },
      // @ts-expect-error does not accept `directiveTransforms`?
      compilerOptions,
    })

    app.use(MotionPlugin)

    expect(await renderToString(app)).toMatchInlineSnapshot(
      `"<div style="opacity:0;transform:translate3d(100px,0px,0px) scale(10);"></div>"`,
    )
  })

  it('merges and overwrites element style with `:initial` variant style during SSR', async () => {
    const app = createSSRApp({
      template: `<div style="opacity: 1; color: red;" v-motion :initial="{ opacity: 0, x: 100 }"></div>`,
      setup() {
        return { state: { x: 100, opacity: 50 } }
      },
      // @ts-expect-error does not accept `directiveTransforms`?
      compilerOptions,
    })

    app.use(MotionPlugin)

    expect(await renderToString(app)).toMatchInlineSnapshot(
      `"<div style="opacity:0;color:red;transform:translate3d(100px,0px,0px);"></div>"`,
    )
  })

  it('merges and overwrites preset variant style with `:initial` variant style during SSR', async () => {
    const app = createSSRApp({
      template: `<div v-motion-fade-visible :initial="state"></div>`,
      setup() {
        return { state: { x: 100, scale: 50 } }
      },
      // @ts-expect-error does not accept `directiveTransforms`?
      compilerOptions,
    })

    app.use(MotionPlugin)

    expect(await renderToString(app)).toMatchInlineSnapshot(
      `"<div style="opacity:0;transform:translate3d(100px,0px,0px) scale(50);"></div>"`,
    )
  })
})
