export default (visible: boolean) => `
<transition 
    :css="false" 
    @leave="(el, done) => motions.cube.leave(done)"
>
    <div
        v-if="${visible}"
        v-motion="'cube'"
        :initial="{
            y: 400,
            opacity: 0,
        }"
        :enter="{
            y: 0,
            opacity: 1,
        }"
        :leave="{
            y: -400,
            opacity: 0,
        }"
    />
</transition>
`
