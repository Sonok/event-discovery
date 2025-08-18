import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Users, MapPin, Heart, Zap, Coffee } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();

  // This would normally be derived from window.__wtmAnswers
  const personalityData = {
    title: "Adventurous Connector",
    traits: ["Outgoing", "Curious", "Spontaneous", "Chill Weeknighter", "Budget-Aware", "Outdoorsy"],
    description: "You're the perfect blend of social butterfly and thoughtful explorer. You love meeting new people and trying new experiences, but you also value authentic connections and meaningful conversations. Your ideal night out involves discovering hidden gems in your city with a small group of like-minded friends.",
    suggestedCategories: ["Live Music", "Food Festivals", "Outdoor Adventures", "Art Exhibitions", "Networking Mixers"]
  };

  const renderStarfield = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (!isDark) return null;

    const stars = Array.from({ length: 30 }, (_, i) => (
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

  return (
    <div className="min-h-screen bg-sunset-gradient dark:bg-dark-questionnaire relative overflow-hidden transition-all duration-500">
      {renderStarfield()}
      
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sunset-coral dark:bg-dark-primary rounded-full mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-dark-text mb-4">
              You're an
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-sunset-peach to-sunset-coral dark:from-dark-link dark:to-dark-primary bg-clip-text text-transparent mb-6">
              {personalityData.title}
            </h2>
            <p className="text-xl text-white/80 dark:text-dark-muted max-w-2xl mx-auto leading-relaxed">
              Based on your responses, here's your unique social discovery profile
            </p>
          </div>

          {/* Personality Traits */}
          <Card className="bg-white/10 dark:bg-dark-card mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white dark:text-dark-text mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-sunset-coral dark:text-dark-primary" />
                Your Key Traits
              </h3>
              <div className="flex flex-wrap gap-3">
                {personalityData.traits.map((trait, index) => (
                  <Badge 
                    key={trait}
                    className="text-base px-4 py-2 bg-sunset-coral/20 dark:bg-dark-primary/20 text-white dark:text-dark-text border-sunset-coral/40 dark:border-dark-primary/40"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personality Description */}
          <Card className="bg-white/10 dark:bg-dark-card mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white dark:text-dark-text mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-sunset-coral dark:text-dark-primary" />
                Your Social Style
              </h3>
              <p className="text-lg text-white/80 dark:text-dark-muted leading-relaxed">
                {personalityData.description}
              </p>
            </CardContent>
          </Card>

          {/* Suggested Categories */}
          <Card className="bg-white/10 dark:bg-dark-card mb-12">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white dark:text-dark-text mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-sunset-coral dark:text-dark-primary" />
                Top Suggested Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalityData.suggestedCategories.map((category, index) => (
                  <div 
                    key={category}
                    className="flex items-center p-4 bg-white/5 dark:bg-dark-card/50 rounded-lg border border-white/20 dark:border-dark-text/20"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="w-10 h-10 bg-sunset-coral/20 dark:bg-dark-primary/20 rounded-full flex items-center justify-center mr-3">
                      {index === 0 && <Zap className="w-5 h-5 text-sunset-coral dark:text-dark-primary" />}
                      {index === 1 && <Coffee className="w-5 h-5 text-sunset-coral dark:text-dark-primary" />}
                      {index === 2 && <MapPin className="w-5 h-5 text-sunset-coral dark:text-dark-primary" />}
                      {index === 3 && <Heart className="w-5 h-5 text-sunset-coral dark:text-dark-primary" />}
                      {index === 4 && <Users className="w-5 h-5 text-sunset-coral dark:text-dark-primary" />}
                    </div>
                    <span className="text-white dark:text-dark-text font-medium">{category}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button
                data-id="save-results"
                size="lg"
                className="bg-sunset-coral dark:bg-dark-primary hover:bg-sunset-coral/90 dark:hover:bg-dark-primary/90 text-white font-semibold px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/signup")}
              >
                Save My Results
              </Button>
              
              <Link to="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text hover:bg-white/20 dark:hover:bg-dark-card/80 px-8 py-4 text-lg rounded-2xl w-full"
                >
                  Skip for now
                </Button>
              </Link>
            </div>
            
            <p className="text-white/60 dark:text-dark-muted text-sm mt-6">
              Save your results to get personalized event recommendations and start connecting with like-minded people in your area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
