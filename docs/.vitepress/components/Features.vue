<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const features = [
      {
        icon: '🕹',
        title: 'Declarative Animations',
        details:
          'Write <b>animations</b> right from your <b>template</b> or <b>config</b> control them from your <b>script</b>.',
      },
      {
        icon: '🏎',
        title: 'Fast and Lightweight',
        details:
          '<b>Animations</b> powered by <a href="http://popmotion.io"><b>Popmotion</b></a>. <b>Bundle</b> size <b><20kb</b> gzipped.',
      },
      {
        icon: '💚',
        title: 'Plug and Play',
        details:
          'Compatible with <b>Vue 2</b>, <b>3</b> and <b>Nuxt</b>. Start with <b>defaults</b>, write <b>yours</b> with <b>ease</b>.',
      },
    ]

    return { features }
  },
})
</script>

<template>
  <ClientOnly>
    <div class="home-features">
      <div class="wrapper">
        <div class="container">
          <div class="features">
            <section
              v-for="(feature, index) in features"
              :key="index"
              v-motion="{
                initial: {
                  y: 200,
                  opacity: 0,
                },
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    delay: index * 100
                  }
                }
              }"
              class="feature"
            >
              <h2 v-if="feature.title" class="title">
                <span role="img">{{ feature.icon }}</span>
                {{ feature.title }}
              </h2>
              <p
                v-if="feature.details"
                class="details"
                v-html="feature.details"
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.home-features {
  margin: 0 auto;
  padding: 2.5rem 0 2.5rem;
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
