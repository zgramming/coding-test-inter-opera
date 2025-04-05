import axios, { AxiosError } from "axios";
import Showdown from "showdown";

const getErrorMessage = (error: unknown) => {
  // Check if axios error
  const message = "Terjadi kesalahan pada server";

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (!axiosError.response) return message;

    const response = axiosError.response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = response.data as any;

    const { message: errorMessage } = data;

    if (Array.isArray(errorMessage)) {
      return errorMessage
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n");
    }

    return errorMessage || message;
  } else if (error instanceof Error) {
    return error.message;
  }

  return message;
};

const markdownToHtml = (markdown: string) => {
  const converter = new Showdown.Converter({
    tables: true,
    strikethrough: true,
    tasklists: true,
    simplifiedAutoLink: true,
  });
  return converter.makeHtml(markdown);
};

export { getErrorMessage, markdownToHtml };
