import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: '**/*',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        // navigation: z.boolean(),
        navigation: z.object({
          title: z.string().optional(),
        }),
        hero: z.object({
          description: z.string(),
          orientation: z.enum(['vertical', 'horizontal']),
          links: z.array(
            z.object({
              label: z.string(),
              trailingIcon: z.string(),
              to: z.string(),
              size: z.string(),
              variant: z.string(),
              color: z.string(),
              target: z.string(),
            }),
          ),
          code: z.string(),
        }),
        features: z.object({
          title: z.string(),
          items: z.array(
            z.object({
              title: z.string(),
              description: z.string(),
              icon: z.string(),
              to: z.string(),
            }),
          ),
        }),
        links: z.array(
          z.object({
            label: z.string(),
            trailingIcon: z.string(),
            to: z.string(),
            size: z.string(),
            variant: z.string(),
            color: z.string(),
            target: z.string(),
          }),
        ),
      }),
    }),
    documentation: defineCollection({
      type: 'data',
      source: '**/*.yml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        path: z.string(),
      }),
    }),
  },
})
