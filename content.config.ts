import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/*.md',
      schema: z.object({
        id: z.string().optional(),
        slug: z.string().optional(),
        type: z.enum(['analysis', 'code', 'skill']).default('analysis'),
        categoryLabel: z.string().default('Analyse'),
        title: z.string(),
        subtitle: z.string().default(''),
        excerpt: z.string().default(''),
        coverImage: z.string().default('/images/ai-education.jpg'),
        publishedAt: z.string(),
        readTime: z.string(),
        audioTime: z.string().optional(),
        featured: z.boolean().default(false),
        author: z.object({
          name: z.string(),
          role: z.string(),
          organization: z.string(),
          avatar: z.string(),
        }),
        tags: z.array(z.string()).default([]),
        executiveSummary: z.array(z.object({
          title: z.string(),
          description: z.string(),
          impact: z.enum(['positive', 'negative', 'neutral']),
        })).optional(),
        audioTranscript: z.string().optional(),
      })
    })
  }
})
