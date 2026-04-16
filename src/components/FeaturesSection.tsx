import { motion } from "framer-motion";
import { BookOpen, Mic, Box } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "RAG Book Explorer",
    description: "Upload your textbook or select from NCERT library. Ask anything about a chapter — get instant, accurate answers with page references. Perfect for quick revision and exam prep.",
    color: "bg-saffron-light text-saffron",
    border: "border-saffron/20",
  },
  {
    icon: Mic,
    title: "AI Voice Tutor",
    description: "Your personal tutor that quizzes you by voice in Hindi or English. Adaptive difficulty based on your performance. Like having a teacher available 24/7.",
    color: "bg-indigo-light text-indigo",
    border: "border-indigo/20",
  },
  {
    icon: Box,
    title: "3D Interactive Explainer",
    description: "Visualise complex topics like molecular structures, geometry, or solar systems in interactive 3D. Understand by exploring, not just reading.",
    color: "bg-teal-light text-teal",
    border: "border-teal/20",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-saffron uppercase tracking-wider">Core Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
            Learn Smarter, Not Harder
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Three AI superpowers designed for Indian students to ace their exams and truly understand concepts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`group rounded-2xl border ${f.border} bg-card p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`inline-flex items-center justify-center h-14 w-14 rounded-xl ${f.color} mb-6`}>
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
