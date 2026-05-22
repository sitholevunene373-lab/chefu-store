'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { type OSType } from '../data/mockData';

const categories = [
  { id: 'all', name: 'All Apps' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'development', name: 'Development' },
  { id: 'games', name: 'Games' },
  { id: 'utilities', name: 'Utilities' },
  { id: 'creative', name: 'Creative' },
  { id: 'communication', name: 'Communication' },
];

interface BrowseFiltersProps {
  onFiltersChange: (filters: {
    search: string;
    category: string;
    os: OSType | 'all';
    sortBy: string;
  }) => void;
  initialSearch?: string;
  initialCategory?: string;
}

export function BrowseFilters({ onFiltersChange, initialSearch = '', initialCategory = 'all' }: BrowseFiltersProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedOS, setSelectedOS] = useState<OSType | 'all'>('all');
  const [sortBy, setSortBy] = useState('downloads');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onFiltersChange({
      search: value,
      category: selectedCategory,
      os: selectedOS,
      sortBy,
    });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    router.push(`/browse?category=${value}`);
    onFiltersChange({
      search: searchQuery,
      category: value,
      os: selectedOS,
      sortBy,
    });
  };

  const handleOSChange = (value: string) => {
    const os = value as OSType | 'all';
    setSelectedOS(os);
    onFiltersChange({
      search: searchQuery,
      category: selectedCategory,
      os,
      sortBy,
    });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onFiltersChange({
      search: searchQuery,
      category: selectedCategory,
      os: selectedOS,
      sortBy: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedOS} onValueChange={handleOSChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="OS" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All OS</SelectItem>
              <SelectItem value="Windows">Windows</SelectItem>
              <SelectItem value="macOS">macOS</SelectItem>
              <SelectItem value="Linux">Linux</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="downloads">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
