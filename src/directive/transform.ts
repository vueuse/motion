import {
  NodeTypes,
  createArrayExpression,
  createCallExpression,
  createObjectExpression,
  createObjectProperty,
  createSimpleExpression,
  findProp,
} from '@vue/compiler-core'
import type {
  AttributeNode,
  DirectiveNode,
  DirectiveTransform,
  ElementNode,
  Property,
  TransformContext,
} from '@vue/compiler-core'
import { variantToStyle } from '../utils/transform'
import * as presets from '../presets'

/**
 * Transforms elements that use the `v-motion` directive for SSR support.
 *
 * If an elements has `v-motion` as well as an `:initial` bind, this transformation
 * extracts and parses the variant passed to `:initial` and binds its resulting style.
 *
 * This is necessary as a directive does not have access to the node during SSR.
 */
export const directiveTransform: DirectiveTransform = function (
  dir,
  node,
  _context,
) {
  // Find `:initial` prop binding
  const prop = findProp(node, 'initial', true, false)

  // Retrieve preset variant style preset directive is used (pattern: motion-[PRESET_KEBAB_CASE])
  let preset: Record<string, any> | undefined
  if (dir.name.startsWith('motion-')) {
    const parts = dir.name.split('motion-').at(1)?.split('-')

    if (parts) {
      const presetName
        = parts[0]
        + parts
          .slice(1)
          .map(x => x.slice(0, 1).toUpperCase() + x.slice(1))
          .join('')

      if (presetName in presets) {
        // @ts-expect-error fix types
        preset = variantToStyle(presets[presetName].initial)
      }
      // console.log(dir.name, presetName, preset)
    }
  }

  const styleExpression = createStyleObjectExpressionFromDirectiveNode(
    prop,
    node,
    _context,
    preset,
  )

  return {
    props: [createObjectProperty('style', styleExpression)],
    needRuntime: true,
  }
}

function createStyleObjectExpressionFromDirectiveNode(
  prop: DirectiveNode | AttributeNode | undefined,
  node: ElementNode,
  context: TransformContext,
  preset?: Record<string, any>,
): Property['value'] {
  const presetSerialized = JSON.stringify(preset)
  const prefix = context.prefixIdentifiers ? '_ctx.' : ''
  const variantToStyleFn = `${prefix}__motionVariantToStyle`

  if (prop == null || prop.type === NodeTypes.ATTRIBUTE || prop.exp == null) {
    if (preset) {
      return createArrayExpression([
        createCallExpression(variantToStyleFn, [
          createSimpleExpression(presetSerialized),
        ]),
      ])
    }
    return createObjectExpression([], node.loc)
  }

  /**
   * Return array of parsed preset variant style and
   * call expression that returns parsed variant style from ":initial"
   */
  if (preset) {
    return createArrayExpression([
      createCallExpression(variantToStyleFn, [
        createSimpleExpression(presetSerialized),
      ]),
      createCallExpression(variantToStyleFn, [prop.exp]),
    ])
  }

  /**
   * Return call expression that returns parsed variant style from ":initial"
   */
  return createCallExpression(variantToStyleFn, [prop.exp])
}
