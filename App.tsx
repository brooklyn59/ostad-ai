import React, { useState } from "react";
import { generateResponse } from "./services/geminiService";
import { EducationState } from "./types";

const education: EducationState = {
  level: "الثانوية",
  track: "علوم",
  subject: "رياضيات",
};

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const res = await generateResponse(question, education);
      setAnswer(res);
    } catch {
      setAnswer("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>أستاذي الذكي</h1>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="اكتب سؤالك هنا"
        style={{ width: 300 }}
      />

      <button onClick={send} style={{ marginLeft: 10 }}>
        إرسال
      </button>

      {loading && <p>جارٍ التفكير...</p>}

      {answer && (
        <div style={{ marginTop: 20 }}>
          <strong>الجواب:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
