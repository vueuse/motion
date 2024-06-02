import {
  // NodeTypes,
  MERGE_PROPS,
  createCallExpression,
  createObjectExpression,
  createObjectProperty,
  createSimpleExpression,
  // createCompoundExpression,
  findProp,
  isText,
  // NORMALIZE_PROPS,
  // NORMALIZE_STYLE,
} from '@vue/compiler-core'
// import {} from '@vue/compiler-ssr'
// import { stringifyStyle } from '@vue/shared'
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
import { evaluateValue } from './transpile'
// import { ssrRenderDynamicAttr } from '@vue/server-renderer'

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

  const styleExpression = createStyleObjectExpressionFromDirectiveNode(
    prop,
    node,
    _context,
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
  return node != null && node.type === 4
}

// NodeTypes.COMPOUND_EXPRESSION
function isCompoundExpressionNode(node: any): node is CompoundExpressionNode {
  return node != null && node.type === 8
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
): Property['value'] {
  const properties: Property[] = []

  if (isSimpleExpressionNode(prop.exp)) {
    if (isConstant(prop.exp)) {
      const { status, value } = evaluateValue(prop.exp.content)

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

      return createObjectExpression(properties, node.loc)
    }

    if (isSimpleExpressionNode(prop.arg) && isConstant(prop.arg)) {
      return createSimpleExpression(
        [`_ctx.__motionVariantToStyle(`, prop.exp.content, `)`].join(''),
        false,
        node.loc,
      )
    }

    return createSimpleExpression(
      [`_ctx.__motionVariantToStyle(`, prop.exp.content, `)`].join(''),
      false,
    )
  }

  if (isCompoundExpressionNode(prop.exp)) {
    const expression = prop.exp!.children.map(mapNodeContentHandler).join('')
    const source = createSimpleExpression(expression, false, prop.loc, 0)
    const from = createObjectExpression([], prop.loc)

    return createCallExpression(
      context.helper(MERGE_PROPS),
      [source, from],
      node.loc,
    )
  }

  return createObjectExpression(properties, node.loc)
}
