import {
  createObjectProperty,
  createSimpleExpression,
  createObjectExpression,
  createCallExpression,
  findProp,
  isText,
  ConstantTypes,
  NodeTypes,
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
    // NOTE: debug
    // console.log('v-motion transform dir:', dir)
    // console.log('v-motion transform node:', node)
    const result: DirectiveTransformResult = { props: [], needRuntime: true }

    // check `v-motion` directive expression
    const { exp } = dir
    if (!exp) {
      // TODO:
    }

    // find `initial` prop binding
    const prop = findProp(node, 'initial', true, false)
    if (!isBindDirective(prop)) {
      // TODO: should be implement warning or erorr
      // console.warn('TODO')
      // context.onError(new Error('TODO') as CompilerError)
      return result
    }

    // check `initial` prop binding expression
    if (prop.exp == null || prop.arg == null) {
      // TODO: should be implement erorr
      return result
    }

    // transform `initial` prop to `style` attribute
    result.props = [
      createObjectProperty(
        `style`,
        createStyleObjectExpression(prop, node, context),
      ),
    ]

    return result
  }
}

const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

const isBindDirective = (prop: any): prop is DirectiveNode =>
  prop != null && prop.type === NodeTypes.DIRECTIVE && prop.name === 'bind'

const isSimpleExpressionNode = (node: any): node is SimpleExpressionNode =>
  node != null && node.type === NodeTypes.SIMPLE_EXPRESSION

const isCompoundExpressionNode = (node: any): node is CompoundExpressionNode =>
  node != null && node.type === NodeTypes.COMPOUND_EXPRESSION

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
    // for v3.0.3 earlier
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (node as any).isConstant
  } else if ('constType' in node) {
    // for v3.0.3 or later
    return (node.constType as number) > ConstantTypes.NOT_CONSTANT
  } else {
    throw Error('unexpected error')
  }
}

function createStyleObjectExpression(
  prop: DirectiveNode,
  node: ElementNode,
  context: TransformContext,
): Property['value'] {
  const properties: Property[] = []
  if (isSimpleExpressionNode(prop.exp)) {
    if (isConstant(prop.exp)) {
      const { status, value } = evaluateValue(prop.exp.content)
      if (status === 'ok') {
        for (const [key, val] of Object.entries(value as Record<string, any>)) {
          properties.push(
            createObjectProperty(
              key,
              createSimpleExpression(
                String(val),
                true,
                prop.loc,
                ConstantTypes.CAN_STRINGIFY,
              ),
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
          ConstantTypes.NOT_CONSTANT,
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
    const source = createSimpleExpression(
      expression,
      false,
      prop.loc,
      ConstantTypes.NOT_CONSTANT,
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
