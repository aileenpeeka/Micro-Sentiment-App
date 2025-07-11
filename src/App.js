import { useState } from "react";
import { Brain, Sparkles, Loader2, Smile, Frown } from "lucide-react";
import "./index.css";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 flex flex-col items-center justify-center px-2">
      {/* Header */}
      <header className="w-full max-w-lg mx-auto text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="w-8 h-8 text-purple-500 drop-shadow" />
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent tracking-tight">
            Sentiment AI
          </h1>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-500 text-base md:text-lg font-medium">
          <Sparkles className="w-5 h-5 text-pink-400" />
          <span>Analyze the sentiment of any English text instantly</span>
        </div>
      </header>

      {/* Main Card */}
      <main className="w-full max-w-lg mx-auto bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-white/40">
        <label htmlFor="sentiment-textarea" className="block text-lg font-semibold text-gray-700 mb-2">
          Enter your text
        </label>
        <textarea
          id="sentiment-textarea"
          className="w-full min-h-[100px] rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white/70 p-4 text-lg font-medium text-gray-800 placeholder-gray-400 transition mb-4 resize-y shadow-sm"
          placeholder="Type or paste your sentence here..."
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={loading}
        />
        <button
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed mb-2"
          onClick={handlePredict}
          disabled={loading || !text.trim()}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* Result */}
        {result && (
          <div className="w-full mt-4 flex flex-col items-center animate-fade-in">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-md mb-2 ${
              result.label === "positive"
                ? "bg-gradient-to-r from-green-200 to-green-100 text-green-700"
                : "bg-gradient-to-r from-red-200 to-red-100 text-red-700"
            }`}>
              {result.label === "positive" ? (
                <Smile className="w-6 h-6" />
              ) : (
                <Frown className="w-6 h-6" />
              )}
              <span className="font-bold text-lg capitalize">{result.label}</span>
            </div>
            <div className="text-gray-700 text-base font-medium">
              Confidence: <span className="font-bold">{(result.score * 100).toFixed(1)}%</span>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-10 text-gray-400 text-sm text-center select-none">
        Made with <span className="text-pink-400">♥</span> by You
      </footer>
    </div>
  );
}
