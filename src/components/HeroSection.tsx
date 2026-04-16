import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-students.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden" style={{ background: "var(--gradient-warm)" }}>
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-saffron-light text-saffron text-sm font-semibold mb-6">
            🇮🇳 Made for Indian Students
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            AI-Powered Learning,{" "}
            <span className="text-saffron">बढ़ते चलो!</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Master any chapter with AI that reads your textbooks, quizzes you by voice, and brings concepts to life in 3D — aligned to CBSE, ICSE & State Boards.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" className="text-base px-8">
              Start Learning Free <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8">
              Watch Demo
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">✅ Free for students</span>
            <span className="flex items-center gap-1.5">✅ Works in Hindi & English</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-card-hover">
            <img
              src={heroImg}
              alt="Indian students learning with AI-powered technology in a modern classroom"
              width={1280}
              height={720}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-card p-4 animate-float">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal flex items-center justify-center text-primary-foreground font-bold text-lg">📚</div>
              <div>
                <p className="text-sm font-semibold text-foreground">10L+ Questions</p>
                <p className="text-xs text-muted-foreground">NCERT Aligned</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
