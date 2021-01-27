import { Directive } from 'vue'

export function directive(): Directive {
  return {
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
  }
}

export default directive()
