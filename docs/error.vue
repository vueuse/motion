<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})

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

const { $currentDocsVersionNavigation } = useNuxtApp()

// // Search
const { data: files } = useAsyncData(
  '/api/search.json',
  () => queryCollectionSearchSections('docs'),
  { server: false },
)

const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('docs'))

// // Header
const route = useRoute()
const links = computed<unknown[]>(() => [
  {
    label: 'Docs',
    to: `/getting-started`,
    icon: 'i-heroicons-book-open',
  },
  {
    label: 'Features',
    to: '/features',
    icon: 'i-heroicons-map',
  },
  {
    label: 'API',
    to: '/api',
    icon: 'i-heroicons-map',
  },
])
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <Header :links="links" />

    <NuxtLayout>
      <UError :error="error" />
    </NuxtLayout>

    <Footer />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        :multiple="true"
      />
    </ClientOnly>
  </div>
</template>
