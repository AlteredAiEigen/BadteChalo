import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, BookOpen, Users, Shield, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

const roles: { role: AppRole; label: string; icon: React.ReactNode; desc: string; color: string }[] = [
  { role: "student", label: "Student", icon: <GraduationCap className="h-8 w-8" />, desc: "Learn with AI tools", color: "bg-saffron-light text-saffron border-saffron/20" },
  { role: "teacher", label: "Teacher", icon: <BookOpen className="h-8 w-8" />, desc: "Create & manage content", color: "bg-indigo-light text-indigo border-indigo/20" },
  { role: "staff", label: "Staff", icon: <Users className="h-8 w-8" />, desc: "School administration", color: "bg-teal-light text-teal border-teal/20" },
  { role: "admin", label: "Admin", icon: <Shield className="h-8 w-8" />, desc: "Full platform access", color: "bg-muted text-foreground border-border" },
];

const AuthPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<AppRole | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin },
        });
        if (error) throw error;

        if (data.user) {
          await supabase.from("user_roles").insert({ user_id: data.user.id, role: selectedRole });
          toast.success("Account created! Check your email to verify.");
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--gradient-warm)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <a href="/" className="font-display text-3xl font-bold text-primary">BadteChalo</a>
          <p className="text-muted-foreground mt-2">
            {selectedRole ? (isLogin ? "Welcome back! Sign in to continue." : "Create your account to get started.") : "Choose how you want to log in"}
          </p>
        </div>

        {!selectedRole ? (
          <div className="grid grid-cols-2 gap-4">
            {roles.map((r, i) => (
              <motion.button
                key={r.role}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedRole(r.role)}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 ${r.color} hover:scale-105 transition-all shadow-card hover:shadow-card-hover cursor-pointer bg-card`}
              >
                {r.icon}
                <span className="font-display font-bold text-lg">{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.desc}</span>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl shadow-card-hover p-8 border border-border"
          >
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Change role
            </button>

            <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-muted">
              {roles.find(r => r.role === selectedRole)?.icon}
              <div>
                <p className="font-semibold text-foreground">{roles.find(r => r.role === selectedRole)?.label}</p>
                <p className="text-xs text-muted-foreground">{roles.find(r => r.role === selectedRole)?.desc}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                  <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" required />
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@school.edu" required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    minLength={6}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" variant="hero" className="w-full" size="lg" disabled={loading}>
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-saffron font-semibold hover:underline">
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;
