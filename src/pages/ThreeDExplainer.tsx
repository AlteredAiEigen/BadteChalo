import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Box as DreiBox, Torus, MeshDistortMaterial, MeshWobbleMaterial, Float, Text3D, Center } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Box, Search, RotateCcw, ZoomIn, Loader2 } from "lucide-react";

const topics = [
  { name: "Water Molecule (H₂O)", category: "Chemistry", scene: "water" },
  { name: "Solar System", category: "Physics", scene: "solar" },
  { name: "DNA Double Helix", category: "Biology", scene: "dna" },
  { name: "Geometric Shapes", category: "Mathematics", scene: "geometry" },
  { name: "Atom Structure", category: "Chemistry", scene: "atom" },
  { name: "Crystal Lattice", category: "Chemistry", scene: "crystal" },
];

const WaterMolecule = () => (
  <Float speed={2} rotationIntensity={0.5}>
    <group>
      {/* Oxygen */}
      <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="hsl(0, 80%, 55%)" roughness={0.3} metalness={0.1} />
      </Sphere>
      {/* Hydrogen 1 */}
      <Sphere args={[0.5, 32, 32]} position={[-1.2, 0.8, 0]}>
        <meshStandardMaterial color="hsl(210, 80%, 65%)" roughness={0.3} metalness={0.1} />
      </Sphere>
      {/* Hydrogen 2 */}
      <Sphere args={[0.5, 32, 32]} position={[1.2, 0.8, 0]}>
        <meshStandardMaterial color="hsl(210, 80%, 65%)" roughness={0.3} metalness={0.1} />
      </Sphere>
    </group>
  </Float>
);

