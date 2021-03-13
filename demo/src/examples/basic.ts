export default (
  r: string,
  x: string,
  y: string,
  s: string,
  o: string = '0.5',
) => `
  <div
    v-motion
    :initial="{
      y: 100,
      opacity: 0.25,
    }"
    :enter="{
      y: ${y},
      x: ${x},
      opacity: ${o},
      rotate: ${r},
      scale: ${s}
    }"
  />
`
