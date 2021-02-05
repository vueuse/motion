<template>
  <ClientOnly>
    <div class="home-features">
      <div class="wrapper">
        <div class="container">
          <div class="features">
            <section
              v-for="(feature, index) in features"
              :key="index"
              :ref="`feature_${index}`"
              class="feature"
            >
              <h2 class="title" v-if="feature.title">{{ feature.title }}</h2>
              <p
                class="details"
                v-if="feature.details"
                v-html="feature.details"
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts">
import { useMotion } from '@vueuse/motion'
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
  setup() {
    const features = [
      {
        title: 'Declarative animations',
        details:
          'Write <b>animations</b> right from your <b>template</b>, control it from your <b>script</b>.',
      },
      {
        title: 'Fast',
        details:
          'Powered by <a href="http://popmotion.io"><b>Popmotion</b></a>, the same engine behind the famous <b>Framer Motion</b>.',
      },
      {
        title: 'Compatible',
        details:
          'Written with <b>Composition API</b>, this package is compatible with <b>Vue 2</b>, <b>3</b> and <b>Nuxt</b> 💚',
      },
    ]

    const feature_0 = ref()
    const feature_1 = ref()
    const feature_2 = ref()

    useMotion(feature_0, {
      initial: {
        y: 200,
        opacity: 0,
      },
      enter: {
        y: 0,
        opacity: 1,
      },
    })

    useMotion(feature_1, {
      initial: {
        y: 200,
        opacity: 0,
      },
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          delay: 100,
        },
      },
    })

    useMotion(feature_2, {
      initial: {
        y: 200,
        opacity: 0,
      },
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          delay: 200,
        },
      },
    })

    return {
      features,
      feature_0,
      feature_1,
      feature_2,
    }
  },
})
</script>

<style scoped>
.home-features {
  margin: 0 auto;
  padding: 2.5rem 0 2.75rem;
  max-width: 960px;
}
.home-hero + .home-features {
  padding-top: 0;
}

.wrapper {
  padding: 0 1.5rem;
}

.home-hero + .home-features .wrapper {
  border-top: 1px solid var(--c-divider);
  padding-top: 2.5rem;
}
@media (min-width: 420px) {
  .home-hero + .home-features .wrapper {
    padding-top: 3.25rem;
  }
}
@media (min-width: 720px) {
  .wrapper {
    padding-right: 0;
    padding-left: 0;
  }
}
.container {
  margin: 0 auto;
  max-width: 392px;
}
@media (min-width: 720px) {
  .container {
    max-width: 960px;
  }
}
.features {
  display: flex;
  flex-wrap: wrap;
  margin: -20px -24px;
}
.feature {
  flex-shrink: 0;
  padding: 20px 24px;
  width: 100%;
}
@media (min-width: 720px) {
  .feature {
    width: calc(100% / 3);
  }
}
.title {
  margin: 0;
  border-bottom: 0;
  line-height: 1.4;
  font-size: 1.25rem;
  font-weight: 500;
}
@media (min-width: 420px) {
  .title {
    font-size: 1.4rem;
  }
}
.details {
  margin: 0;
  line-height: 1.6;
  font-size: 1rem;
  color: var(--c-text-light);
}
.title + .details {
  padding-top: 0.25rem;
}
</style>

<style lang="postcss">
footer .container {
  border: 0 !important;
}
</style>
