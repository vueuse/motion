const isBrowser = typeof window !== 'undefined'

export const supportsPointerEvents = () =>
  isBrowser && window.onpointerdown === null

export const supportsTouchEvents = () =>
  isBrowser && window.ontouchstart === null

export const supportsMouseEvents = () =>
  isBrowser && window.onmousedown === null
