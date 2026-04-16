import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { BookOpen, Mic, Box, LogOut, User, ChevronRight } from "lucide-react";

const features = [
  {
    key: "rag",
    title: "RAG Book Explorer",
    desc: "Ask AI about your textbooks. Get instant chapter summaries, answers, and exam questions — all aligned to your curriculum.",
    icon: BookOpen,
    path: "/dashboard/rag",
    accent: "saffron",
    gradient: "from-saffron/10 to-saffron/5",
    iconBg: "bg-saffron-light text-saffron",
  },
  {
    key: "tutor",
    title: "AI Voice Tutor",
    desc: "Your personal AI tutor quizzes you by voice in Hindi or English. Adapts to your level and tracks progress.",
    icon: Mic,
    path: "/dashboard/tutor",
    accent: "indigo",
    gradient: "from-indigo-light to-indigo/5",
    iconBg: "bg-indigo-light text-indigo",
  },
  {
    key: "3d",
    title: "3D Interactive Explainer",
    desc: "Explore complex science and math concepts through interactive 3D models. Rotate, zoom, and understand visually.",
    icon: Box,
    path: "/dashboard/3d-explainer",
    accent: "teal",
    gradient: "from-teal-light to-teal/5",
    iconBg: "bg-teal-light text-teal",
  },
];

const Dashboard = () => {
  const { user, profile, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="font-display text-xl font-bold text-primary">BadteChalo</a>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <div className="h-8 w-8 rounded-full bg-saffron-light flex items-center justify-center">
                <User className="h-4 w-4 text-saffron" />
              </div>
              <div>
                <p className="font-medium text-foreground leading-none">{profile?.full_name || user?.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole || "user"}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { signOut(); navigate("/"); }}>
              <LogOut className="h-4 w-4 mr-1" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-10">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Welcome back, {profile?.full_name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-muted-foreground mb-10">Choose a learning tool to get started.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(f.path)}
              className={`group cursor-pointer rounded-2xl border border-border bg-gradient-to-br ${f.gradient} p-8 hover:shadow-card-hover transition-all hover:-translate-y-1`}
            >
              <div className={`inline-flex items-center justify-center h-14 w-14 rounded-xl ${f.iconBg} mb-5`}>
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
              <span className="inline-flex items-center text-sm font-semibold text-saffron group-hover:gap-2 transition-all">
                Open <ChevronRight className="h-4 w-4 ml-1" />
              </span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
