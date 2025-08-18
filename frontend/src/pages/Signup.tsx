import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Mail, Lock, Check, ArrowLeft } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    
    // Reset after 3 seconds for demo purposes
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
      setPassword("");
    }, 3000);
  };

  const renderStarfield = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (!isDark) return null;

    const stars = Array.from({ length: 25 }, (_, i) => (
      <div
        key={i}
        className="absolute w-px h-px bg-white rounded-full animate-pulse opacity-30"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: "3s"
        }}
      />
    ));

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {stars}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-sunset-gradient dark:bg-dark-questionnaire relative overflow-hidden transition-all duration-500 flex items-center justify-center">
        {renderStarfield()}
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 animate-pulse">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-dark-text mb-4">
            Saved!
          </h1>
          <p className="text-xl text-white/80 dark:text-dark-muted mb-8">
            Your personality profile has been saved successfully.
          </p>
          <Link to="/">
            <Button
              size="lg"
              className="bg-sunset-coral dark:bg-dark-primary hover:bg-sunset-coral/90 dark:hover:bg-dark-primary/90 text-white font-semibold px-8 py-4 text-lg rounded-2xl"
            >
              Continue Exploring
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sunset-gradient dark:bg-dark-questionnaire relative overflow-hidden transition-all duration-500 flex items-center justify-center">
      {renderStarfield()}
      
      <div className="relative z-10 w-full max-w-md px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white dark:text-dark-text mb-4">
            Save Your Results
          </h1>
          <p className="text-white/80 dark:text-dark-muted text-lg">
            Create an account to save your personality profile and get personalized recommendations.
          </p>
        </div>

        <Card className="bg-white/10 dark:bg-dark-card backdrop-blur-sm border-white/20 dark:border-dark-text/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-white dark:text-dark-text text-2xl">
              Get Started
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Social Auth Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text hover:bg-white/20 dark:hover:bg-dark-card/80 h-12"
                onClick={() => console.log("Google signup placeholder")}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              
              <Button
                variant="outline"
                className="w-full bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text hover:bg-white/20 dark:hover:bg-dark-card/80 h-12"
                onClick={() => console.log("Apple signup placeholder")}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </Button>
            </div>

            <div className="relative">
              <Separator className="bg-white/20 dark:bg-dark-text/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/10 dark:bg-dark-card px-3 text-white/70 dark:text-dark-muted text-sm">
                  or
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white dark:text-dark-text">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 dark:text-dark-muted" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="pl-10 bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text placeholder:text-white/50 dark:placeholder:text-dark-muted/70 focus:border-sunset-coral dark:focus:border-dark-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white dark:text-dark-text">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 dark:text-dark-muted" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="pl-10 bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text placeholder:text-white/50 dark:placeholder:text-dark-muted/70 focus:border-sunset-coral dark:focus:border-dark-primary"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-sunset-coral dark:bg-dark-primary hover:bg-sunset-coral/90 dark:hover:bg-dark-primary/90 text-white font-semibold h-12 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                disabled={!email || !password}
              >
                Create Account
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-white/60 dark:text-dark-muted text-sm">
                Already have an account?{" "}
                <button className="text-sunset-coral dark:text-dark-link hover:underline">
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link 
            to="/results" 
            className="inline-flex items-center text-white/70 dark:text-dark-muted hover:text-white dark:hover:text-dark-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
