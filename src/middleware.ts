import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from 'accept-language'
import { defaultLng, languages } from '@/app/i18n'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const lang = request.nextUrl.locale
  if (!lang) {
    acceptLanguage.languages(languages)
    const langFromHeaders = acceptLanguage.get(request.headers.get('Accept-Language'))    
    return langFromHeaders || defaultLng
  }
  return lang || defaultLng
}

export function middleware(request: NextRequest) {  
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = languages.find(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  )
  const response = NextResponse.next()

  if (pathnameHasLocale) {
    response.cookies.set('lang', pathnameHasLocale);
    return
  }
 
  // Redirect if there is no locale
  const lang = getLocale(request)  

  response.cookies.set('lang', lang);
  
  request.nextUrl.pathname = `/${lang}${pathname}`

  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|resume).*)']
}
