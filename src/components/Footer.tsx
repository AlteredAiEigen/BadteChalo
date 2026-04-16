const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-display text-xl font-bold text-primary">BadteChalo</span>
            <p className="text-sm text-muted-foreground mt-1">AI-powered learning for every Indian student.</p>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#boards" className="hover:text-foreground transition-colors">Boards</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} BadteChalo. Made with ❤️ in India.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
