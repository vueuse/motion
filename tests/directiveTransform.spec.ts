import { computed, createSSRApp, ref } from 'vue'
// import { renderToString } from '@vue/test-utils'
import { renderToString } from '@vue/server-renderer'
import { describe, expect, it } from 'vitest'
import { MotionPlugin } from '../src'
import { directiveTransform as MotionDirectiveTransform } from '../src/directive/transform'

describe('directiveTransform', () => {
  // it('renders style provided by `:initial` prop variant during SSR', async () => {
  //   const template = `<div v-motion :initial="{ opacity: 0, x: 100 }"></div>`

  //   const Component = defineComponent({
  //     template,
  //     directives: { motion: MotionDirective() },
  //     compilerOptions: {
  //       // @ts-expect-error does not accept `directiveTransforms`?
  //       directiveTransforms: { motion: MotionDirectiveTransform },
  //     },
  //   })

  //   expect(await renderToString(Component)).toMatchInlineSnapshot(
  //     `"<div style="opacity:0;transform:translateZ(0px);"></div>"`,
  //   )
  // })

  it('renders style provided by `:initial` prop variant during SSR', async () => {
    // const template = `<div v-motion :initial="{ ...initialState }"></div>`

    const app = createSSRApp({
      // template: `<div v-motion style="color: red; opacity: 1;" :initial="{...initialState}" ></div>`,
      // template: `<div v-motion-fade :initial="{ x: 100, scale: 50 }" style="color: red; opacity: 1" ></div>`,
      template: `<div v-motion style="color: red; opacity: 1;" :initial="{ opacity: 0, x: 100 }" ></div>`,
      setup: () => {
        const myValue = ref(100)
        return {
          initialState: computed(() => ({
            opacity: 0,
            x: myValue.value,
            scale: 10,
          })),
        }
      },
      // directives: { motion: MotionDirective() },
      // data: () => ({}),
      compilerOptions: {
        // @ts-expect-error does not accept `directiveTransforms`?
        directiveTransforms: {
          'motion': MotionDirectiveTransform,
          'motion-fade': MotionDirectiveTransform,
        },
      },
    })

    app.use(MotionPlugin)

    // const Component = defineComponent({
    //   template,
    //   setup() {
    //     const initialState = computed(() => ({
    //       opacity: 0,
    //       x: 100,
    //     }))

    //     return { initialState }
    //   },
    // })

    expect(await renderToString(app)).toMatchInlineSnapshot(
      `"<div style="opacity:1;transform:translate3d(100px,0px,0px);color:red;"></div>"`,
    )
  })
})
