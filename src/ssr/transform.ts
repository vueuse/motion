import {
  createObjectProperty,
  createSimpleExpression,
  createObjectExpression,
  createCallExpression,
  findProp,
  isText,
  MERGE_PROPS,
} from '@vue/compiler-core'
import { isString } from '@vueuse/core'
import { evaluateValue } from './transpile'
import type {
  DirectiveTransform,
  DirectiveNode,
  SimpleExpressionNode,
  CompoundExpressionNode,
  TransformContext,
  TextNode,
  ElementNode,
  InterpolationNode,
  Property,
} from '@vue/compiler-core'
import type { MotionVariants } from '../types'

type DirectiveTransformResult = ReturnType<DirectiveTransform>

export function transform(variants?: MotionVariants): DirectiveTransform {
  return (dir, node, context): DirectiveTransformResult => {
    // Debug logging
    // console.log({ dir, node, context })

    const result: DirectiveTransformResult = { props: [], needRuntime: true }

    // Check `v-motion` directive expression
    const { exp } = dir
    if (exp) {
      // TODO: Handle { initial: { ...} } expression
      // console.log({ exp })

      console.log(createObjectProperty('style', exp))
    }

    // Find `initial` prop binding
    const prop = findProp(node, 'initial', true, false)
    // Check if `initial` prop binding exists
    if (!isBindDirective(prop) || prop.exp == null || prop.arg == null) {
      return result
    }

    /*
    console.log({
      prop,
      node,
      context,
    })
    */

    // Transform `initial` prop to `style` attribute
    result.props = [
      createObjectProperty(
        `style`,
        createStyleObjectExpressionFromDirectiveNode(prop, node, context),
      ),
    ]

    return result
  }
}

const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

// NodeTypes.DIRECTIVE
const isBindDirective = (prop: any): prop is DirectiveNode =>
  prop != null && prop.type === 7 && prop.name === 'bind'

// NodeTypes.SIMPLE_EXPRESSION
const isSimpleExpressionNode = (node: any): node is SimpleExpressionNode =>
  node != null && node.type === 4

// NodeTypes.COMPOUND_EXPRESSION
const isCompoundExpressionNode = (node: any): node is CompoundExpressionNode =>
  node != null && node.type === 8

// @ts-ignore
function mapNodeContentHanlder(
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
  } else if (isSymbol(value)) {
    return value.description || ''
  } else if (isSimpleExpressionNode(value)) {
    return value.content
  } else if (isCompoundExpressionNode(value)) {
    return value.children.map(mapNodeContentHanlder).join('')
  } else if (isText(value)) {
    if (isString(value.content)) {
      return value.content
    } else if (isSimpleExpressionNode(value.content)) {
      return value.content.content
    } else if (isCompoundExpressionNode(value.content)) {
      return value.content.children.map(mapNodeContentHanlder).join('')
    } else {
      return ''
    }
  } else {
    return ''
  }
}

function isConstant(node: SimpleExpressionNode): boolean {
  if ('isConstant' in node) {
    // For v3.0.3 earlier
    return (node as any).isConstant
  } else if ('constType' in node) {
    // For v3.0.3 or later
    return (node.constType as number) > 0
  } else {
    throw Error('Unexpected error while transforming a v-motion directive.')
  }
}

function createStyleObjectExpressionFromDirectiveNode(
  prop: DirectiveNode,
  node: ElementNode,
  context: TransformContext,
): Property['value'] {
  const properties: Property[] = []

  // @ts-ignore
  const content = prop.exp.content

  if (isSimpleExpressionNode(prop.exp)) {
    if (isConstant(prop.exp)) {
      const { status, value } = evaluateValue(prop.exp.content)

      if (status === 'ok') {
        for (const [key, val] of Object.entries(value as Record<string, any>)) {
          properties.push(
            createObjectProperty(
              key,
              createSimpleExpression(String(val), true, prop.loc, 3),
            ),
          )
        }
      }

      return createObjectExpression(properties, node.loc)
    } else {
      if (isSimpleExpressionNode(prop.arg) && isConstant(prop.arg)) {
        const source = createSimpleExpression(
          prop.exp.content,
          false,
          prop.loc,
          0,
        )
        const from = createObjectExpression([], prop.loc)
        return createCallExpression(
          context.helper(MERGE_PROPS),
          [source, from],
          node.loc,
        )
      } else {
        return createObjectExpression(properties, node.loc)
      }
    }
  } else if (isCompoundExpressionNode(prop.exp)) {
    const expression = prop.exp!.children.map(mapNodeContentHanlder).join('')
    const source = createSimpleExpression(expression, false, prop.loc, 0)
    const from = createObjectExpression([], prop.loc)

    return createCallExpression(
      context.helper(MERGE_PROPS),
      [source, from],
      node.loc,
    )
  } else {
    return createObjectExpression(properties, node.loc)
  }
}
