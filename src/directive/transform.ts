import {
  NodeTypes,
  createArrayExpression,
  createObjectExpression,
  createObjectProperty,
  createSimpleExpression,
  findProp,
  isText,
} from '@vue/compiler-core'
import type {
  CompoundExpressionNode,
  DirectiveNode,
  DirectiveTransform,
  ElementNode,
  InterpolationNode,
  Property,
  SimpleExpressionNode,
  TextNode,
  TransformContext,
} from '@vue/compiler-core'
import { variantToStyle } from '../utils/transform'
import * as presets from '../presets'
import { evaluateValue } from './transpile'

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
  const result = { props: [], needRuntime: true }

  // Find `:initial` prop binding
  const prop = findProp(node, 'initial', true, false)
  if (prop == null || 'exp' in prop === false || prop.arg == null) {
    return result
  }

  // console.log(dir.name.startsWith('motion-'))
  let preset: Record<string, any> | undefined
  if (dir.name.startsWith('motion-')) {
    const parts = dir.name.split('motion-').at(1)?.split('-')

    if (parts) {
      const presetName
        = parts[0]
        + parts.slice(1).map(x => x.slice(0, 1).toUpperCase() + x.slice(1))

      if (presetName in presets) {
        // @ts-expect-error fix types
        preset = variantToStyle(structuredClone(presets[presetName].initial))
      }
    }
  }

  const styleExpression = createStyleObjectExpressionFromDirectiveNode(
    prop,
    node,
    _context,
    preset,
  )

  const styleProp = createObjectProperty('style', styleExpression)

  return {
    props: [styleProp],
    needRuntime: true,
  }
}

const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

const isString = (val: unknown): val is string => typeof val === 'string'

// NodeTypes.DIRECTIVE
// function isBindDirective(prop: any): prop is DirectiveNode {
//   return prop != null && prop.type === 7 && prop.name === 'bind'
// }

// NodeTypes.SIMPLE_EXPRESSION
function isSimpleExpressionNode(node: any): node is SimpleExpressionNode {
  return node != null && node.type === NodeTypes.SIMPLE_EXPRESSION
}

// NodeTypes.COMPOUND_EXPRESSION
function isCompoundExpressionNode(node: any): node is CompoundExpressionNode {
  return node != null && node.type === NodeTypes.COMPOUND_EXPRESSION
}

function mapNodeContentHandler(
  value:
    | string
    | symbol
    | SimpleExpressionNode
    | CompoundExpressionNode
    | TextNode
    | InterpolationNode,
): string {
  if (isString(value)) {
    return value
  }
  else if (isSymbol(value)) {
    return value.description || ''
  }
  else if (isSimpleExpressionNode(value)) {
    return value.content
  }
  else if (isCompoundExpressionNode(value)) {
    return value.children.map(mapNodeContentHandler).join('')
  }
  else if (isText(value)) {
    if (isString(value.content)) {
      return value.content
    }
    else if (isSimpleExpressionNode(value.content)) {
      return value.content.content
    }
    else if (isCompoundExpressionNode(value.content)) {
      return value.content.children.map(mapNodeContentHandler).join('')
    }
    else {
      return ''
    }
  }
  else {
    return ''
  }
}

function isConstant(node: SimpleExpressionNode): boolean {
  if ('isConstant' in node) {
    // For v3.0.3 earlier
    return (node as any).isConstant
  }
  else if ('constType' in node) {
    // For v3.0.3 or later
    return (node.constType as number) > 0
  }
  else {
    throw new Error('Unexpected error while transforming a v-motion directive.')
  }
}

function createStyleObjectExpressionFromDirectiveNode(
  prop: DirectiveNode,
  node: ElementNode,
  context: TransformContext,
  preset?: Record<string, any>,
): Property['value'] {
  const properties: Property[] = []
  // const presetProperties: Property[] = []
  const presetSerialized = JSON.stringify(preset)
  const prefix = context.prefixIdentifiers ? '_ctx.' : ''
  const variantToStyleFn = `${prefix}__motionVariantToStyle`

  if (isSimpleExpressionNode(prop.exp)) {
    if (isConstant(prop.exp)) {
      const { status, value } = evaluateValue(prop.exp.content)

      // Add preset values first
      // if (preset) {
      //   for (const [key, val] of Object.entries(preset)) {
      //     presetProperties.push(
      //       createObjectProperty(
      //         key,
      //         createSimpleExpression(String(val), true, prop.loc, 3),
      //       ),
      //     )
      //   }
      // }

      if (status === 'ok') {
        // convert variant to style
        const processed = variantToStyle(value as any)
        for (const [key, val] of Object.entries(
          processed as Record<string, any>,
        )) {
          properties.push(
            createObjectProperty(
              key,
              createSimpleExpression(String(val), true, prop.loc, 3),
            ),
          )
        }
      }

      if (preset) {
        return createArrayExpression([
          createSimpleExpression(presetSerialized),
          createObjectExpression(properties),
        ])
      }

      return createObjectExpression(properties, node.loc)
    }

    if (preset) {
      return createArrayExpression([
        createSimpleExpression(presetSerialized),
        createSimpleExpression(
          `${variantToStyleFn}(${prop.exp.content})`,
          false,
        ),
      ])
    }

    return createSimpleExpression(
      `${variantToStyleFn}(${prop.exp.content})`,
      false,
    )
  }

  if (isCompoundExpressionNode(prop.exp)) {
    const expression = prop.exp!.children.map(mapNodeContentHandler).join('')

    if (preset) {
      return createArrayExpression([
        createSimpleExpression(presetSerialized),
        createSimpleExpression(`${variantToStyleFn}(${expression})`, false),
      ])
    }

    return createSimpleExpression(`${variantToStyleFn}(${expression})`, false)
  }

  return createObjectExpression(properties, node.loc)
}
