export default (x: string) => `
  <div
    v-motion
    :initial="{
      y: 100,
      opacity: 0.25,
    }"
    :enter="{
      y: 0,
      opacity: 1,
      rotate: ${x}
    }"
  />
`
