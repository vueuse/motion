<script setup lang="ts">
// @ts-expect-error This is because we're using Nuxt Content v2.8.2 instead of the new version which includes these types. We're using the old version because the latest has issues with highlighting
import type { NavItem } from '@nuxt/content/dist/runtime/types'

// Get navigation tree relative to the '/content/docs'
const navigation = inject<Ref<NavItem[]>>('navigation')
const { navPageFromPath } = useContentHelpers()
const allNavigationTree = computed(() =>
  mapContentNavigation(navPageFromPath('/docs', navigation.value)?.children || []),
)
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UDivider type="dashed" class="mb-6" />
          <UNavigationTree :links="allNavigationTree" default-open :multiple="false" />
        </UAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
