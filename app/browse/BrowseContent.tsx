'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { BrowseFilters } from '../components/BrowseFilters';
import { AppCard } from '../components/AppCard.client';
import { apps, type OSType } from '../data/mockData';

interface BrowseContentProps {
  searchParams?: {
    search?: string;
    category?: string;
  };
}

export function BrowseContent({ searchParams }: BrowseContentProps) {
  const [searchQuery, setSearchQuery] = useState(searchParams?.search || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.category || 'all');
  const [selectedOS, setSelectedOS] = useState<OSType | 'all'>('all');
  const [sortBy, setSortBy] = useState('downloads');

  const filteredApps = apps
    .filter((app) => {
      const categoryMatch = selectedCategory === 'all' || app.category === selectedCategory;
      const searchMatch =
        searchQuery === '' ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.developer.toLowerCase().includes(searchQuery.toLowerCase());
      const osMatch = selectedOS === 'all' || app.supportedOS.includes(selectedOS);
      return categoryMatch && searchMatch && osMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'downloads':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6">Browse Apps</h1>

        <BrowseFilters
          initialSearch={searchQuery}
          initialCategory={selectedCategory}
          onFiltersChange={(filters) => {
            setSearchQuery(filters.search);
            setSelectedCategory(filters.category);
            setSelectedOS(filters.os);
            setSortBy(filters.sortBy);
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground">
            {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'} found
          </p>
        </div>

        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredApps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AppCard app={app} showInstallButton />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2">No apps found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
