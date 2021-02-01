export default `
  <div
    v-motion
    :initial="{
      y: 100,
      opacity: 0.25,
    }"
    :enter="{
      y: 0,
      x: 0,
      opacity: 1,
    }"
  />
`
