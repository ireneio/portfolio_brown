"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage, validateEmail } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";
import { resendApiRecipientEmail } from "@/lib/consts";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: any, t: any) => {
  const senderEmail = formData.senderEmail;
  const message = formData.message;

  if (!validateString(senderEmail, 500) || !validateEmail(senderEmail)) {
    return {
      error: t.toast.invalid_email,
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: t.toast.exceed_max_length_5000,
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: resendApiRecipientEmail,
      subject: "個人形象網站 - 來信",
      reply_to: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message: message,
        senderEmail: senderEmail,
      }),
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
