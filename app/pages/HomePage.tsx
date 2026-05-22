'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { AppCard } from '../components/AppCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { categories, getFeaturedApps, getTrendingApps } from '../data/mockData';
import { motion } from 'motion/react';

export function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const featuredApps = getFeaturedApps();
  const trendingApps = getTrendingApps();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-8 md:p-12"
        >
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl mb-4">
              Discover Amazing Apps
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              Browse thousands of applications for Windows, macOS, and Linux. Find the perfect tools for productivity, development, gaming, and more.
            </p>
            <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-background/50 backdrop-blur-sm border-primary/20"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-6 bg-primary hover:bg-primary/90">
                Search
              </Button>
            </form>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              <h2>Featured Apps</h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/browse')}
              className="text-primary hover:text-primary/80"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselContent>
              {featuredApps.map((app) => (
                <CarouselItem key={app.id} className="md:basis-1/2 lg:basis-1/3">
                  <AppCard
                    app={app}
                    onClick={() => navigate(`/app/${app.id}`)}
                    showInstallButton
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2>Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {trendingApps.slice(0, 8).map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onClick={() => navigate(`/app/${app.id}`)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(1).map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:bg-accent hover:border-primary/30 transition-all duration-200"
                onClick={() => navigate(`/browse?category=${category.id}`)}
              >
                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <div className="w-7 h-7 text-primary">
                      {category.id === 'productivity' && '💼'}
                      {category.id === 'development' && '💻'}
                      {category.id === 'games' && '🎮'}
                      {category.id === 'utilities' && '🔧'}
                      {category.id === 'creative' && '🎨'}
                      {category.id === 'communication' && '💬'}
                    </div>
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
