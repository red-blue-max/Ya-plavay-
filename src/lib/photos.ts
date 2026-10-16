// Фото клуба с alt-текстами. Чтобы заменить фото — положите новый файл в src/images/photos/
// с тем же именем. Чтобы добавить — импортируйте его здесь и добавьте в нужный список.
import selfie from '../images/photos/selfie-v-basseyne.jpg';
import gruppa from '../images/photos/gruppa-s-nudlami.jpg';
import bortik from '../images/photos/trener-u-bortika.jpg';
import medalMama from '../images/photos/medal-s-mamoy.jpg';
import medali from '../images/photos/medali.jpg';
import trenerVVode from '../images/photos/trener-v-vode.jpg';
import start from '../images/photos/start-na-spine.jpg';
import zaplyv from '../images/photos/zaplyv-na-dorozhke.jpg';
import podderzhka from '../images/photos/podderzhka-na-vode.jpg';
import bassejn from '../images/photos/bassejn-sorevnovaniya.jpg';
import naSpine from '../images/photos/plavanie-na-spine.jpg';
import obyatiya from '../images/photos/obyatiya-v-vode.jpg';

export type ClubPhoto = { src: ImageMetadata; alt: string };

export const photos = {
  selfie: { src: selfie, alt: 'Тренер и ученики улыбаются у бортика бассейна' },
  gruppa: { src: gruppa, alt: 'Групповое занятие: тренеры и дети с аквапалками в воде' },
  bortik: { src: bortik, alt: 'Тренер у бортика помогает ученикам в воде' },
  medalMama: { src: medalMama, alt: 'Девочка с медалью после соревнований вместе с мамой' },
  medali: { src: medali, alt: 'Медали для участников соревнований клуба' },
  trenerVVode: { src: trenerVVode, alt: 'Тренер в воде занимается с девочкой' },
  start: { src: start, alt: 'Старт заплыва на спине на соревнованиях' },
  zaplyv: { src: zaplyv, alt: 'Ученики плывут по дорожке вместе с тренером' },
  podderzhka: { src: podderzhka, alt: 'Тренер поддерживает ученика на воде' },
  bassejn: { src: bassejn, alt: 'Бассейн во время соревнований клуба' },
  naSpine: { src: naSpine, alt: 'Тренер поддерживает ребёнка, который учится плавать на спине' },
  obyatiya: { src: obyatiya, alt: 'Ребёнок обнимает тренера в воде' },
} satisfies Record<string, ClubPhoto>;

/** Фотоблок на главной */
export const homeGallery: ClubPhoto[] = [
  photos.gruppa, photos.podderzhka, photos.trenerVVode, photos.obyatiya,
  photos.naSpine, photos.medalMama, photos.zaplyv, photos.bortik,
];
