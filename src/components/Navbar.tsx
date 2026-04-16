import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="font-display text-2xl font-bold text-primary">
          BadteChalo
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#boards" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Boards</a>
          <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>Get Started Free</Button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border p-4 space-y-3">
          <a href="#features" className="block text-sm font-medium text-muted-foreground">Features</a>
          <a href="#how-it-works" className="block text-sm font-medium text-muted-foreground">How It Works</a>
          <a href="#boards" className="block text-sm font-medium text-muted-foreground">Boards</a>
          <Button variant="hero" className="w-full">Get Started Free</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
