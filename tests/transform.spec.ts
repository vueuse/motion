import { transform } from '../src/ssr/transform'
import * as runtimeDom from '@vue/runtime-dom'
import { MotionDirective } from '../src/index'
import { compile } from '@vue/compiler-ssr'
import { defineComponent, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { describe, test, expect } from 'vitest'

describe('transform', () => {
  test('initial: basic', async () => {
    const source = `<div v-motion :initial="{ scale: 1, opacity: 1 }" :focused="{ scale: 1.1 }">Hello world</div>`
    const { code, ast } = compile(source, {
      mode: 'function',
      directiveTransforms: {
        motion: transform(),
      },
    })
    expect(code).toMatchSnapshot(source)
    expect(ast).toMatchSnapshot(source)
    const render = Function('require', 'Vue', code)(require, runtimeDom)
    const App = defineComponent({
      directives: {
        motion: MotionDirective(),
      },
      ssrRender: render,
    })
    const app = createSSRApp(App)
    expect(await renderToString(app)).toMatch(
      `<div style="scale:1;opacity:1;">Hello world</div>`,
    )
  })

  test('initial: simple binding', async () => {
    const source = `<div v-motion :initial="initial">Hello world</div>`
    const { code, ast } = compile(source, {
      mode: 'function',
      directiveTransforms: {
        motion: transform(),
      },
    })
    expect(code).toMatchSnapshot(source)
    expect(ast).toMatchSnapshot(source)
    const render = Function('require', 'Vue', code)(require, runtimeDom)
    const App = defineComponent({
      directives: {
        motion: MotionDirective(),
      },
      ssrRender: render,
      data() {
        return { initial: { scale: 1, opacity: 1 } }
      },
    })
    const app = createSSRApp(App)
    expect(await renderToString(app)).toMatch(
      `<div style="scale:1;opacity:1;">Hello world</div>`,
    )
  })

  test('initial: compound binding', async () => {
    const source = `<div v-motion :initial="{ opacity: opa, scale }">Hello world</div>`
    const { code, ast } = compile(source, {
      mode: 'function',
      directiveTransforms: {
        motion: transform(),
      },
    })
    expect(code).toMatchSnapshot(source)
    expect(ast).toMatchSnapshot(source)
    const render = Function('require', 'Vue', code)(require, runtimeDom)
    const App = defineComponent({
      directives: {
        motion: MotionDirective(),
      },
      ssrRender: render,
      data() {
        return { scale: 1, opa: 1 }
      },
    })
    const app = createSSRApp(App)
    expect(await renderToString(app)).toMatch(
      `<div style="scale:1;opacity:1;">Hello world</div>`,
    )
  })

  test('with static style', async () => {
    const source = `<div v-motion :initial="{ scale: 1, opacity: 1 }" style="color:red">Hello world</div>`
    const { code, ast } = compile(source, {
      mode: 'function',
      directiveTransforms: {
        motion: transform(),
      },
    })
    expect(code).toMatchSnapshot(source)
    expect(ast).toMatchSnapshot(source)
    const render = Function('require', 'Vue', code)(require, runtimeDom)
    const App = defineComponent({
      directives: {
        motion: MotionDirective(),
      },
      ssrRender: render,
    })
    const app = createSSRApp(App)
    expect(await renderToString(app)).toMatch(
      `<div style="scale:1;opacity:1;color:red;">Hello world</div>`,
    )
  })

  test('with dynamic style', async () => {
    const source = `<div v-motion :initial="{ scale: 1, opacity: 1 }" :style="{ color: 'green' }">Hello world</div>`
    const { code, ast } = compile(source, {
      mode: 'function',
      directiveTransforms: {
        motion: transform(),
      },
    })
    expect(code).toMatchSnapshot(source)
    expect(ast).toMatchSnapshot(source)
    const render = Function('require', 'Vue', code)(require, runtimeDom)
    const App = defineComponent({
      directives: {
        motion: MotionDirective(),
      },
      ssrRender: render,
    })
    const app = createSSRApp(App)
    expect(await renderToString(app)).toMatch(
      `<div style="scale:1;opacity:1;color:green;">Hello world</div>`,
    )
  })

  test('with style binidng', async () => {
    const source = `<div v-motion :initial="{ scale: 1, opacity: 1 }" :style="{ color: activeColor, fontSize: fontSize + 'px' }">Hello world</div>`
    const { code, ast } = compile(source, {
      mode: 'function',
      directiveTransforms: {
        motion: transform(),
      },
    })
    expect(code).toMatchSnapshot(source)
    expect(ast).toMatchSnapshot(source)
    const render = Function('require', 'Vue', code)(require, runtimeDom)
    const App = defineComponent({
      directives: {
        motion: MotionDirective(),
      },
      data() {
        return { activeColor: 'blue', fontSize: 10 }
      },
      ssrRender: render,
    })
    const app = createSSRApp(App)
    expect(await renderToString(app)).toMatch(
      `<div style="scale:1;opacity:1;color:blue;font-size:10px;">Hello world</div>`,
    )
  })

  test('with static + dynamic style', async () => {
    const source = `<div v-motion :initial="{ scale: 1, opacity: 1 }" style="color:red" :style="{ fontSize: '14px' }">Hello world</div>`
    const { code, ast } = compile(source, {
      mode: 'function',
      directiveTransforms: {
        motion: transform(),
      },
    })
    expect(code).toMatchSnapshot(source)
    expect(ast).toMatchSnapshot(source)
    const render = Function('require', 'Vue', code)(require, runtimeDom)
    const App = defineComponent({
      directives: {
        motion: MotionDirective(),
      },
      ssrRender: render,
    })
    const app = createSSRApp(App)
    expect(await renderToString(app)).toMatch(
      `<div style="scale:1;opacity:1;color:red;font-size:14px;">Hello world</div>`,
    )
  })

  test('with v-show', async () => {
    const source = `<div v-motion :initial="{ scale: 1, opacity: 1 }" style="color:red;" v-show="hide">Hello world</div>`
    const { code, ast } = compile(source, {
      mode: 'function',
      directiveTransforms: {
        motion: transform(),
      },
    })
    expect(code).toMatchSnapshot(source)
    expect(ast).toMatchSnapshot(source)
    const render = Function('require', 'Vue', code)(require, runtimeDom)
    const App = defineComponent({
      directives: {
        motion: MotionDirective(),
      },
      data() {
        return { hide: false }
      },
      ssrRender: render,
    })
    const app = createSSRApp(App)
    expect(await renderToString(app)).toMatch(
      `<div style="scale:1;opacity:1;color:red;display:none;">Hello world</div>`,
    )
  })
})
