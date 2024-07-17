import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { RouteParamsProvider } from "@/context/route-params-content";
import Header from "@/components/layout/Header";
import useData from "@/lib/useData";
import ThemeContextProvider from "@/context/theme-context";
import StoreProvider from "../StoreProvider";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "../i18n/dictionaries";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import GReCaptchaProvider from "../GReCaptchaProvider";
import I18nProvider from "../i18n/I18nProvider";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: Record<any, any> }): Promise<Metadata> {
  const { lang } = params
  const t = await getDictionary(lang)

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  };
}; 

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Record<any, any>
}>) {
  const { lang } = params
  const { links } = await useData(lang)
  const t = await getDictionary(lang)

  return (
    <html>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        {/* <I18nextProvider i18n={i18n}> */}
          {/* 頁面上方漸層 */}
          {/* original value: #fbe2e3 */}
          {/* original value: #dbd7fb */}
          <div className="bg-[rgba(105,85,62,0.35)] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
          <div className="bg-[rgba(179,142,100,0.55)] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
            <GReCaptchaProvider>
              <StoreProvider>
                <RouteParamsProvider params={params}>
                  <I18nProvider>
                    <ThemeContextProvider>
                      <ActiveSectionContextProvider>
                        <Header lang={lang} links={links} />
                        <Sidebar links={links} />
                        {children}
                        <Footer t={t} />
                        <Toaster position="top-center" />
                      </ActiveSectionContextProvider>
                    </ThemeContextProvider>
                  </I18nProvider>
                </RouteParamsProvider>
              </StoreProvider>
            </GReCaptchaProvider>
        {/* </I18nextProvider> */}
      </body>
    </html>
  );
}
