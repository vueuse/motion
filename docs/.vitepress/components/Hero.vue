<template>
  <header class="home-hero">
    <h1 ref="header" id="main-title" class="title">
      <span>@vueuse</span>
      <span>/</span>
      <span>motion</span>
    </h1>
    <p ref="description" class="description">
      🤹 <b>Vue Composables</b> putting your <b>components</b> in
      <b>motion</b>
    </p>

    <div class="actions">
      <div ref="introduction" class="action">
        <NavLink :item="{ link: '/introduction', text: 'Get Started' }" />
      </div>

      <div ref="sources" class="action alt">
        <NavLink
          :item="{ link: 'https://github.com/vueuse/motion', text: 'Sources' }"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavLink from 'vitepress/dist/client/theme-default/components/NavLink.vue'
import { useMotion } from '@vueuse/motion'

const header = ref<HTMLElement>()
const description = ref<HTMLElement>()
const introduction = ref<HTMLElement>()
const sources = ref<HTMLElement>()

useMotion(header, {
  initial: {
    opacity: 0,
    y: 100,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
})

useMotion(description, {
  initial: {
    opacity: 0,
    y: 100,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 100,
    },
  },
})

useMotion(introduction, {
  initial: {
    opacity: 0,
    y: 100,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 100,
    },
  },
})

useMotion(sources, {
  initial: {
    opacity: 0,
    y: 100,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 200,
    },
  },
})
</script>

<style scoped>
.home-hero {
  margin: 2.5rem 0 2.75rem;
  padding: 0 1.5rem;
  text-align: center;
}
@media (min-width: 420px) {
  .home-hero {
    margin: 3.5rem 0;
  }
}
@media (min-width: 720px) {
  .home-hero {
    margin: 4rem 0 4.25rem;
  }
}
.figure {
  padding: 0 1.5rem;
}
.image {
  display: block;
  margin: 0 auto;
  width: auto;
  max-width: 100%;
  max-height: 280px;
}
.title {
  margin-top: 1.5rem;
  font-size: 2rem;
}
@media (min-width: 420px) {
  .title {
    font-size: 3rem;
  }
}
@media (min-width: 720px) {
  .title {
    margin-top: 2rem;
  }
}
.description {
  margin-top: 1.5rem;
  line-height: 1.3;
  font-size: 1.2rem;
  color: var(--c-text-light);
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

@media (min-width: 420px) {
  .description {
    line-height: 1.2;
    font-size: 1.6rem;
  }
}

.action.alt {
  margin-left: 1.5rem;
}

.action {
  margin-top: 1.5rem;
  display: inline-block;
}

@media (min-width: 420px) {
  .action {
    margin-top: 2rem;
    display: inline-block;
  }
}

@media (max-width: 420px) {
  .action.alt {
    margin-left: 0;
    width: 100%;
  }
}

.action :deep(.item) {
  display: inline-block;
  border-radius: 6px;
  padding: 0 20px;
  line-height: 44px;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  background-color: var(--c-brand);
  border: 2px solid var(--c-brand);
  transition: background-color 0.1s ease;
}
.action.alt :deep(.item) {
  background-color: #fff;
  color: var(--c-brand);
}
.action :deep(.item:hover) {
  text-decoration: none;
  color: #ffffff;
  background-color: var(--c-brand-light);
}
@media (min-width: 420px) {
  .action :deep(.item) {
    padding: 0 24px;
    line-height: 52px;
    font-size: 1.2rem;
    font-weight: 500;
  }
}
</style>
