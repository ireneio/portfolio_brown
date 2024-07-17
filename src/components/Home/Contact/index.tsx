"use client";

import React, { useState } from "react";
import SectionHeading from "@/components/common/SectionHeading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/useSectionInView";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./SubmitButton";
import toast from "react-hot-toast";
import { contactEmail } from "@/lib/consts";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { verifyReCaptcha } from "@/actions/verifyReCaptcha";

export default function Contact({ t }: { t: any }) {
  const { ref } = useSectionInView("Contact");
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    senderEmail: '',
    message: '',
  })
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async () => {    
    if (!executeRecaptcha) {
      toast.error('50001 ReCaptcha not available')
      return
    }

    setLoading(true)

    const gRecaptchaToken = await executeRecaptcha('contactForm');

    const { error: verifyReCaptchaError } = await verifyReCaptcha(gRecaptchaToken, t)

    if (verifyReCaptchaError) {
      toast.error(verifyReCaptchaError)
      setLoading(false)
      return
    }

    const { data, error } = await sendEmail(form, t);
    if (data?.error) {
      toast.error(data?.error?.message);
    } else if (error) {
      toast.error(error);
    } else {
      toast.success(t.toast.email_sent_success);
      setForm({ senderEmail: '', message: '' })
    }
    setLoading(false)
  }

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-28 sm:mb-40 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>{t.contact.title}</SectionHeading>

      <p
        className="text-gray-700 -mt-6 dark:text-white/80"
        dangerouslySetInnerHTML={{ __html: t.contact.contact_me_at.replaceAll('{{email}}', contactEmail) }}
      >
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={handleSubmit}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          type="email"
          required
          maxLength={500}
          placeholder={t.form.your_email}
          value={form.senderEmail}
          onChange={(e) => setForm((prev) => ({ ...prev, senderEmail: e.target.value }))}
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          placeholder={t.form.your_message}
          required
          maxLength={5000}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
        />
        <SubmitBtn t={t} loading={loading} onSubmit={handleSubmit} />
      </form>
    </motion.section>
  );
}
