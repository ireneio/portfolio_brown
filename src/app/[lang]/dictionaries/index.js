// import { fallbackLng } from '@/app/i18n'
// import i18next from 'i18next'
// import { initReactI18next } from 'react-i18next'

"use server";
 
const dictionaries = {
  'en-us': () => import('./en-us').then((module) => module.default),
  'zh-tw': () => import('./zh-tw').then((module) => module.default),
  'zh-cn': () => import('./zh-cn').then((module) => module.default),
}
 
export const getDictionary = async (locale) => {
  if (dictionaries[locale]) {
    return dictionaries[locale]()
  }
  return null
}

// export const initI18n = async (locale) => {
//   const translations = await getDictionary(locale);

//   i18next
//     .use(initReactI18next)
//     .init({
//       resources: {
//         [locale]: {
//           translation: translations,
//         },
//       },
//       lng: locale,
//       fallbackLng: fallbackLng,
//       interpolation: {
//         escapeValue: false,
//       },
//     });

//   return i18n;
// };