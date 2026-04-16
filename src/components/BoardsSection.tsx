import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const boards = [
  { name: "CBSE", desc: "NCERT-aligned content for classes 6–12" },
  { name: "ICSE", desc: "Full syllabus support with CISCE materials" },
  { name: "State Boards", desc: "Maharashtra, Karnataka, Tamil Nadu & more" },
  { name: "JEE / NEET Prep", desc: "Competitive exam-focused practice" },
];

const BoardsSection = () => {
  return (
    <section id="boards" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-saffron uppercase tracking-wider">Curriculum Support</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
            Built for Every Indian Board
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Whether you're studying for boards or competitive exams, BadteChalo has you covered.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {boards.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-6 text-center shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
            >
              <CheckCircle className="h-8 w-8 text-teal mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-1">{b.name}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardsSection;
