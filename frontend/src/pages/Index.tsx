import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Users,
  Sparkles,
  MapPin,
  Heart,
  Brain,
  Compass,
  ArrowRight,
  Star,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-sunset-gradient dark:bg-space-gradient relative overflow-hidden transition-all duration-500">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30 transition-opacity duration-500">
        <div className="absolute top-20 left-20 w-32 h-32 bg-sunset-peach dark:bg-space-cyan rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-40 right-32 w-24 h-24 bg-sunset-coral dark:bg-space-gold rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-sunset-teal dark:bg-space-purple rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        {/* Additional dark mode elements - expansive starfield */}
        <div className="hidden dark:block">
          {/* Large bright stars */}
          <div className="absolute top-16 right-1/4 w-1 h-1 bg-space-silver/80 rounded-full animate-pulse"></div>
          <div className="absolute top-32 left-1/2 w-1 h-1 bg-space-cyan/80 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-space-gold/80 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 left-16 w-0.5 h-0.5 bg-space-silver/80 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 right-16 w-0.5 h-0.5 bg-space-cyan/80 rounded-full animate-pulse delay-1500"></div>

          {/* Medium stars - expanded */}
          <div className="absolute top-24 left-1/4 w-1 h-1 bg-space-cyan/70 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-56 right-1/6 w-0.5 h-0.5 bg-space-gold/70 rounded-full animate-pulse delay-800"></div>
          <div className="absolute bottom-40 left-1/6 w-1 h-1 bg-space-silver/70 rounded-full animate-pulse delay-1200"></div>
          <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-space-cyan/70 rounded-full animate-pulse delay-1800"></div>
          <div className="absolute top-40 left-3/4 w-1 h-1 bg-space-gold/70 rounded-full animate-pulse delay-2200"></div>

          {/* Many more medium stars */}
          <div className="absolute top-72 left-1/8 w-0.5 h-0.5 bg-space-silver/60 rounded-full animate-pulse delay-2500"></div>
          <div className="absolute top-96 right-1/8 w-0.5 h-0.5 bg-space-cyan/60 rounded-full animate-pulse delay-2800"></div>
          <div className="absolute bottom-80 left-1/8 w-0.5 h-0.5 bg-space-gold/60 rounded-full animate-pulse delay-3100"></div>
          <div className="absolute top-80 right-3/8 w-0.5 h-0.5 bg-space-silver/60 rounded-full animate-pulse delay-3400"></div>
          <div className="absolute bottom-64 left-3/8 w-0.5 h-0.5 bg-space-cyan/60 rounded-full animate-pulse delay-3700"></div>
          <div className="absolute top-1/6 left-7/8 w-0.5 h-0.5 bg-space-gold/60 rounded-full animate-pulse delay-4000"></div>
          <div className="absolute bottom-1/6 right-7/8 w-0.5 h-0.5 bg-space-silver/60 rounded-full animate-pulse delay-4300"></div>

          {/* Small twinkling stars - greatly expanded */}
          <div className="absolute top-12 left-1/3 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-100"></div>
          <div className="absolute top-48 right-2/3 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-400"></div>
          <div className="absolute bottom-16 left-2/3 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-64 right-1/5 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-900"></div>
          <div className="absolute bottom-48 left-1/5 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-1100"></div>
          <div className="absolute top-1/3 right-3/4 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-1300"></div>
          <div className="absolute bottom-1/4 left-3/5 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-1600"></div>
          <div className="absolute top-2/3 left-4/5 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse delay-1900"></div>

          {/* Additional small stars in rows */}
          <div className="absolute top-14 left-1/7 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse delay-150"></div>
          <div className="absolute top-18 left-2/7 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse delay-250"></div>
          <div className="absolute top-22 left-3/7 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse delay-350"></div>
          <div className="absolute top-26 left-4/7 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse delay-450"></div>
          <div className="absolute top-30 left-5/7 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse delay-550"></div>
          <div className="absolute top-34 left-6/7 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse delay-650"></div>

          {/* More scattered small stars */}
          <div className="absolute top-44 left-1/12 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-750"></div>
          <div className="absolute top-52 left-3/12 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-850"></div>
          <div className="absolute top-60 left-5/12 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-950"></div>
          <div className="absolute top-68 left-7/12 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-1050"></div>
          <div className="absolute top-76 left-9/12 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-1150"></div>
          <div className="absolute top-84 left-11/12 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse delay-1250"></div>

          {/* Distant tiny stars - massive field */}
          <div className="absolute top-8 right-1/8 w-px h-px bg-space-silver/60 rounded-full animate-pulse delay-200"></div>
          <div className="absolute top-20 left-1/8 w-px h-px bg-space-cyan/60 rounded-full animate-pulse delay-600"></div>
          <div className="absolute bottom-12 right-1/8 w-px h-px bg-space-gold/60 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-36 right-5/6 w-px h-px bg-white/60 rounded-full animate-pulse delay-1400"></div>
          <div className="absolute bottom-24 left-5/6 w-px h-px bg-white/60 rounded-full animate-pulse delay-1700"></div>
          <div className="absolute top-5/6 right-2/5 w-px h-px bg-space-silver/60 rounded-full animate-pulse delay-2100"></div>

          {/* Dense star field */}
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className={`absolute w-px h-px rounded-full animate-pulse ${
                i % 4 === 0
                  ? "bg-space-silver/40"
                  : i % 4 === 1
                    ? "bg-space-cyan/40"
                    : i % 4 === 2
                      ? "bg-space-gold/40"
                      : "bg-white/40"
              }`}
              style={{
                top: `${5 + ((i * 7) % 90)}%`,
                left: `${3 + ((i * 11) % 94)}%`,
                animationDelay: `${(i * 200) % 4000}ms`,
              }}
            />
          ))}

          {/* Constellation-like clusters - enhanced */}
          <div className="absolute top-28 left-2/3 w-0.5 h-0.5 bg-space-cyan/70 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-32 left-2/3 w-px h-px bg-space-cyan/70 rounded-full animate-pulse delay-600"></div>
          <div className="absolute top-36 left-2/3 w-px h-px bg-space-cyan/70 rounded-full animate-pulse delay-700"></div>

          <div className="absolute bottom-32 right-1/5 w-0.5 h-0.5 bg-space-gold/70 rounded-full animate-pulse delay-800"></div>
          <div className="absolute bottom-36 right-1/5 w-px h-px bg-space-gold/70 rounded-full animate-pulse delay-900"></div>
          <div className="absolute bottom-28 right-1/5 w-px h-px bg-space-gold/70 rounded-full animate-pulse delay-1000"></div>

          {/* Another constellation */}
          <div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 bg-space-silver/70 rounded-full animate-pulse delay-1100"></div>
          <div className="absolute top-1/4 left-1/4 w-px h-px bg-space-silver/70 rounded-full animate-pulse delay-1200"></div>
          <div className="absolute top-1/4 left-1/4 w-px h-px bg-space-silver/70 rounded-full animate-pulse delay-1300"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">WTM?</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              How it works
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              About
            </a>
            <ThemeToggle />
            <Button
              variant="ghost"
              className="text-white border-white/30 hover:bg-white/10"
            >
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Social Discovery
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="dark:hidden">
                Find Like-minded
                <br />
                <span className="bg-gradient-to-r from-sunset-peach to-sunset-coral bg-clip-text text-transparent">
                  People Near You
                </span>
              </span>
              <span className="hidden dark:block">
                Discover Your
                <br />
                <span className="bg-gradient-to-r from-space-cyan to-space-gold bg-clip-text text-transparent">
                  Night Adventure
                </span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              <span className="dark:hidden">
                Discover your next adventure and meet amazing people who share
                your interests. Our AI matches you with like-minded individuals
                based on your personality and passions.
              </span>
              <span className="hidden dark:block">
                When the sun sets, the real connections begin. Find your tribe
                in the city's electric nightlife scene. Our AI connects night
                owls, explorers, and urban adventurers ready to light up the
                darkness together.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-sunset-peach hover:bg-sunset-coral dark:bg-space-cyan dark:hover:bg-space-gold text-gray-800 dark:text-space-deep font-semibold px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="dark:hidden">Start Exploring</span>
                <span className="hidden dark:block">Join the Night</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white border-white/30 hover:bg-white/10 px-8 py-4 text-lg rounded-2xl"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-sunset-teal dark:bg-space-cyan rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                <span className="dark:hidden">AI-Powered Matching</span>
                <span className="hidden dark:block">Neural Night Matching</span>
              </h3>
              <p className="text-white/70 dark:text-white/80">
                <span className="dark:hidden">
                  Our advanced AI analyzes your personality, interests, and
                  preferences to connect you with your perfect social match.
                </span>
                <span className="hidden dark:block">
                  Advanced neural networks analyze your nightlife preferences,
                  energy levels, and adventure style to connect you with the
                  perfect night crew.
                </span>
              </p>
            </div>

            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-sunset-coral dark:bg-space-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white dark:text-space-deep" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                <span className="dark:hidden">Local Discovery</span>
                <span className="hidden dark:block">Urban Night Explorer</span>
              </h3>
              <p className="text-white/70 dark:text-white/80">
                <span className="dark:hidden">
                  Find exciting activities, events, and experiences happening
                  right in your neighborhood and city.
                </span>
                <span className="hidden dark:block">
                  Discover hidden speakeasies, rooftop parties, late-night food
                  spots, and underground events that make your city come alive
                  after dark.
                </span>
              </p>
            </div>

            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-sunset-peach dark:bg-space-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                <span className="dark:hidden">Meaningful Connections</span>
                <span className="hidden dark:block">Electric Connections</span>
              </h3>
              <p className="text-white/70 dark:text-white/80">
                <span className="dark:hidden">
                  Build genuine friendships and connections based on shared
                  values, interests, and life goals.
                </span>
                <span className="hidden dark:block">
                  Form deep bonds with fellow night explorers who share your
                  passion for adventure, creativity, and making the most of city
                  nights.
                </span>
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-300 fill-current"
                />
              ))}
            </div>
            <p className="text-white/80 text-lg mb-2">
              <span className="dark:hidden">
                "WTM? helped me find my adventure buddy and closest friends!"
              </span>
              <span className="hidden dark:block">
                "WTM? connected me with the most amazing night crew. Every
                weekend is an adventure!"
              </span>
            </p>
            <p className="text-white/60">
              <span className="dark:hidden">
                Join 50,000+ people discovering their next adventure
              </span>
              <span className="hidden dark:block">
                Join 50,000+ night explorers lighting up the city
              </span>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Compass className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">WTM?</span>
              </div>
              <div className="flex space-x-6 text-white/60">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </div>
            </div>
            <div className="text-center mt-8 text-white/50">
              <p>
                &copy; 2024 WTM? All rights reserved. Find your people, find
                your adventure.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
