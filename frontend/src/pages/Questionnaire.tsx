import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight, 
  Sun, 
  Moon, 
  MapPin, 
  Heart,
  Music,
  Code,
  Palette,
  Camera,
  Book,
  Gamepad2,
  Users,
  Zap
} from "lucide-react";

interface QuestionnaireAnswers {
  step1: string[];
  step2: string[];
  step3: {
    socialEnergy: number[];
    groupSize: string[];
    atmosphere: string[];
    noiseTolerance: string;
    alcoholPreference: string;
  };
  step4: {
    availability: string[];
    distance: number[];
    budget: string;
    city: string;
    useLocation: boolean;
  };
  step5: {
    location: string[];
    accessibility: string[];
    foodPreference: string[];
    ageRange: string[];
  };
  step6: {
    planner: number[];
    noveltySeeking: number[];
    schedule: number[];
    communication: number[];
    socialBattery: number[];
  };
}

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDark, setIsDark] = useState(false);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    step1: [],
    step2: [],
    step3: {
      socialEnergy: [3],
      groupSize: [],
      atmosphere: [],
      noiseTolerance: "",
      alcoholPreference: "",
    },
    step4: {
      availability: [],
      distance: [10],
      budget: "",
      city: "",
      useLocation: false,
    },
    step5: {
      location: [],
      accessibility: [],
      foodPreference: [],
      ageRange: [],
    },
    step6: {
      planner: [3],
      noveltySeeking: [3],
      schedule: [3],
      communication: [3],
      socialBattery: [3],
    },
  });

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const eventInterests = [
    { id: "live-music", label: "Live Music", icon: Music },
    { id: "tech-conferences", label: "Tech Conferences", icon: Code },
    { id: "food-festivals", label: "Food Festivals", icon: Heart },
    { id: "art-exhibitions", label: "Art Exhibitions", icon: Palette },
    { id: "sports-games", label: "Sports Games", icon: Zap },
    { id: "theatre", label: "Theatre & Performances", icon: Users },
    { id: "outdoor-adventures", label: "Outdoor Adventures", icon: MapPin },
    { id: "book-clubs", label: "Book Clubs", icon: Book },
    { id: "wellness-retreats", label: "Wellness Retreats", icon: Heart },
    { id: "networking-mixers", label: "Networking Mixers", icon: Users },
    { id: "gaming-tournaments", label: "Gaming Tournaments", icon: Gamepad2 },
    { id: "comedy-shows", label: "Comedy Shows", icon: Users },
    { id: "dance-parties", label: "Dance Parties", icon: Music },
    { id: "film-screenings", label: "Film Screenings", icon: Camera },
    { id: "startup-pitches", label: "Startup Pitches", icon: Code },
    { id: "hackathons", label: "Hackathons", icon: Code },
    { id: "museum-nights", label: "Museum Nights", icon: Palette },
    { id: "farmers-markets", label: "Farmer's Markets", icon: Heart },
    { id: "trivia-nights", label: "Trivia Nights", icon: Book },
    { id: "poetry-slams", label: "Poetry Slams", icon: Book },
  ];

  const hobbies = [
    "Reading", "Hiking", "Traveling", "Cooking", "Coding", "Painting", "Photography", 
    "Gardening", "Yoga", "Volunteering", "DIY Projects", "Fitness", "Board Games", 
    "Writing", "Meditation", "Fashion", "Collecting", "Learning Languages", "Chess", 
    "Cycling", "Running", "Swimming", "Calligraphy"
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      // Set window.__wtmAnswers and navigate to results
      (window as any).__wtmAnswers = answers;
      navigate("/results");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateStep1 = (interestId: string) => {
    setAnswers(prev => ({
      ...prev,
      step1: prev.step1.includes(interestId)
        ? prev.step1.filter(id => id !== interestId)
        : [...prev.step1, interestId]
    }));
  };

  const updateStep2 = (hobby: string) => {
    setAnswers(prev => ({
      ...prev,
      step2: prev.step2.includes(hobby)
        ? prev.step2.filter(h => h !== hobby)
        : [...prev.step2, hobby]
    }));
  };

  const renderStarfield = () => {
    if (!isDark) return null;

    const stars = Array.from({ length: 50 }, (_, i) => (
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

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white dark:text-dark-text mb-4">
          What events interest you?
        </h2>
        <p className="text-white/80 dark:text-dark-muted text-lg">
          Select all that apply - the more you choose, the better we can match you!
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {eventInterests.map((interest) => {
          const Icon = interest.icon;
          const isSelected = answers.step1.includes(interest.id);
          
          return (
            <Card
              key={interest.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                isSelected 
                  ? 'ring-2 ring-sunset-coral dark:ring-dark-primary bg-white/20 dark:bg-dark-card' 
                  : 'bg-white/10 dark:bg-dark-card hover:bg-white/15 dark:hover:bg-dark-card/80'
              }`}
              onClick={() => updateStep1(interest.id)}
            >
              <CardContent className="p-4 text-center">
                <Icon className="w-8 h-8 mx-auto mb-2 text-white dark:text-dark-text" />
                <p className="text-sm font-medium text-white dark:text-dark-text">
                  {interest.label}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white dark:text-dark-text mb-4">
          Your hobbies & passions
        </h2>
        <p className="text-white/80 dark:text-dark-muted text-lg">
          What do you love doing in your free time?
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {hobbies.map((hobby) => {
          const isSelected = answers.step2.includes(hobby);
          
          return (
            <Badge
              key={hobby}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer text-base px-4 py-2 transition-all duration-200 hover:scale-105 ${
                isSelected 
                  ? 'bg-sunset-coral dark:bg-dark-primary text-white' 
                  : 'bg-white/10 dark:bg-dark-card text-white dark:text-dark-text border-white/30 dark:border-dark-text/30 hover:bg-white/20 dark:hover:bg-dark-card/80'
              }`}
              onClick={() => updateStep2(hobby)}
            >
              {hobby}
            </Badge>
          );
        })}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white dark:text-dark-text mb-4">
          Social energy & vibe
        </h2>
        <p className="text-white/80 dark:text-dark-muted text-lg">
          Help us understand your social style
        </p>
      </div>
      
      <Card className="bg-white/10 dark:bg-dark-card p-6">
        <CardContent className="space-y-6">
          <div>
            <label className="text-white dark:text-dark-text font-medium mb-4 block">
              Social Energy Level
            </label>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/70 dark:text-dark-muted">Prefer Alone</span>
              <Slider
                value={answers.step3.socialEnergy}
                onValueChange={(value) => 
                  setAnswers(prev => ({
                    ...prev,
                    step3: { ...prev.step3, socialEnergy: value }
                  }))
                }
                max={5}
                min={1}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-white/70 dark:text-dark-muted">Life of the Party</span>
            </div>
          </div>

          <div>
            <label className="text-white dark:text-dark-text font-medium mb-3 block">
              Preferred Group Size
            </label>
            <div className="flex flex-wrap gap-2">
              {["Solo", "Duo", "Small Group (3-5)", "Medium (6-10)", "Big Crowd (10+)"].map((size) => (
                <Badge
                  key={size}
                  variant={answers.step3.groupSize.includes(size) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    answers.step3.groupSize.includes(size)
                      ? 'bg-sunset-coral dark:bg-dark-primary text-white'
                      : 'bg-white/10 dark:bg-dark-card/50 text-white dark:text-dark-text border-white/30 dark:border-dark-text/30'
                  }`}
                  onClick={() => {
                    setAnswers(prev => ({
                      ...prev,
                      step3: {
                        ...prev.step3,
                        groupSize: prev.step3.groupSize.includes(size)
                          ? prev.step3.groupSize.filter(s => s !== size)
                          : [...prev.step3.groupSize, size]
                      }
                    }));
                  }}
                >
                  {size}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white dark:text-dark-text font-medium mb-3 block">
              Atmosphere Preference
            </label>
            <div className="flex flex-wrap gap-2">
              {["High-Energy", "Chill", "Educational", "Creative/Arts", "Outdoorsy", "Family-Friendly"].map((atmosphere) => (
                <Badge
                  key={atmosphere}
                  variant={answers.step3.atmosphere.includes(atmosphere) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    answers.step3.atmosphere.includes(atmosphere)
                      ? 'bg-sunset-coral dark:bg-dark-primary text-white'
                      : 'bg-white/10 dark:bg-dark-card/50 text-white dark:text-dark-text border-white/30 dark:border-dark-text/30'
                  }`}
                  onClick={() => {
                    setAnswers(prev => ({
                      ...prev,
                      step3: {
                        ...prev.step3,
                        atmosphere: prev.step3.atmosphere.includes(atmosphere)
                          ? prev.step3.atmosphere.filter(a => a !== atmosphere)
                          : [...prev.step3.atmosphere, atmosphere]
                      }
                    }));
                  }}
                >
                  {atmosphere}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white dark:text-dark-text mb-4">
          Logistics & availability
        </h2>
        <p className="text-white/80 dark:text-dark-muted text-lg">
          When and where are you available to meet up?
        </p>
      </div>
      
      <Card className="bg-white/10 dark:bg-dark-card p-6">
        <CardContent className="space-y-6">
          <div>
            <label className="text-white dark:text-dark-text font-medium mb-3 block">
              Availability
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "Weekday Mornings", "Weekday Afternoons", "Weekday Evenings",
                "Friday Night", "Saturday Day", "Saturday Night", "Sunday Day", "Sunday Night"
              ].map((time) => (
                <div key={time} className="flex items-center space-x-2">
                  <Checkbox
                    id={time}
                    checked={answers.step4.availability.includes(time)}
                    onCheckedChange={(checked) => {
                      setAnswers(prev => ({
                        ...prev,
                        step4: {
                          ...prev.step4,
                          availability: checked
                            ? [...prev.step4.availability, time]
                            : prev.step4.availability.filter(t => t !== time)
                        }
                      }));
                    }}
                  />
                  <label htmlFor={time} className="text-sm text-white dark:text-dark-text cursor-pointer">
                    {time}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white dark:text-dark-text font-medium mb-4 block">
              Travel Distance (miles)
            </label>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/70 dark:text-dark-muted">1</span>
              <Slider
                value={answers.step4.distance}
                onValueChange={(value) => 
                  setAnswers(prev => ({
                    ...prev,
                    step4: { ...prev.step4, distance: value }
                  }))
                }
                max={50}
                min={1}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-white/70 dark:text-dark-muted">50+</span>
            </div>
            <div className="text-center mt-2">
              <span className="text-white dark:text-dark-text font-medium">
                {answers.step4.distance[0]} miles
              </span>
            </div>
          </div>

          <div>
            <label className="text-white dark:text-dark-text font-medium mb-3 block">
              Budget Range
            </label>
            <div className="flex flex-wrap gap-2">
              {["Free", "<$25", "$25-$50", "$50-$100", "$100+"].map((budget) => (
                <Badge
                  key={budget}
                  variant={answers.step4.budget === budget ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    answers.step4.budget === budget
                      ? 'bg-sunset-coral dark:bg-dark-primary text-white'
                      : 'bg-white/10 dark:bg-dark-card/50 text-white dark:text-dark-text border-white/30 dark:border-dark-text/30'
                  }`}
                  onClick={() => {
                    setAnswers(prev => ({
                      ...prev,
                      step4: { ...prev.step4, budget: budget }
                    }));
                  }}
                >
                  {budget}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white dark:text-dark-text font-medium mb-3 block">
              Your City
            </label>
            <div className="flex gap-3">
              <Input
                value={answers.step4.city}
                onChange={(e) => setAnswers(prev => ({
                  ...prev,
                  step4: { ...prev.step4, city: e.target.value }
                }))}
                placeholder="Enter your city"
                className="bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text placeholder:text-white/50 dark:placeholder:text-dark-muted/70"
              />
              <Button
                variant="outline"
                className="whitespace-nowrap bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text hover:bg-white/20 dark:hover:bg-dark-card/80"
                onClick={() => setAnswers(prev => ({
                  ...prev,
                  step4: { ...prev.step4, useLocation: !prev.step4.useLocation }
                }))}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Use Location
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white dark:text-dark-text mb-4">
          Preferences & constraints
        </h2>
        <p className="text-white/80 dark:text-dark-muted text-lg">
          Help us find the perfect activities for you
        </p>
      </div>
      
      <Card className="bg-white/10 dark:bg-dark-card p-6">
        <CardContent className="space-y-6">
          <div>
            <label className="text-white dark:text-dark-text font-medium mb-3 block">
              Location Preference
            </label>
            <div className="flex flex-wrap gap-2">
              {["Indoors", "Outdoors", "Either"].map((location) => (
                <Badge
                  key={location}
                  variant={answers.step5.location.includes(location) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    answers.step5.location.includes(location)
                      ? 'bg-sunset-coral dark:bg-dark-primary text-white'
                      : 'bg-white/10 dark:bg-dark-card/50 text-white dark:text-dark-text border-white/30 dark:border-dark-text/30'
                  }`}
                  onClick={() => {
                    setAnswers(prev => ({
                      ...prev,
                      step5: {
                        ...prev.step5,
                        location: prev.step5.location.includes(location)
                          ? prev.step5.location.filter(l => l !== location)
                          : [...prev.step5.location, location]
                      }
                    }));
                  }}
                >
                  {location}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white dark:text-dark-text font-medium mb-3 block">
              Accessibility Needs
            </label>
            <div className="flex flex-wrap gap-2">
              {["Wheelchair Access", "Quiet Space", "Step-Free", "Service Animals", "Captioning"].map((need) => (
                <Badge
                  key={need}
                  variant={answers.step5.accessibility.includes(need) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    answers.step5.accessibility.includes(need)
                      ? 'bg-sunset-coral dark:bg-dark-primary text-white'
                      : 'bg-white/10 dark:bg-dark-card/50 text-white dark:text-dark-text border-white/30 dark:border-dark-text/30'
                  }`}
                  onClick={() => {
                    setAnswers(prev => ({
                      ...prev,
                      step5: {
                        ...prev.step5,
                        accessibility: prev.step5.accessibility.includes(need)
                          ? prev.step5.accessibility.filter(n => n !== need)
                          : [...prev.step5.accessibility, need]
                      }
                    }));
                  }}
                >
                  {need}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white dark:text-dark-text font-medium mb-3 block">
              Food Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {["Veg-only", "Vegan", "Halal/Kosher", "No Preference", "Other"].map((food) => (
                <Badge
                  key={food}
                  variant={answers.step5.foodPreference.includes(food) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    answers.step5.foodPreference.includes(food)
                      ? 'bg-sunset-coral dark:bg-dark-primary text-white'
                      : 'bg-white/10 dark:bg-dark-card/50 text-white dark:text-dark-text border-white/30 dark:border-dark-text/30'
                  }`}
                  onClick={() => {
                    setAnswers(prev => ({
                      ...prev,
                      step5: {
                        ...prev.step5,
                        foodPreference: prev.step5.foodPreference.includes(food)
                          ? prev.step5.foodPreference.filter(f => f !== food)
                          : [...prev.step5.foodPreference, food]
                      }
                    }));
                  }}
                >
                  {food}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white dark:text-dark-text font-medium mb-3 block">
              Age Range Comfort
            </label>
            <div className="flex flex-wrap gap-2">
              {["All ages", "18+", "21+"].map((age) => (
                <Badge
                  key={age}
                  variant={answers.step5.ageRange.includes(age) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    answers.step5.ageRange.includes(age)
                      ? 'bg-sunset-coral dark:bg-dark-primary text-white'
                      : 'bg-white/10 dark:bg-dark-card/50 text-white dark:text-dark-text border-white/30 dark:border-dark-text/30'
                  }`}
                  onClick={() => {
                    setAnswers(prev => ({
                      ...prev,
                      step5: {
                        ...prev.step5,
                        ageRange: prev.step5.ageRange.includes(age)
                          ? prev.step5.ageRange.filter(a => a !== age)
                          : [...prev.step5.ageRange, age]
                      }
                    }));
                  }}
                >
                  {age}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white dark:text-dark-text mb-4">
          Personality self-view
        </h2>
        <p className="text-white/80 dark:text-dark-muted text-lg">
          Rate yourself on these personality dimensions
        </p>
      </div>
      
      <Card className="bg-white/10 dark:bg-dark-card p-6">
        <CardContent className="space-y-8">
          {[
            { key: "planner", left: "Planner", right: "Spontaneous" },
            { key: "noveltySeeking", left: "Familiar Favorites", right: "Novelty-Seeking" },
            { key: "schedule", left: "Early Bird", right: "Night Owl" },
            { key: "communication", left: "Message-First", right: "IRL-First" },
            { key: "socialBattery", left: "Low Social Battery", right: "High Social Battery" },
          ].map(({ key, left, right }) => (
            <div key={key}>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-white/70 dark:text-dark-muted w-32 text-right">{left}</span>
                <Slider
                  value={answers.step6[key as keyof typeof answers.step6]}
                  onValueChange={(value) => 
                    setAnswers(prev => ({
                      ...prev,
                      step6: { ...prev.step6, [key]: value }
                    }))
                  }
                  max={5}
                  min={1}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-white/70 dark:text-dark-muted w-32">{right}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-sunset-gradient dark:bg-dark-questionnaire relative overflow-hidden transition-all duration-500">
      {renderStarfield()}
      
      {/* Theme Toggle */}
      <button
        data-id="theme-toggle"
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/20 dark:bg-dark-card backdrop-blur-sm rounded-full border border-white/30 dark:border-dark-text/30 transition-all duration-300 hover:bg-white/30 dark:hover:bg-dark-card/80 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-dark-primary/50 flex items-center justify-center"
        aria-pressed={isDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-dark-text" />
        ) : (
          <Moon className="w-6 h-6 text-white" />
        )}
      </button>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Progress Bar */}
        <div className="sticky top-0 z-40 bg-white/10 dark:bg-dark-card/50 backdrop-blur-sm border-b border-white/20 dark:border-dark-text/20">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold text-white dark:text-dark-text">
                WTM? Questionnaire
              </h1>
              <span className="text-sm text-white/70 dark:text-dark-muted">
                Step {currentStep} of 6
              </span>
            </div>
            <div className="w-full bg-white/20 dark:bg-dark-text/20 rounded-full h-2">
              <div
                className="bg-sunset-coral dark:bg-dark-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {getCurrentStepContent()}
          </div>
        </div>

        {/* Navigation */}
        <div className="sticky bottom-0 z-40 bg-white/10 dark:bg-dark-card/50 backdrop-blur-sm border-t border-white/20 dark:border-dark-text/20">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex justify-between items-center">
              <Button
                data-id="questionnaire-back"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="bg-white/10 dark:bg-dark-card border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text hover:bg-white/20 dark:hover:bg-dark-card/80 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex gap-4">
                {currentStep < 6 && (
                  <Button
                    variant="ghost"
                    className="text-white/70 dark:text-dark-muted hover:text-white dark:hover:text-dark-text hover:bg-white/10 dark:hover:bg-dark-card/50"
                  >
                    Skip
                  </Button>
                )}
                
                <Button
                  data-id={currentStep === 6 ? "see-results" : "questionnaire-next"}
                  onClick={handleNext}
                  className="bg-sunset-coral dark:bg-dark-primary hover:bg-sunset-coral/90 dark:hover:bg-dark-primary/90 text-white font-semibold px-6"
                >
                  {currentStep === 6 ? "See My Personality Match" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
