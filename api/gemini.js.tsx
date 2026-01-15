export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { message, level, track, subject, imageBase64 } = req.body;

    const systemPrompt = `
أنت أستاذ مغربي خبير.
المستوى: ${level}
الشعبة: ${track}
المادة: ${subject}
اشرح حسب المقرر المغربي وبأسلوب مبسط.
`;

    const parts = [{ text: systemPrompt + "\n\n" + message }];

    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: "image/png",
          data: imageBase64,
        },
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts }],
        }),
      }
    );

    const data = await response.json();

    res.status(200).json({
      reply:
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "لا يوجد رد",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
