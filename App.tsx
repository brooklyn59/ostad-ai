import React, { useState } from 'react';
import React, { useState } from 'react';
import { generateResponse } from './services/geminiService';
import { EducationState } from './types';

const educationSample: EducationState = {
  level: "الثانوية",
  track: "علوم",
  subject: "رياضيات"
};

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const reply = await generateResponse(question, educationSample);
      setAnswer(reply);
    } catch (err) {
      setAnswer("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>أستاذي الذكي</h1>
      <p>جرب إرسال سؤال للذكاء الاصطناعي!</p>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="اكتب سؤالك هنا"
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "جارٍ الإرسال..." : "إرسال"}
      </button>

      {answer && (
        <div style={{ marginTop: 20, border: "1px solid #ccc", padding: 10 }}>
          <strong>الرد:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
