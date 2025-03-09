import { mapContentNavigation } from '@nuxt/ui-pro/runtime/utils/content.js'
import type { ContentNavigationItem } from '@nuxt/content'

export default defineNuxtPlugin(async () => {
  const router = useRouter()
  const { data: navigation } = await useAsyncData('navigation', () =>
    queryCollectionNavigation('docs'))
  const nav = computed<ContentNavigationItem[]>(
    () =>
      mapContentNavigation(navigation.value).find(x =>
        router.currentRoute.value.path.startsWith(x.to),
      )?.children,
  )

  return {
    provide: {
      currentDocsVersionNavigation: nav,
    },
  }
})
