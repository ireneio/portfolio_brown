"use server";

import axios from 'axios'

// 1 > score > 0
const successScore = 0.5

export const verifyReCaptcha = async (gRecaptchaToken: string, t: any) => {
  const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET;

  if (!secretKey) {
    throw new Error('GOOGLE_RECAPTCHA_SECRET not set')
  }

  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  
    // Check the ReCaptcha response for success and a score above a certain threshold.
    if (response.data.success && response.data.score > successScore) {
      // Return a success response if the verification passes.
      return {
        score: response.data.score,
      }
    } else {
      // Log the failure and return a response indicating the verification did not pass.
      return {
        error: t.toast.reCaptcha_error
      }
    }
  } catch (e) {
    return {
      error: String(e)
    }
  }
}
