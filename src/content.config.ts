import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// Все данные сайта лежат в src/data/*.yaml. Схемы ниже ловят опечатки в полях при сборке.

const site = defineCollection({
  loader: file('src/data/site.yaml'),
  schema: z.object({
    name: z.string(),
    fullName: z.string(),
    slogan: z.string(),
    city: z.string(),
    phone: z.string(),
    phoneHref: z.string().startsWith('tel:'),
    email: z.string().email(),
    telegram: z.string().url(),
    max: z.string().url(),
    vk: z.string().url(),
    contactNote: z.string(),
    operator: z.string(),
    operatorShort: z.string(),
    ogrnip: z.string(),
    inn: z.string(),
  }),
});

const directions = defineCollection({
  loader: file('src/data/directions.yaml'),
  schema: z.object({
    title: z.string(),
    short: z.string(),
    forWhom: z.string(),
    goal: z.string(),
    how: z.array(z.string()),
    benefits: z.array(z.string()).optional(),
    note: z.string().optional(),
    noteLink: z.string().url().optional(),
    duration: z.string().nullable(),
    priceNote: z.string(),
    accent: z.enum(['sky', 'foam', 'sun']),
  }),
});

const coaches = defineCollection({
  loader: file('src/data/coaches.yaml'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    featured: z.boolean().default(false),
    highlights: z.array(z.string()).max(2),
    education: z.array(z.string()).default([]),
    extra: z.array(z.string()).default([]),
    experience: z.array(z.string()).default([]),
  }),
});

const pools = defineCollection({
  loader: file('src/data/pools.yaml'),
  schema: z.object({
    name: z.string(),
    address: z.string(),
    mapLink: z.string().url().optional(),
    metro: z.array(z.string()),
    water: z.string(),
    about: z.string(),
    accessible: z.union([z.boolean(), z.literal('partly')]).nullable(),
    coaches: z.array(z.string()),
    coachesOther: z.array(z.string()).default([]),
  }),
});

const prices = defineCollection({
  loader: file('src/data/prices.yaml'),
  schema: z.object({
    title: z.string(),
    duration: z.string().optional(),
    items: z.array(
      z.object({
        pool: z.string().optional(),
        label: z.string().optional(),
        place: z.string().optional(),
        icon: z.enum(['user', 'users', 'drop', 'heart', 'wave']).optional(),
        duration: z.string().optional(),
        price: z.string().nullable(),
      }),
    ),
  }),
});

const competitions = defineCollection({
  loader: file('src/data/competitions.yaml'),
  schema: z.object({
    nextDate: z.coerce.date().nullable(),
    regulationsUrl: z.string().url().optional(),
    applicationUrl: z.string().url().optional(),
    lastProtocol: z.object({ date: z.coerce.date(), url: z.string().url() }).optional(),
    judge: z.string(),
    judgePhone: z.string(),
    judgeChannels: z.string(),
    program: z.array(z.string()),
    requirements: z.array(z.string()),
  }),
});

export const collections = { site, directions, coaches, pools, prices, competitions };
