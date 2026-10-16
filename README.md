# Сайт спортивного клуба «Я Плаваю»

Плавание и гидрореабилитация для детей и взрослых с особенностями развития, Москва.
Новый сайт вместо текущего на Tilda (ya-plavau.ru). Статус: демо-сборка, закрыта от индексации.

## Стек
Astro 5 (статическая сборка) + Tailwind CSS 4. Шрифты Onest и Unbounded — локально, без CDN.
Форма записи — PHP-обработчик для хостинга Timeweb (в работе).

## Команды
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # готовый сайт в dist/
node scripts/check-dist.mjs   # проверка ссылок, якорей, H1, alt после сборки
```

## Где что менять
- Контакты, реквизиты: `src/data/site.yaml`
- Направления занятий: `src/data/directions.yaml`
- Тренеры: `src/data/coaches.yaml`, фото — `src/images/coaches/`
- Бассейны: `src/data/pools.yaml`; цены: `src/data/prices.yaml`
- Соревнования: `src/data/competitions.yaml`
- Фото галерей: просто положите файлы в `src/images/galereya/` или `src/images/sorevnovaniya/`
- Юридические тексты: `src/legal/*.md`

## Индексация
`PUBLIC_INDEXING=false` (по умолчанию, см. `.env.example`) — на всех страницах `noindex`, в robots.txt `Disallow: /`.
Для боевого сайта: `PUBLIC_INDEXING=true`.

## Папки
- `content/old-site/` — выгрузка текстов старого сайта
- `content/voprosy-vladelcu.md` — открытые вопросы к владельцу
- `content/texts-home.md` — утверждённые тексты главной
- `assets/` — исходники фото и логотипа
