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
