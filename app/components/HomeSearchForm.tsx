'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function HomeSearchForm() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-4 sm:p-6 md:p-8 lg:p-12"
    >
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
          Discover Amazing Apps
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-5 md:mb-6 max-w-2xl line-clamp-3 sm:line-clamp-none">
          Browse thousands of applications for Windows, macOS, and Linux. Find the perfect tools for productivity, development, gaming, and more.
        </p>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full sm:max-w-2xl">
          <div className="flex-1 relative min-w-0">
            <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground flex-shrink-0" />
            <Input
              type="text"
              placeholder="Search for apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base bg-background/50 backdrop-blur-sm border-primary/20"
            />
          </div>
          <Button 
            type="submit" 
            size="sm"
            className="h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base bg-primary hover:bg-primary/90 whitespace-nowrap"
          >
            Search
          </Button>
        </form>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </motion.div>
  );
}
