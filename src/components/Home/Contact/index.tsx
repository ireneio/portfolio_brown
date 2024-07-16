"use client";

import React, { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/useSectionInView";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./SubmitButton";
import toast from "react-hot-toast";
import { contactEmail } from "@/lib/consts";

export default function Contact({ t }: { t: any }) {
  const { ref } = useSectionInView("Contact");
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    senderEmail: '',
    message: '',
  })

  const handleSubmit = async () => {
    setLoading(true)
    const { data, error } = await sendEmail(form, t);
    if (data?.error) {
      toast.error(data?.error?.message);
    } else if (error) {
      toast.error(error);
    } else {
      toast.success(t.toast.email_sent_success);
    }
    setLoading(false)
  }

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
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
          onChange={(e) => setForm((prev) => ({ ...prev, senderEmail: e.target.value }))}
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          placeholder={t.form.your_message}
          required
          maxLength={5000}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
        />
        <SubmitBtn t={t} loading={loading} onSubmit={handleSubmit} />
      </form>
    </motion.section>
  );
}
