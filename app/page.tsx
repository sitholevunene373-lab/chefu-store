import type { Metadata } from 'next';
import { HomeSearchForm } from './components/HomeSearchForm';
import { FeaturedAppsSection } from './components/FeaturedAppsSection';
import { TrendingAppsSection } from './components/TrendingAppsSection';
import { CategoryGrid } from './components/CategoryGrid';
import { getFeaturedApps, getTrendingApps } from './data/mockData';

export const metadata: Metadata = {
  title: 'CheFu Store - Discover Amazing Apps',
  description: 'Browse thousands of applications for Windows, macOS, and Linux. Find the perfect tools for productivity, development, gaming, and more.',
  openGraph: {
    title: 'CheFu Store - Discover Amazing Apps',
    description: 'Browse thousands of applications for Windows, macOS, and Linux.',
    url: 'https://chefu.store',
    type: 'website',
  },
};

export default function HomePage() {
  const featuredApps = getFeaturedApps();
  const trendingApps = getTrendingApps();

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <HomeSearchForm />

      <FeaturedAppsSection apps={featuredApps} />

      <TrendingAppsSection apps={trendingApps} />

      <div>
        <h2 className="mb-4">Browse by Category</h2>
        <CategoryGrid />
      </div>
    </div>
  );
}