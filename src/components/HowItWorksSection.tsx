import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Pick Your Board & Class", desc: "Select CBSE, ICSE, or your State Board. Choose your class (6th–12th) to get curriculum-aligned content." },
  { num: "02", title: "Choose a Subject & Chapter", desc: "Browse subjects or upload your own textbook PDF. Our AI indexes it instantly for smart search." },
  { num: "03", title: "Learn with AI", desc: "Ask questions, take voice quizzes, or explore 3D models. AI adapts to your learning pace and style." },
  { num: "04", title: "Track & Improve", desc: "See your progress, weak areas, and get personalized revision plans before exams." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-saffron uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
            Start in Under 2 Minutes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <span className="text-6xl font-bold text-saffron/10 font-display">{s.num}</span>
              <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
