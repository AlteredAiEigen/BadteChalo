import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, MicOff, Volume2, CheckCircle, XCircle, RotateCcw, Sparkles } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const mockQuestions: QuizQuestion[] = [
  { question: "What is the SI unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 1, explanation: "The SI unit of force is Newton (N), named after Sir Isaac Newton." },
  { question: "Which organelle is called the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], correct: 2, explanation: "Mitochondria generate most of the cell's ATP through cellular respiration." },
  { question: "What is the value of π (pi) up to 2 decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], correct: 1, explanation: "π ≈ 3.14159... rounded to 2 decimal places is 3.14." },
];

const VoiceTutor = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [subject, setSubject] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  const subjects = ["Physics", "Chemistry", "Biology", "Mathematics", "Hindi", "English"];

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === mockQuestions[currentQ].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= mockQuestions.length) {
      setQuizComplete(true);
    } else {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setSubject(null);
  };

  if (!subject) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border p-4">
          <div className="container flex items-center gap-4">
            <button onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-light flex items-center justify-center">
                <Mic className="h-5 w-5 text-indigo" />
              </div>
              <h1 className="font-display font-bold text-foreground">AI Voice Tutor</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-lg">
            <div className="h-24 w-24 rounded-3xl bg-indigo-light flex items-center justify-center mx-auto mb-8">
              <Sparkles className="h-12 w-12 text-indigo" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Choose a Subject</h2>
            <p className="text-muted-foreground mb-8">Select a subject to start your AI-powered voice quiz session.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {subjects.map(s => (
                <button
                  key={s}
                  onClick={() => setSubject(s)}
                  className="p-4 rounded-xl border border-border bg-card hover:bg-indigo-light hover:border-indigo/20 transition-all text-sm font-semibold text-foreground hover:text-indigo"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground">Difficulty:</span>
              {(["easy", "medium", "hard"] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${difficulty === d ? "bg-indigo text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  if (quizComplete) {
    const pct = Math.round((score / mockQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className={`h-28 w-28 rounded-full flex items-center justify-center mx-auto mb-6 ${pct >= 70 ? "bg-teal-light" : "bg-saffron-light"}`}>
            <span className="text-4xl font-bold font-display" style={{ color: pct >= 70 ? "hsl(var(--teal))" : "hsl(var(--saffron))" }}>{pct}%</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {pct >= 70 ? "बहुत अच्छे! Great job!" : "Keep practicing!"}
          </h2>
          <p className="text-muted-foreground mb-8">
            You scored {score}/{mockQuestions.length} in {subject} ({difficulty}).
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="hero" onClick={resetQuiz}><RotateCcw className="h-4 w-4 mr-2" /> Try Again</Button>
            <Button variant="hero-outline" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = mockQuestions[currentQ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border p-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-indigo-light flex items-center justify-center">
                <Mic className="h-4 w-4 text-indigo" />
              </div>
              <span className="font-display font-bold text-foreground">{subject}</span>
              <span className="text-xs text-muted-foreground capitalize px-2 py-0.5 bg-muted rounded-full">{difficulty}</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {currentQ + 1} / {mockQuestions.length}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-indigo rounded-r-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQ + 1) / mockQuestions.length) * 100}%` }}
        />
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-xl">
          <h2 className="text-xl font-bold text-foreground mb-8 text-center">{q.question}</h2>

          <div className="space-y-3 mb-8">
            {q.options.map((opt, i) => {
              let style = "border-border bg-card hover:bg-muted";
              if (showResult) {
                if (i === q.correct) style = "border-teal bg-teal-light";
                else if (i === selected && i !== q.correct) style = "border-destructive bg-destructive/10";
              } else if (i === selected) {
                style = "border-indigo bg-indigo-light";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 ${style} transition-all flex items-center gap-4`}
                >
                  <span className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-foreground flex-shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm font-medium text-foreground">{opt}</span>
                  {showResult && i === q.correct && <CheckCircle className="h-5 w-5 text-teal ml-auto" />}
                  {showResult && i === selected && i !== q.correct && <XCircle className="h-5 w-5 text-destructive ml-auto" />}
                </button>
              );
            })}
          </div>

          {showResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-muted rounded-xl p-4 mb-6">
              <p className="text-sm text-foreground"><strong>Explanation:</strong> {q.explanation}</p>
            </motion.div>
          )}

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setIsListening(!isListening)}
              className="gap-2"
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {isListening ? "Stop Voice" : "Read Aloud"}
            </Button>

            {showResult && (
              <Button variant="hero" onClick={nextQuestion}>
                {currentQ + 1 >= mockQuestions.length ? "See Results" : "Next Question →"}
              </Button>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default VoiceTutor;
