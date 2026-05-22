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
  );
}
