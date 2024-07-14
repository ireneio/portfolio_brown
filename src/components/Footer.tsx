'use client'

import { useRouteParams } from "@/context/route-params-content";
import { contactEmail } from "@/lib/consts";
import { handleDownloadFile } from "@/lib/utils";
import React from "react";
import toast from "react-hot-toast";

export default function Footer({ t }: { t: any }) {
  const params = useRouteParams()
  
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy; {new Date().getFullYear()} Brown. All rights reserved.
      </small>
      <div className="flex gap-4 justify-center">
        <a className="text-xs underline" href={`mailto:${contactEmail}`}>{t.footer.contact_me}</a>
        <button
          className="text-xs underline"
          onClick={() => {
            handleDownloadFile(`/resume_${params?.lang}.pdf`, `resume_${t.intro.resume}.pdf`)
            toast.success(t.toast.download_success)
          }}
        >
          {t.footer.download_cv}
        </button>
      </div>
      {/* <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion, React Email & Resend, Vercel hosting.
      </p> */}
    </footer>
  );
}
