import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number; // in milliseconds
}

const LoadingScreen = ({ onComplete, duration = 12000 }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100 && onComplete) {
        setTimeout(onComplete, 500);
      } else if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Space Background with Dynamic Colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 northern-lights-bg">
        {/* Northern Lights Waves */}
        <div className="absolute inset-0 northern-lights-wave wave-1"></div>
        <div className="absolute inset-0 northern-lights-wave wave-2"></div>
        <div className="absolute inset-0 northern-lights-wave wave-3"></div>
        <div className="absolute inset-0 northern-lights-wave wave-4"></div>
      </div>

      {/* Earth in Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="earth-container">
          <div className="earth">
            {/* Earth surface with continents */}
            <div className="earth-surface">
              <div className="continent continent-1"></div>
              <div className="continent continent-2"></div>
              <div className="continent continent-3"></div>
              <div className="continent continent-4"></div>
            </div>

            {/* Earth atmosphere glow */}
            <div className="earth-atmosphere"></div>

            {/* Light side illumination */}
            <div className="earth-light-side"></div>
          </div>
        </div>

        {/* Moon orbiting Earth */}
        <div className="moon-orbit">
          <div className="moon">
            {/* Moon surface with craters */}
            <div className="moon-surface">
              <div className="crater crater-1"></div>
              <div className="crater crater-2"></div>
              <div className="crater crater-3"></div>
              <div className="crater crater-4"></div>
            </div>

            {/* Moon light reflection */}
            <div className="moon-light"></div>

            {/* Light beam from moon to earth */}
            <div className="light-beam"></div>
          </div>
        </div>
      </div>

      {/* Cosmic Stars */}
      <div className="absolute inset-0 cosmic-stars">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="cosmic-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              '--size': `${0.5 + Math.random() * 2}px`
            }}
          />
        ))}
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 particle-field">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="cosmic-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              '--direction': `${Math.random() * 360}deg`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
            Analyzing your personality…
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 drop-shadow-md leading-relaxed">
            We're mapping your traits into your unique day & night adventure profile
          </p>

          {/* Loading Indicator */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto">
              <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-white/60 to-white/80 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-white/70 text-sm mt-2 drop-shadow-sm">
                {Math.round(progress)}% complete
              </div>
            </div>

            {/* Pulsing Dots */}
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
              <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
              <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default LoadingScreen;
