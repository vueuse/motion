<template>
  <div class="theme" :class="pageClasses">
    <NavBar v-if="showNavbar" @toggle="toggleSidebar" />

    <SideBar :open="openSideBar">
      <template #sidebar-top>
        <slot name="sidebar-top" />
      </template>
      <template #sidebar-bottom>
        <slot name="sidebar-bottom" />
      </template>
    </SideBar>

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Content v-if="isCustomLayout" />

    <Home v-else-if="enableHome">
      <template #hero>
        <slot name="home-hero" />
      </template>
      <template #features>
        <slot name="home-features" />
      </template>
      <template #footer>
        <slot name="home-footer" />
      </template>
    </Home>

    <Page v-else>
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import type { DefaultTheme } from 'vitepress/dist/client/theme-default/config.js'

// Components
import NavBar from 'vitepress/dist/client/theme-default/components/NavBar.vue'
import SideBar from 'vitepress/dist/client/theme-default/components/SideBar.vue'
import Page from 'vitepress/dist/client/theme-default/components/Page.vue'

const Home = defineAsyncComponent(() => import('./Home.vue'))

// Generic State
const route = useRoute()
const { site, page, theme, frontmatter } = useData()
// const siteData = useSiteData<DefaultTheme.Config>()
// const siteRouteData = useSiteDataByRoute()

// Custom Layout
const isCustomLayout = computed(() => !!route.data.frontmatter.customLayout)
// home
const enableHome = computed(() => !!route.data.frontmatter.home)

// Navbar
const showNavbar = computed(() => {
  const themeConfig = theme.value

  if (frontmatter.value.navbar === false || themeConfig.navbar === false)
    return false

  return (
    site.value.title || themeConfig.logo || themeConfig.repo || themeConfig.nav
  )
})

// Sidebar
const openSideBar = ref(false)

const showSidebar = computed(() => {
  const themeConfig = theme.value
  return (
    !frontmatter.value.home
    && frontmatter.value.sidebar !== false
    && ((typeof themeConfig.sidebar === 'object'
      && Object.keys(themeConfig.sidebar).length !== 0)
      || (Array.isArray(themeConfig.sidebar) && themeConfig.sidebar.length !== 0))
  )
})

const toggleSidebar = (to?: boolean) => {
  openSideBar.value = typeof to === 'boolean' ? to : !openSideBar.value
}

const hideSidebar = toggleSidebar.bind(null, false)
// Close the sidebar when navigating to a different location
watch(route, hideSidebar)
// TODO: route only changes when the pathname changes
// Listening to hashchange does nothing because it's prevented in router

// Page Classes
const pageClasses = computed(() => {
  return [
    {
      'no-navbar': !showNavbar.value,
      'sidebar-open': openSideBar.value,
      'no-sidebar': !showSidebar.value,
    },
  ]
})
</script>

<style>
#ads-container {
  margin: 0 auto;
}

@media (min-width: 420px) {
  #ads-container {
    position: relative;
    right: 0;
    float: right;
    margin: -8px -8px 24px 24px;
    width: 146px;
  }
}

@media (max-width: 420px) {
  #ads-container {
    /* Avoid layout shift */
    height: 105px;
  }
}

@media (min-width: 1400px) {
  #ads-container {
    position: fixed;
    right: 8px;
    bottom: 8px;
  }
}
</style>
