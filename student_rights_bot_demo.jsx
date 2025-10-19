import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function StudentRightsBotDemo() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'שלום! אני "מצפן זכויות התלמיד" – איך אפשר לעזור לך היום?', type: 'info' }
  ]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const [submissionID, setSubmissionID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const sampleQuestions = [
    'האם מותר למורה להחרים לי את הטלפון?',
    'מהן הזכויות של תלמיד עם לקות למידה?',
    'האם מותר למנהל למנוע ממני להשתתף בטקס בגלל הלבוש שלי?',
    'מה הזכות שלי לבחור מגמה?',
    'איך מגישים תלונה בבית הספר?',
    'האם מותר למורה להוציא אותי מהכיתה?',
    'מה עושים במקרה של בריונות?',
    'האם מותר לבית הספר לבדוק לי את התיק?',
    'האם מותר להעניש תלמיד ללא שימוע?',
    'מה הזכויות שלי בזמן בחינה?',
    'איך ניתן להגיש ערעור על ציון?',
    'מה עושים במקרה של אפליה בבית הספר?'
  ];

  const quickLinks = [
    { label: 'חוק זכויות התלמיד', url: 'https://edu.gov.il/parents/pupilsrights/Pages/default.aspx' },
    { label: 'חוזרי מנכ"ל', url: 'https://edu.gov.il/taavot/Pages/hozerim.aspx' },
    { label: 'טפסים להורדה', url: 'https://edu.gov.il/parents/Pages/forms.aspx' },
    { label: 'מוקד פניות הציבור', url: 'https://edu.gov.il/service/Pages/pniot.aspx' }
  ];

  const getMessageType = (question) => {
    if (question.includes('בריונות') || question.includes('אלימות')) return 'alert';
    if (question.includes('טלפון') || question.includes('תיק')) return 'discipline';
    if (question.includes('לקות') || question.includes('בחינה')) return 'learning';
    if (question.includes('תלונה') || question.includes('ערעור')) return 'process';
    if (question.includes('אפליה') || question.includes('לבוש')) return 'equality';
    return 'info';
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const type = getMessageType(input);
    const newMessages = [...messages, { sender: 'user', text: input, type }];
    const response = getBotResponse(input);
    setMessages([...newMessages, { sender: 'bot', text: response, type }]);
    setInput('');
  };

  const handleSampleQuestion = (question) => {
    const type = getMessageType(question);
    const newMessages = [...messages, { sender: 'user', text: question, type }];
    const response = getBotResponse(question);
    setMessages([...newMessages, { sender: 'bot', text: response, type }]);
  };

  const getBotResponse = (question) => {
    const q = question.toLowerCase();
    if (q.includes('טלפון') || q.includes('להחרים')) {
      return 'לפי הנחיות משרד החינוך, מותר למורה להחזיק בטלפון במהלך השיעור אם נעשה בו שימוש לא תקין, אך עליו להחזירו בסוף היום. לא ניתן להחרים לצמיתות.';
    } else if (q.includes('לקות') || q.includes('למידה')) {
      return 'תלמידים עם לקות למידה זכאים להתאמות בבחינות ובתהליכי למידה בהתאם להמלצות ועדת זכאות ואפיון.';
    } else if (q.includes('לבוש') || q.includes('טקס')) {
      return 'בית הספר רשאי לקבוע קוד לבוש אחיד, אך עליו לוודא שאין אפליה מגדרית או פגיעה בזכות לשוויון.';
    } else if (q.includes('בחירת מגמה')) {
      return 'לתלמידים זכות לבחור מגמה בהתאם לנטיותיהם וליכולותיהם, כל עוד יש מקום פנוי והם עומדים בדרישות הסף.';
    } else if (q.includes('פנייה') || q.includes('תלונה')) {
      return 'ניתן להגיש תלונה דרך אתר משרד החינוך או באמצעות יועצת בית הספר. אני יכול להפנות אותך לטופס הרלוונטי במידת הצורך.';
    } else if (q.includes('בריונות') || q.includes('אלימות')) {
      return 'במקרה של בריונות או אלימות – חובה על צוות בית הספר לטפל מידית באירוע, לדווח להנהלה ולערב גורמי סיוע מתאימים.';
    } else if (q.includes('תיק') || q.includes('בדיקה')) {
      return 'אסור לבית הספר לערוך חיפוש בתיק של תלמיד ללא הסכמתו, אלא אם קיים חשד מבוסס לסיכון בטיחותי מיידי.';
    } else if (q.includes('שימוע') || q.includes('ענישה')) {
      return 'לפני ענישה חמורה כמו הרחקה, יש לקיים שימוע לתלמיד שבו יוכל להביע את עמדתו – זו זכות בסיסית.';
    } else if (q.includes('בחינה') || q.includes('הבחינה')) {
      return 'כל תלמיד זכאי להיבחן בתנאים שוויוניים. תלמידים עם התאמות יקבלו את ההתאמות שאושרו להם.';
    } else if (q.includes('ערעור') || q.includes('ציון')) {
      return 'ניתן להגיש ערעור על ציון בחינה תוך זמן מוגדר לפי נהלי בית הספר או משרד החינוך.';
    } else if (q.includes('אפליה')) {
      return 'אסור על פי חוק להפלות תלמידים מכל סיבה – מגדר, מוצא, דת או מצב אישי. כל תלמיד זכאי ליחס שוויוני.';
    } else if (q.includes('זכויות')) {
      return 'תוכל לעיין ב"חוק זכויות התלמיד" המלא באתר משרד החינוך בקישור הבא:\nhttps://edu.gov.il/parents/pupilsrights/Pages/default.aspx';
    }
    return 'אשמח לעזור! תוכל לנסח שוב את השאלה או לציין נושא – למשל זכויות, חובות, טפסים או ועדה?';
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const id = Math.floor(Math.random() * 1000000);
      setSubmissionID(id);
      setLoading(false);
      setShowConfirmation(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => setShowConfirmation(false), 2000);
      setContactData({ name: '', email: '', message: '' });
      setShowContactForm(false);
      const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_9b69b64a1e.mp3?filename=success-1-6297.mp3');
      audio.play();
    }, 1500);
  };

  const getMessageStyle = (type) => {
    switch (type) {
      case 'alert': return 'bg-red-100 text-red-800';
      case 'discipline': return 'bg-yellow-100 text-yellow-800';
      case 'learning': return 'bg-green-100 text-green-800';
      case 'process': return 'bg-blue-100 text-blue-800';
      case 'equality': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 relative">
        <div className="flex justify-center items-center mb-4 space-x-3 animate-fade-in">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Emblem_of_Israel.svg" alt="משרד החינוך" className="h-10" />
          <img src="https://www.gov.il/BlobFolder/organization/pedagogical_secretariat/he/logo_pedagogical_secretariat.png" alt="המנהל הפדגוגי" className="h-10" />
          <h1 className="text-2xl font-bold text-indigo-700 text-center">🤖 מצפן זכויות התלמיד</h1>
        </div>

        {showConfirmation && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-2xl animate-fade-in">
            <div className="text-green-600 text-3xl font-bold">✅</div>
          </div>
        )}

        {!showContactForm ? (
          <>
            <div className="h-80 overflow-y-auto border rounded-lg p-4 bg-gray-50 mb-4">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-3 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
                  <div className={`inline-block px-3 py-2 rounded-xl ${getMessageStyle(msg.type)}`}>
                    {msg.text.includes('https://') ? (
                      <a href={msg.text.match(/https:\/\/[^\s]+/)[0]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        לחץ כאן לצפייה בחוק זכויות התלמיד
                      </a>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              {submissionID && (
                <div className="text-green-700 mt-3 text-sm text-center animate-fade-in">
                  ✅ מספר הפנייה שלך הוא: <strong>{submissionID}</strong>
                </div>
              )}
            </div>

            <div className="flex mb-3 space-x-2 overflow-x-auto pb-2">
              {sampleQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSampleQuestion(q)}
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm px-3 py-1 rounded-full whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="כתוב שאלה כאן..."
                className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700"
              >
                שלח
              </button>
            </div>

            <div className="mt-5 border-t pt-3 text-center">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">🔗 קישורים מהירים</h2>
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {quickLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-full shadow-md"
              >
                📩 צור קשר עם משרד החינוך
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleContactSubmit} className="p-4 border rounded-lg bg-gray-50 relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            )}
            <h2 className="text-lg font-semibold text-center mb-4 text-indigo-700">📩 טופס יצירת קשר (הדגמה)</h2>
            <input
              type="text"
              value={contactData.name}
              onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
              placeholder="שם מלא"
              className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none"
              required
            />
            <input
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
              placeholder="דוא"ל"
              className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none"
              required
            />
            <textarea
              value={contactData.message}
              onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
              placeholder="תוכן הפנייה"
              className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none"
              rows="4"
              required
            />
            <div className="flex justify-between">
              <button type="button" onClick={() => setShowContactForm(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
                ביטול
              </button>
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                שלח פנייה
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}