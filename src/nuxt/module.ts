import { defu } from 'defu'
import {
  addComponent,
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import { NodeTypes, createSimpleExpression } from '@vue/compiler-core'
import { stringifyStyle } from '@vue/shared'

import type { NuxtModule } from '@nuxt/schema'
import type { ModuleOptions as MotionModuleOpts } from '../types'

export interface ModuleOptions extends MotionModuleOpts<string> {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vueuse/motion',
    configKey: 'motion',
  },
  defaults: {},
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Push options and merge to runtimeConfig
    nuxt.options.runtimeConfig.motion = defu(
      nuxt.options.runtimeConfig?.motion || {},
      options,
    )

    // Add templates (options and directives)
    addPlugin(resolve('./runtime/templates/motion'))

    // Add auto imports
    addImportsDir(resolve('./runtime/composables'))

    // Add components
    addComponent({
      name: 'Motion',
      export: 'MotionComponent',
      filePath: '@vueuse/motion',
    })

    addComponent({
      name: 'MotionGroup',
      export: 'MotionGroupComponent',
      filePath: '@vueuse/motion',
    })

    nuxt.options.vue.compilerOptions.directiveTransforms ??= {}
    nuxt.options.vue.compilerOptions.directiveTransforms.motion = (
      dir,
      node,
      _context,
    ) => {
      for (const property of node.props) {
        // only handle :initial
        if (
          property.type !== NodeTypes.DIRECTIVE
          || property.name !== 'bind'
          || property.rawName !== ':initial'
        ) {
          continue
        }

        // :initial should contain an object
        if (
          property.exp == null
          || property.exp.ast == null
          || typeof property.exp.ast === 'boolean'
          || property.exp.ast.type !== 'ObjectExpression'
        ) {
          continue
        }

        // collect property and value
        const initialState: Record<string, any> = {}
        for (const p of property.exp.ast.properties) {
          if (
            p.type === 'ObjectProperty'
            && p.key.type === 'Identifier'
            && 'value' in p.value
          ) {
            initialState[p.key.name] = p.value.value
          }
        }

        // bind parsed variant style to element
        const normalized = stringifyStyle(initialState)
        node.props.push({
          type: NodeTypes.DIRECTIVE,
          name: 'bind',
          arg: createSimpleExpression('style', true, node.loc),
          exp: createSimpleExpression(
            JSON.stringify(normalized),
            false,
            node.loc,
          ),
          modifiers: [],
          // loc: { ...node.loc, start: node.loc.end },
          loc: node.loc,
        })
      }

      return { props: [], needRuntime: true }
    }

    // Transpile necessary packages
    if (!nuxt.options.build.transpile)
      nuxt.options.build.transpile = []
    const transpileList = [
      'defu',
      '@vueuse/motion',
      '@vueuse/shared',
      '@vueuse/core',
    ]
    transpileList.forEach((pkgName) => {
      if (!nuxt.options.build.transpile.includes(pkgName))
        nuxt.options.build.transpile.push(pkgName)
    })
  },
}) satisfies NuxtModule
