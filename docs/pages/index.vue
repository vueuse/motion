<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const { data: page } = await useAsyncData('index', () =>
  queryCollection('docs').where('path', '=', '/').first())
// Page Metadata (SEO & OG)
const { setPageMeta } = usePageMeta()
setPageMeta({
  title: page.value.title,
  description: page.value.description,
  headline: page.value?.hero?.headline?.label,
})

const source = ref('pnpm i @vueuse/motion')
const { copy, copied } = useClipboard({ source })
</script>

<template>
  <UMain>
    <div v-if="page">
      <UPageHero
        v-if="page.hero"
        v-bind="page.hero"
        class="relative"
        :ui="{
          container: 'overflow-hidden py-10 flex flex-row items-center  gap-1',
          links: 'flex items-center gap-2',
          description:
            'dark:text-gray-400 text-xl max-w-2xl leading-normal mb-10',
        }"
      >
        <template #top>
          <div
            class="absolute z-[-1] rounded-full bg-(--ui-primary) blur-[300px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-80"
          />
          <!-- <div
            class="absolute -z-10 inset-0 h-full w-full bg-[radial-gradient(circle,var(--ui-color-primary-900)_1px,transparent_1px)] bg-[size:20px_20px]"
          /> -->
        </template>

        <template #description>
          {{ page.hero.description }}
        </template>

        <template #title>
          <p>
            <span class="text-(--ui-primary)">VueUse</span> <span>Motion</span>
          </p>
        </template>
        <Person />
        <!-- <UInput
          aria-label="Copy code to get started"
          :model-value="source"
          name="get-started"
          class="mx-auto"
          disabled
          autocomplete="off"
          size="lg"
          :ui="{
            base: 'w-[300px] disabled:cursor-default',
            icon: { trailing: { pointer: '' } },
          }"
        >
          <template #leading>
            <UIcon name="i-ph-terminal" />
          </template>
          <template #trailing>
            <UButton
              aria-label="Copy Code"
              :color="copied ? 'primary' : 'neutral'"
              variant="ghost"
              :padded="false"
              :icon="copied ? 'i-ph-check' : 'i-ph-copy'"
              @click="copy(source)"
            />
          </template>
        </UInput> -->
      </UPageHero>

      <UPageSection :title="page.features.title">
        <UPageGrid>
          <UCard
            v-for="(item, index) of page.features.items"
            :key="index"
            v-bind="item"
          >
            <!-- <template #header> </template> -->
            <div class="flex flex-col gap-4 py-2">
              <!-- <UIcon class="text-(--ui-primary)" size="32" :name="item.icon"></UIcon> -->
              <h2 class="text-xl font-bold">
                {{ item.title }}
              </h2>
              <p class="text-(--ui-text-muted)">
                {{ item.description }}
              </p>
            </div>
            <!-- <template #footer>{{ item.title }}</template> -->
          </UCard>
        </UPageGrid>
      </UPageSection>
    </div>
  </UMain>
</template>
