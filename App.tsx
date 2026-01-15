import { EducationState, FileData } from "../types";

export const generateResponse = async (
  prompt: string,
  education: EducationState,
  file?: FileData
): Promise<string> => {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: prompt,
      level: education.level,
      track: education.track,
      subject: education.subject,
      imageBase64: file?.base64 || null,
    }),
  });

  if (!response.ok) {
    throw new Error("فشل الاتصال بالذكاء الاصطناعي");
  }

  const data = await response.json();
  return data.reply;
};
