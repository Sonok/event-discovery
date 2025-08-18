import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Eye,
  Filter,
  X,
  RefreshCw,
  Music,
  Code,
  Coffee,
  Palette,
  Trees,
  Laugh,
  Moon,
  Trophy,
  Star
} from "lucide-react";

// Types
interface Event {
  id: string;
  name: string;
  startsAt: string;
  venue: string;
  imageUrl?: string;
  categories: string[];
  price: number;
  score: number; // 0-1 similarity score
}

interface Filters {
  distance: number[];
  dateFrom: string;
  dateTo: string;
  priceRanges: string[];
  categories: string[];
}

interface DiscoverEventsProps {
  events: Event[];
  hasMore: boolean;
  isLoading: boolean;
  onFilterChange: (filters: Filters) => void;
  onLoadMore: () => void;
  onSave: (id: string) => void;
  onOpen: (id: string) => void;
}

// Utility functions
const formatDate = (startsAt: string): string => {
  const date = new Date(startsAt);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (eventDate.getTime() === today.getTime()) {
    return `Today ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  } else if (eventDate.getTime() === today.getTime() + 86400000) {
    return `Tomorrow ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
};

const pct = (score: number): number => Math.round(score * 100);

const getPriceLabel = (price: number): string => {
  if (price === 0) return "Free";
  if (price < 25) return "<$25";
  if (price < 50) return "$25–$50";
  if (price < 100) return "$50–$100";
  return "$100+";
};

const getCategoryIcon = (category: string) => {
  const icons = {
    Music: Music,
    Tech: Code,
    Food: Coffee,
    Art: Palette,
    Outdoors: Trees,
    Comedy: Laugh,
    Nightlife: Moon,
    Sports: Trophy,
  };
  return icons[category as keyof typeof icons] || Star;
};

const PRICE_RANGES = ["Free", "<$25", "$25–$50", "$50–$100", "$100+"];
const CATEGORIES = ["Music", "Tech", "Food", "Art", "Outdoors", "Comedy", "Nightlife", "Sports"];

const DiscoverEvents = ({
  events,
  hasMore,
  isLoading,
  onFilterChange,
  onLoadMore,
  onSave,
  onOpen,
}: DiscoverEventsProps) => {
  const [filters, setFilters] = useState<Filters>({
    distance: [25],
    dateFrom: "",
    dateTo: "",
    priceRanges: [],
    categories: [],
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Handle filter changes
  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  }, [filters, onFilterChange]);

  const resetFilters = () => {
    const emptyFilters: Filters = {
      distance: [25],
      dateFrom: "",
      dateTo: "",
      priceRanges: [],
      categories: [],
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const togglePriceRange = (range: string) => {
    const newRanges = filters.priceRanges.includes(range)
      ? filters.priceRanges.filter(r => r !== range)
      : [...filters.priceRanges, range];
    updateFilters({ priceRanges: newRanges });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  // Skeleton loading cards
  const SkeletonCard = () => (
    <Card className="group bg-white/10 dark:bg-dark-card backdrop-blur-sm border-white/20 dark:border-dark-text/20">
      <CardContent className="p-0">
        <Skeleton className="w-full h-48 rounded-t-lg bg-white/20 dark:bg-dark-text/20" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-4 w-3/4 bg-white/20 dark:bg-dark-text/20" />
          <Skeleton className="h-3 w-1/2 bg-white/20 dark:bg-dark-text/20" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 bg-white/20 dark:bg-dark-text/20" />
            <Skeleton className="h-6 w-12 bg-white/20 dark:bg-dark-text/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Event card component
  const EventCard = ({ event }: { event: Event }) => {
    const IconComponent = getCategoryIcon(event.categories[0]);

    return (
      <Card className="group bg-white/10 dark:bg-dark-card backdrop-blur-sm border-white/20 dark:border-dark-text/20 hover:bg-white/15 dark:hover:bg-dark-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-dark-primary/20">
        <CardContent className="p-0 relative">
          {/* Similarity Badge */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  className="absolute top-3 right-3 z-10 bg-sunset-coral dark:bg-dark-primary text-white font-semibold px-2 py-1 text-xs"
                >
                  {pct(event.score)}% Match
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Match = cosine similarity between your profile and this event.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Event Image */}
          <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt={event.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-sunset-orange via-sunset-pink to-sunset-purple dark:from-space-purple dark:via-space-blue dark:to-space-cyan flex items-center justify-center">
                <IconComponent className="w-12 h-12 text-white/80" />
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="p-4 space-y-3">
            {/* Event Name */}
            <h3 className="font-semibold text-white dark:text-dark-text text-lg line-clamp-2 leading-tight">
              {event.name}
            </h3>

            {/* Time & Venue */}
            <div className="space-y-1">
              <div className="flex items-center text-white/70 dark:text-dark-muted text-sm">
                <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                {formatDate(event.startsAt)}
              </div>
              <div className="flex items-center text-white/70 dark:text-dark-muted text-sm">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {event.categories.slice(0, 2).map(category => (
                <Badge
                  key={category}
                  variant="outline"
                  className="bg-white/10 dark:bg-dark-card/50 text-white dark:text-dark-text border-white/30 dark:border-dark-text/30 text-xs"
                >
                  {category}
                </Badge>
              ))}
              <Badge
                variant="outline"
                className="bg-sunset-peach/20 dark:bg-dark-primary/20 text-white dark:text-dark-text border-sunset-peach/40 dark:border-dark-primary/40 text-xs"
              >
                {getPriceLabel(event.price)}
              </Badge>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSave(event.id)}
                className="flex-1 bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text hover:bg-white/20 dark:hover:bg-dark-card/80"
                aria-label={`Save ${event.name}`}
              >
                <Heart className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button
                size="sm"
                onClick={() => onOpen(event.id)}
                className="flex-1 bg-sunset-coral dark:bg-dark-primary hover:bg-sunset-coral/90 dark:hover:bg-dark-primary/90 text-white"
                aria-label={`View details for ${event.name}`}
              >
                <Eye className="w-4 h-4 mr-1" />
                Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Filters sidebar
  const FiltersSidebar = () => (
    <aside className={`
      ${isFiltersOpen ? 'block' : 'hidden'} lg:block
      fixed lg:sticky top-0 left-0 z-40 lg:z-auto
      w-80 h-screen lg:h-auto overflow-y-auto
      bg-white/10 dark:bg-dark-card backdrop-blur-sm
      border-r border-white/20 dark:border-dark-text/20 lg:border-r-0 lg:border
      lg:rounded-2xl p-6 space-y-6
    `}>
      {/* Mobile close button */}
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="text-lg font-semibold text-white dark:text-dark-text">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsFiltersOpen(false)}
          className="text-white dark:text-dark-text"
          aria-label="Close filters"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Distance */}
      <div className="space-y-3">
        <Label className="text-white dark:text-dark-text font-medium">
          Distance: {filters.distance[0]} miles
        </Label>
        <Slider
          value={filters.distance}
          onValueChange={(value) => updateFilters({ distance: value })}
          max={100}
          min={1}
          step={1}
          className="w-full"
        />
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <Label className="text-white dark:text-dark-text font-medium">Date Range</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="dateFrom" className="text-xs text-white/70 dark:text-dark-muted">From</Label>
            <Input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => updateFilters({ dateFrom: e.target.value })}
              className="bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text"
            />
          </div>
          <div>
            <Label htmlFor="dateTo" className="text-xs text-white/70 dark:text-dark-muted">To</Label>
            <Input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={(e) => updateFilters({ dateTo: e.target.value })}
              className="bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text"
            />
          </div>
        </div>
      </div>

      {/* Price Ranges */}
      <div className="space-y-3">
        <Label className="text-white dark:text-dark-text font-medium">Price</Label>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map(range => (
            <Badge
              key={range}
              variant={filters.priceRanges.includes(range) ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                filters.priceRanges.includes(range)
                  ? 'bg-sunset-coral dark:bg-dark-primary text-white'
                  : 'bg-white/10 dark:bg-dark-card/50 text-white dark:text-dark-text border-white/30 dark:border-dark-text/30 hover:bg-white/20 dark:hover:bg-dark-card/80'
              }`}
              onClick={() => togglePriceRange(range)}
            >
              {range}
            </Badge>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-white dark:text-dark-text font-medium">Categories</Label>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map(category => {
            const IconComponent = getCategoryIcon(category);
            return (
              <Badge
                key={category}
                variant={filters.categories.includes(category) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 justify-start p-3 h-auto ${
                  filters.categories.includes(category)
                    ? 'bg-sunset-coral dark:bg-dark-primary text-white'
                    : 'bg-white/10 dark:bg-dark-card/50 text-white dark:text-dark-text border-white/30 dark:border-dark-text/30 hover:bg-white/20 dark:hover:bg-dark-card/80'
                }`}
                onClick={() => toggleCategory(category)}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={resetFilters}
        className="w-full bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text hover:bg-white/20 dark:hover:bg-dark-card/80"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Reset Filters
      </Button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-sunset-gradient dark:bg-dark-questionnaire">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-dark-text mb-4">
            Discover Events
          </h1>
          <p className="text-xl text-white/80 dark:text-dark-muted">
            Personalized events near you.
          </p>
        </header>

        <div className="flex gap-8">
          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-sunset-coral dark:bg-dark-primary border-0 text-white shadow-lg hover:shadow-xl"
            aria-label="Open filters"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>

          {/* Filters Sidebar */}
          <FiltersSidebar />

          {/* Mobile overlay */}
          {isFiltersOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setIsFiltersOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            {/* Results Grid */}
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}

                {/* Loading skeletons */}
                {isLoading && Array.from({ length: 6 }, (_, i) => (
                  <SkeletonCard key={`skeleton-${i}`} />
                ))}
              </div>
            ) : !isLoading ? (
              /* Empty State */
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 dark:bg-dark-card rounded-full mb-6">
                  <Calendar className="w-10 h-10 text-white/60 dark:text-dark-muted" />
                </div>
                <h3 className="text-2xl font-semibold text-white dark:text-dark-text mb-4">
                  No events match your filters yet.
                </h3>
                <p className="text-white/70 dark:text-dark-muted mb-6">
                  Try adjusting your filters or check back later for new events.
                </p>
                <Button
                  onClick={resetFilters}
                  className="bg-sunset-coral dark:bg-dark-primary hover:bg-sunset-coral/90 dark:hover:bg-dark-primary/90 text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Filters
                </Button>
              </div>
            ) : (
              /* Initial loading */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }, (_, i) => (
                  <SkeletonCard key={`initial-skeleton-${i}`} />
                ))}
              </div>
            )}

            {/* Infinite Scroll Sentinel */}
            <div ref={sentinelRef} className="h-4" />

            {/* Load More Button (Accessibility Fallback) */}
            {hasMore && events.length > 0 && (
              <div className="text-center pt-8">
                <Button
                  onClick={onLoadMore}
                  disabled={isLoading}
                  variant="outline"
                  className="bg-white/10 dark:bg-dark-card/50 border-white/30 dark:border-dark-text/30 text-white dark:text-dark-text hover:bg-white/20 dark:hover:bg-dark-card/80"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Events
                    </>
                  )}
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DiscoverEvents;

// Usage Example:
//
// const mockEvents: Event[] = [
//   {
//     id: "1",
//     name: "Summer Music Festival 2024 - Three Days of Electronic Beats",
//     startsAt: "2024-07-15T18:00:00Z",
//     venue: "Central Park Amphitheater, New York",
//     imageUrl: "https://example.com/festival.jpg",
//     categories: ["Music", "Outdoors"],
//     price: 85,
//     score: 0.92
//   },
//   {
//     id: "2",
//     name: "Tech Innovation Summit",
//     startsAt: "2024-07-20T09:00:00Z",
//     venue: "Convention Center",
//     categories: ["Tech"],
//     price: 0,
//     score: 0.78
//   }
// ];
//
// <DiscoverEvents
//   events={mockEvents}
//   hasMore={true}
//   isLoading={false}
//   onFilterChange={(newFilters) => console.log('Filters changed:', newFilters)}
//   onLoadMore={() => console.log('Load more events')}
//   onSave={(id) => console.log('Save event:', id)}
//   onOpen={(id) => console.log('Open event details:', id)}
// />
