import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-traffic.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      
      <div className="container relative z-10 px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Traffic Sign Prediction
          </h1>
          <p className="text-xl text-muted-foreground md:text-2xl">
            AI-powered traffic sign classification using advanced machine learning
          </p>
          <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300"
            >
              <span className="relative z-10">Get Started</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
