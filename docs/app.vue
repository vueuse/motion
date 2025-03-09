<script setup lang="ts">
import { mapContentNavigation } from '@nuxt/ui-pro/runtime/utils/content.js'
import type { ContentNavigationItem } from '@nuxt/content'

const appConfig = useAppConfig()
const radius = computed(
  () => `:root { --ui-radius: ${appConfig.theme.radius}rem; }`,
)

useHead({
  htmlAttrs: { lang: 'en' },
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  style: [{ innerHTML: radius, id: 'nuxt-ui-radius', tagPriority: -2 }],
})

useSeoMeta({
  titleTemplate: `%s - ${appConfig.seo.siteName}`,
  ogSiteName: appConfig.seo.siteName,
  twitterCard: 'summary_large_image',
})

// Navigation Data
const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('docs'))

const nav = computed<ContentNavigationItem[]>(() =>
  mapContentNavigation(navigation.value),
)
provide('navigation', nav)

// Search
const { data: files } = useAsyncData(
  '/api/search.json',
  () => queryCollectionSearchSections('docs'),
  { server: false },
)

// // Header
const route = useRoute()
const links = computed<unknown[]>(() => [
  {
    label: 'Getting started',
    to: `/getting-started`,
    icon: 'i-heroicons-rocket-launch',
  },
  {
    label: 'Features',
    to: '/features',
    icon: 'i-heroicons-book-open',
  },
  {
    label: 'API',
    to: '/api',
    icon: 'i-heroicons-code-bracket',
  },
])
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <Header :links="links" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Footer />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        :multiple="true"
        :kbds="['meta', 'K']"
      />
    </ClientOnly>
  </UApp>
</template>

<style></style>
