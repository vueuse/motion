export default () => `
<div
    v-motion
    :initial="{
        y: 400,
    }"
    :enter="{
        y: 0,
        transition: {
            repeat: Infinity,
            repeatType: 'mirror',
            repeatDelay: 1000,
        },
    }"
/>
[ ... ]
<div
    v-motion
    :delay="400"
    :initial="{
        y: 400,
    }"
    :enter="{
        y: 0,
        transition: {
            repeat: Infinity,
            repeatType: 'mirror',
            repeatDelay: 1000,
        },
    }"
/>

`
