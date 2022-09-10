---
title: Put your components in motion!
navigation: false
layout: page
transitions:
  initial:
    y: 100
    opacity: 0
  enter:
    y: 0
    opacity: 1
    transition:
      delay: 1000
---

::block-hero
#title
::motion
---
initial:
  y: 100
  opacity: 0
enter:
  y: 0
  opacity: 1
---
@vueuse/motion
::

#description
::motion
---
initial:
  y: 100
  opacity: 0
enter:
  y: 0
  opacity: 1
delay: 100
---
Vue composables putting your components in Motion.
::

#actions
::motion
---
initial:
  y: 100
  opacity: 0
enter:
  y: 0
  opacity: 1
delay: 200
---
  ::button-link{size="large" to="/getting-started/introduction"}
  Get Started
  ::
::

::motion
---
initial:
  y: 100
  opacity: 0
enter:
  y: 0
  opacity: 1
delay: 300
---
  ::button-link{to="https://github.com/vueuse/motion" .!bg-transparent .!text-black .dark:!text-white blank}
  :icon{name="fa-brands:github" .mr-2}
  Star on GitHub
  ::
::

#right
::div{.w-full .flex .items-center .justify-center}
  ::illustration
  ::
::
::

::card-grid
#default
  ::motion
  ---
  initial:
    y: 100
    opacity: 0
  enter:
    y: 0
    opacity: 1
  delay: 100
  ---
    ::card
    ---
    icon: 🕹
    ---
    #title
    Declarative Animations
    #description
    Write animations right from your template or config control them from your script.
    ::
  ::

  ::motion
  ---
  initial:
    y: 100
    opacity: 0
  enter:
    y: 0
    opacity: 1
  delay: 200
  ---
    ::card
    ---
    icon: 🏎
    ---
    #title
    Fast and Lightweight
    #description
    Animations powered by Popmotion. Bundle size <20kb gzipped.
    ::
  ::

  ::motion
  ---
  initial:
    y: 100
    opacity: 0
  enter:
    y: 0
    opacity: 1
  delay: 300
  ---
    ::card
    ---
    icon: 💚
    ---
    #title
    Plug and Play
    #description
    Compatible with Vue 2, 3 and Nuxt. Start with defaults, write yours with ease.
    ::
  ::
::
