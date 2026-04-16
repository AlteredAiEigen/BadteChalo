import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, Send, BookOpen, Sparkles, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const RAGExplorer = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [mode, setMode] = useState<"chat" | "exam">("chat");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const subjects = [
    { name: "Physics", chapters: ["Motion", "Force & Laws", "Gravitation", "Work & Energy"] },
    { name: "Chemistry", chapters: ["Matter", "Atoms & Molecules", "Chemical Reactions", "Periodic Table"] },
    { name: "Biology", chapters: ["Cell Structure", "Tissues", "Diversity", "Life Processes"] },
    { name: "Mathematics", chapters: ["Number Systems", "Polynomials", "Coordinate Geometry", "Triangles"] },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulated AI response for POC
    setTimeout(() => {
      const aiMsg: Message = {
        role: "assistant",
        content: mode === "exam"
          ? `Here are practice questions for "${input}":\n\n**Q1.** Define the concept and give two examples.\n\n**Q2.** Explain the underlying principle with a diagram.\n\n**Q3.** Solve: If the given values are x=5, y=10, find the result.\n\n**Q4.** Compare and contrast the two related concepts.\n\n*Tip: Try answering without looking at the textbook first!*`
          : `Great question about **"${input}"**!\n\nHere's what your textbook says:\n\nThis concept is fundamental to understanding the chapter. The key points are:\n\n1. **Definition**: The formal explanation as per NCERT\n2. **Application**: How it applies in real-world scenarios\n3. **Formula**: The mathematical representation\n\n📖 *Reference: NCERT Class 10, Chapter 3, Page 42*\n\nWould you like me to explain any part in more detail?`,
      };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-card p-6 hidden lg:flex flex-col">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-saffron-light flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-saffron" />
          </div>
          <div>
            <h2 className="font-display font-bold text-foreground">RAG Explorer</h2>
            <p className="text-xs text-muted-foreground">NCERT Aligned</p>
          </div>
        </div>

        <div className="space-y-2 flex-1 overflow-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Subjects</p>
          {subjects.map(s => (
            <div key={s.name}>
              <button
                onClick={() => setSelectedSubject(selectedSubject === s.name ? null : s.name)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedSubject === s.name ? "bg-saffron-light text-saffron" : "text-foreground hover:bg-muted"}`}
              >
                {s.name}
              </button>
              {selectedSubject === s.name && (
                <div className="ml-4 mt-1 space-y-1">
                  {s.chapters.map(ch => (
                    <button key={ch} onClick={() => setInput(`Explain ${ch} from ${s.name}`)} className="block w-full text-left px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded transition-colors">
                      {ch}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <Button variant="outline" className="mt-4 w-full gap-2">
          <Upload className="h-4 w-4" /> Upload Textbook PDF
        </Button>
      </aside>

      {/* Main chat */}
      <main className="flex-1 flex flex-col">
        {/* Mode toggle */}
        <div className="border-b border-border p-4 flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="lg:hidden mr-2">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setMode("chat")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "chat" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              💬 Ask Questions
            </button>
            <button
              onClick={() => setMode("exam")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "exam" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              📝 Exam Prep
            </button>
          </div>
          <span className="text-xs text-muted-foreground ml-auto hidden sm:block">
            {mode === "exam" ? "AI generates practice questions" : "Ask anything about your chapters"}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {messages.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center">
              <div className="h-20 w-20 rounded-2xl bg-saffron-light flex items-center justify-center mb-6">
                {mode === "exam" ? <Sparkles className="h-10 w-10 text-saffron" /> : <FileText className="h-10 w-10 text-saffron" />}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {mode === "exam" ? "Exam Prep Mode" : "Ask Your Textbook"}
              </h3>
              <p className="text-muted-foreground max-w-md">
                {mode === "exam"
                  ? "Type a topic and get practice questions aligned to your curriculum. Great for revision!"
                  : "Select a chapter from the sidebar or type any question. AI will find answers from your textbook."}
              </p>
              <div className="flex flex-wrap gap-2 mt-6 justify-center">
                {["Explain Newton's Laws", "What is photosynthesis?", "Solve quadratic equations"].map(q => (
                  <button key={q} onClick={() => setInput(q)} className="px-4 py-2 rounded-full bg-muted text-sm text-foreground hover:bg-saffron-light hover:text-saffron transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-2xl rounded-2xl px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-5 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-3 max-w-3xl mx-auto">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={mode === "exam" ? "Enter a topic to generate questions..." : "Ask anything about your chapter..."}
              className="flex-1"
            />
            <Button type="submit" variant="hero" disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RAGExplorer;
