import { getEntry, getCollection } from 'astro:content';

export const INDEXING = import.meta.env.PUBLIC_INDEXING === 'true';
export const YM_ID = (import.meta.env.PUBLIC_YM_ID ?? '').trim();

export async function getSite() {
  const entry = await getEntry('site', 'main');
  if (!entry) throw new Error('src/data/site.yaml: нет записи id: main');
  return entry.data;
}

export async function getCoachesById() {
  const all = await getCollection('coaches');
  return new Map(all.map((c) => [c.id, c.data]));
}

export const NAV = [
  { href: '/zanyatiya/', label: 'Занятия' },
  { href: '/o-klube/', label: 'О клубе' },
  { href: '/bassejny/', label: 'Бассейны и цены' },
  { href: '/sorevnovaniya/', label: 'Соревнования' },
  { href: '/kontakty/', label: 'Контакты' },
] as const;

/** Якорь формы записи: форма стоит внизу каждой основной страницы */
export const SIGNUP_ANCHOR = '#zapis';

/** «Яковлев Владимир Валерьевич» → «Владимир Яковлев» для коротких подписей */
export function shortName(full: string) {
  const [last, first] = full.split(' ');
  return first ? `${first} ${last}` : full;
}
