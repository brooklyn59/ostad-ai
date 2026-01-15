
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { EducationState, FileData } from '../types';

export const generateResponse = async (
  prompt: string,
  education: EducationState,
  file?: FileData
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY missing");

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `أنت الآن "الأستاذ الذكي - OSTAD AI"، خبير تربوي مغربي متخصص.
  بيئة الطالب الحالية:
  - السلك: ${education.cycle}
  - المستوى: ${education.level}
  - الشعبة: ${education.track}
  - المادة: ${education.subject}

  مهمتك:
  1. أجب بذكاء كأستاذ مغربي متمكن، استخدم الفصحى الميسرة مع القليل من "الدارجة المغربية" للتشجيع.
  2. التزم التام بالمقرر الدراسي المغربي المعتمد من وزارة التربية الوطنية.
  3. إذا أرسل الطالب صورة تمرين أو ملف PDF، قم بتحليله بدقة وشرح المراحل (البيداغوجية).
  4. في حال استلام PDF، قم بقراءته بعناية والإجابة على الأسئلة المتعلقة به أو تلخيصه.
  5. شجع الطالب دائماً بكلمات محفزة.
  6. إذا كانت المادة علمية بالمسار الدولي، استخدم المصطلحات بالفرنسية.`;

  const parts: Part[] = [{ text: prompt }];
  if (file) {
    parts.push({
      inlineData: {
        mimeType: file.mimeType,
        data: file.data
      }
    });
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts },
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "لم أستطع معالجة طلبك، يرجى المحاولة مرة أخرى.";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
