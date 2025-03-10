const isBrowser = typeof window !== 'undefined'

export const supportsPointerEvents = () => isBrowser && (window.onpointerdown === null || import.meta.env?.TEST)

export const supportsTouchEvents = () => isBrowser && (window.ontouchstart === null || import.meta.env?.TEST)

export const supportsMouseEvents = () => isBrowser && (window.onmousedown === null || import.meta.env?.TEST)
