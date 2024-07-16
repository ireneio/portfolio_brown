"use client"

import React from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const GReCaptchaProvider = ({ children }: React.PropsWithChildren) => {  
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY as string}
      useRecaptchaNet={true}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}

export default GReCaptchaProvider
