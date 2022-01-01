/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from '@babel/parser'

interface EvaluateReturn {
  status: 'ok' | 'ng'
  value?: unknown
}

type NestedValue<T> = { [P in keyof T]: NestedValue<T[P]> }

export type TranslationParams<T = Record<string, unknown>> = {
  path: string
  named: NestedValue<T>
  options: {
    locale?: string
    plural?: string
  }
}

export function evaluateValue(expression: string): EvaluateReturn {
  const ret = { status: 'ng', value: undefined } as EvaluateReturn

  try {
    const ast = parse(`const a = ${expression.trim()}`)
    const node = (ast.program.body[0] as any).declarations[0].init
    if (node.type === 'ObjectExpression') {
      const val = new Function(`return ${expression.trim()}`)()
      ret.status = 'ok'
      ret.value = val
    }
  } catch (e) {}

  return ret
}

export function parseExpression(expression: string): TranslationParams {
  const ret: TranslationParams = {
    path: '',
    named: {},
    options: {},
  }

  try {
    const ast = parse(`const a = ${expression.trim()}`)
    const node = (ast.program.body[0] as any).declarations[0].init
    if (node.type === 'StringLiteral') {
      ret.path = node.extra.raw
    } else if (node.type === 'Identifier') {
      ret.path = node.name
    } else if (node.type === 'MemberExpression') {
      ret.path = getObjectMemberValue(node)
    } else if (node.type === 'ObjectExpression') {
      node.properties.forEach((propNode: any) => {
        const propKeyNode = propNode.key
        if (propKeyNode.type !== 'Identifier') {
          return
        }
        const propValueNode = propNode.value
        switch (propKeyNode.name) {
          case 'path':
            ret.path = getObjectMemberValue(propValueNode)
            break
          case 'locale':
            ret.options.locale = getObjectMemberValue(propValueNode)
            break
          case 'choice':
          case 'plural':
            ret.options.plural = getObjectMemberValue(propValueNode)
            break
          case 'args':
            // console.log('args', propValueNode)
            traverseObjectMember(propValueNode, ret.named)
            break
          default:
            break
        }
      })
    }
  } catch (e) {}

  return ret
}

function getObjectMemberValue(node: any): string {
  if (node.type === 'StringLiteral' || node.type === 'NumericLiteral') {
    return node.extra.raw
  } else if (node.type === 'Identifier') {
    return node.name
  } else if (node.type === 'MemberExpression') {
    const paths: string[] = []
    collectMemberPath(node, paths)
    paths.reverse()
    return paths.join('.')
  } else {
    return ''
  }
}

function traverseObjectMember(node: any, target: any): void {
  node.properties.forEach((propNode: any) => {
    const propKeyNode = propNode.key
    if (propKeyNode.type !== 'Identifier') {
      return
    }
    if (!(propKeyNode.name in target)) {
      target[propKeyNode.name] = {}
    }
    // console.log('propNode', propNode)
    const propValueNode = propNode.value
    if (propValueNode.type === 'ObjectExpression') {
      traverseObjectMember(propValueNode, target[propKeyNode.name])
    } else {
      target[propKeyNode.name] = getObjectMemberValue(propValueNode)
    }
  })
}

function collectMemberPath(node: any, paths: string[]): void {
  if (node.type === 'Identifier') {
    paths.push(node.name)
    return
  }

  if (node.property.type === 'Identifier') {
    paths.push(node.property.name)
    return collectMemberPath(node.object, paths)
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */
