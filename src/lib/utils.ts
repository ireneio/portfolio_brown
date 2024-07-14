export const validateString = (
  value: unknown,
  maxLength: number
): value is string => {
  if (!value || typeof value !== "string" || value.length > maxLength) {
    return false;
  }

  return true;
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const handleDownloadFile = (path: string, filename: string) => {
  const a = document.createElement('a')
  a.href = path
  a.target = "_blank"
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}