const SolarSystem = () => (
  <group>
    {/* Sun */}
    <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
      <MeshDistortMaterial color="hsl(40, 95%, 55%)" distort={0.3} speed={2} roughness={0.2} />
    </Sphere>
    {/* Planets */}
    {[1.8, 2.6, 3.4, 4.5].map((r, i) => (
      <Float key={i} speed={1.5 - i * 0.2} rotationIntensity={0.3}>
        <Sphere args={[0.15 + i * 0.05, 16, 16]} position={[r, Math.sin(i) * 0.3, Math.cos(i) * r * 0.3]}>
          <meshStandardMaterial color={["hsl(30,60%,50%)", "hsl(200,70%,55%)", "hsl(140,60%,45%)", "hsl(15,70%,50%)"][i]} />
        </Sphere>
      </Float>
    ))}
    {/* Orbit rings */}
    {[1.8, 2.6, 3.4, 4.5].map((r, i) => (
      <Torus key={`ring-${i}`} args={[r, 0.01, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="hsl(220, 10%, 70%)" transparent opacity={0.3} />
      </Torus>
    ))}
  </group>
);

const GeometryScene = () => (
  <group>
    <Float speed={2}>
      <DreiBox args={[1.2, 1.2, 1.2]} position={[-2, 0, 0]}>
        <MeshWobbleMaterial color="hsl(24, 95%, 53%)" factor={0.2} speed={2} />
      </DreiBox>
    </Float>
    <Float speed={1.5}>
      <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial color="hsl(230, 60%, 45%)" distort={0.2} speed={3} />
      </Sphere>
    </Float>
    <Float speed={1.8}>
      <Torus args={[0.6, 0.25, 16, 32]} position={[2, 0, 0]}>
        <meshStandardMaterial color="hsl(170, 55%, 40%)" roughness={0.2} metalness={0.5} />
      </Torus>
    </Float>
  </group>
);

const scenes: Record<string, React.FC> = {
  water: WaterMolecule,
  solar: SolarSystem,
  geometry: GeometryScene,
  dna: GeometryScene,
  atom: WaterMolecule,
  crystal: SolarSystem,
};

const explanations: Record<string, string> = {
  water: "A water molecule (H₂O) consists of one oxygen atom bonded to two hydrogen atoms at a 104.5° angle. The oxygen atom is larger (red) and the hydrogen atoms are smaller (blue). This bent shape gives water its unique properties like high surface tension and being a universal solvent.",
  solar: "Our solar system has 8 planets orbiting the Sun. The inner rocky planets (Mercury, Venus, Earth, Mars) are closer and the outer gas giants (Jupiter, Saturn, Uranus, Neptune) are farther away. The Sun contains 99.86% of the solar system's mass.",
  geometry: "Basic 3D shapes: A cube has 6 faces, 12 edges, and 8 vertices. A sphere has no edges or vertices but infinite symmetry. A torus (donut shape) demonstrates how topology differs from simple geometry.",
  dna: "DNA is a double-helix structure made of nucleotide base pairs. The two strands are held together by hydrogen bonds between complementary bases: Adenine-Thymine and Guanine-Cytosine.",
  atom: "An atom consists of a nucleus (protons + neutrons) surrounded by electron clouds. The Bohr model shows electrons in discrete orbits, while modern quantum mechanics describes probability distributions.",
  crystal: "A crystal lattice is a repeating 3D arrangement of atoms. The unit cell is the smallest repeating structure. Common types include cubic, hexagonal, and tetragonal lattices.",
};

const ThreeDExplainer = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = topics.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentScene = selectedTopic ? scenes[topics.find(t => t.name === selectedTopic)?.scene || "geometry"] : null;
  const currentExplanation = selectedTopic ? explanations[topics.find(t => t.name === selectedTopic)?.scene || "geometry"] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border p-4">
        <div className="container flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-teal-light flex items-center justify-center">
              <Box className="h-5 w-5 text-teal" />
            </div>
            <h1 className="font-display font-bold text-foreground">3D Interactive Explainer</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Topic selector sidebar */}
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-border p-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search topics..."
              className="pl-10"
            />
          </div>

          <div className="space-y-2">
            {filteredTopics.map(t => (
              <button
                key={t.name}
                onClick={() => setSelectedTopic(t.name)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                  selectedTopic === t.name
                    ? "bg-teal-light border border-teal/20"
                    : "hover:bg-muted"
                }`}
              >
                <div>
                  <p className={`text-sm font-semibold ${selectedTopic === t.name ? "text-teal" : "text-foreground"}`}>{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.category}</p>
                </div>
                <Box className={`h-4 w-4 ${selectedTopic === t.name ? "text-teal" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
        </aside>

        {/* 3D Viewer */}
        <main className="flex-1 flex flex-col">
          {selectedTopic && currentScene ? (
            <>
              <div className="flex-1 relative bg-gradient-to-br from-muted to-background min-h-[400px]">
                <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -5]} intensity={0.5} color="hsl(230, 60%, 70%)" />
                  <Suspense fallback={null}>
                    {(() => { const Scene = currentScene; return <Scene />; })()}
                  </Suspense>
                  <OrbitControls enablePan enableZoom enableRotate autoRotate autoRotateSpeed={1} />
                </Canvas>

                {/* Controls overlay */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className="bg-card/90 backdrop-blur rounded-lg px-3 py-1.5 text-xs text-muted-foreground flex items-center gap-1.5 border border-border">
                    <RotateCcw className="h-3 w-3" /> Drag to rotate
                  </div>
                  <div className="bg-card/90 backdrop-blur rounded-lg px-3 py-1.5 text-xs text-muted-foreground flex items-center gap-1.5 border border-border">
                    <ZoomIn className="h-3 w-3" /> Scroll to zoom
                  </div>
                </div>
              </div>

              {/* Explanation panel */}
              <motion.div
                key={selectedTopic}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-border p-6 bg-card"
              >
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{selectedTopic}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{currentExplanation}</p>
              </motion.div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <div className="h-20 w-20 rounded-2xl bg-teal-light flex items-center justify-center mx-auto mb-6">
                  <Box className="h-10 w-10 text-teal" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Select a Topic</h3>
                <p className="text-muted-foreground max-w-sm">
                  Choose a topic from the sidebar to explore it in interactive 3D. Rotate, zoom, and learn visually.
                </p>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ThreeDExplainer;
