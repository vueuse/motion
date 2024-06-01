import { NodeTypes, createSimpleExpression } from '@vue/compiler-core'
import { stringifyStyle } from '@vue/shared'

import type { DirectiveTransform } from '@vue/compiler-core'
import { variantToStyle } from '../utils/transform'

const motionDirectiveTransform: DirectiveTransform = function (
  dir,
  node,
  _context,
) {
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
      property.exp?.ast == null
      || typeof property.exp.ast === 'boolean'
      || property.exp.ast.type !== 'ObjectExpression'
    ) {
      continue
    }

    // collect property and value
    const initialState: Record<string, any> = {}
    for (const p of property.exp.ast.properties) {
      if (
        p.type !== 'ObjectProperty'
        || p.key.type !== 'Identifier'
        || 'value' in p.value === false
      ) {
        continue
      }

      initialState[p.key.name] = p.value.value
    }

    // convert variant to style, then stringify
    const normalized = stringifyStyle(
      // @ts-expect-error does not accept undefined property values, possibly throws runtime error
      variantToStyle(initialState),
    )
    // bind parsed variant style to element
    node.props.push({
      type: NodeTypes.DIRECTIVE,
      name: 'bind',
      arg: createSimpleExpression('style', true, node.loc),
      exp: createSimpleExpression(JSON.stringify(normalized), false, node.loc),
      modifiers: [],
      loc: node.loc,
    })
  }

  return { props: [], needRuntime: true }
}

export default motionDirectiveTransform
