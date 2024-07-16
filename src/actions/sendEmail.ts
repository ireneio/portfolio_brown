"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage, validateEmail } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";
import { contactEmail } from "@/lib/consts";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500) || !validateEmail(senderEmail)) {
    return {
      error: "toast.invalid_email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "toast.exceed_max_length_5000",
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: contactEmail,
      subject: "Portfolio Website - Message from contact form",
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
