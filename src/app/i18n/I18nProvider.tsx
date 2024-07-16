"use client"

import { fallbackLng } from '@/app/i18n'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { getDictionary } from "./dictionaries";
import React, { useEffect, useState } from 'react';
import { useRouteParams } from '@/context/route-params-content';

const initI18n = async (locale: string) => {
  const translations = await getDictionary(locale);

  i18next
    .use(initReactI18next)
    .init({
      resources: {
        [locale]: {
          translation: translations,
        },
      },
      lng: locale,
      fallbackLng: fallbackLng,
      interpolation: {
        escapeValue: false,
      },
    });

  return i18next;
};

const I18nProvider = ({ children }: React.PropsWithChildren) => {
  const [i18n, setI18n] = useState<any>(null)
  const params = useRouteParams()

  useEffect(() => {
    console.log(params);
    
    if (params.lang) {
      initI18n(params.lang).then((i18n) => {
        console.log('i18n', i18n);
        
        setI18n(i18n)
      })
    }
  }, [params])

  return (
    i18n ? <I18nextProvider i18n={i18n}>{children}</I18nextProvider> : null
  )
}

export default I18nProvider
