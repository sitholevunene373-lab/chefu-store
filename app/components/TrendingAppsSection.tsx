'use client';

import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import { AppCard } from './AppCard.client';
import type { App } from '../data/mockData';

interface TrendingAppsProps {
  apps: App[];
}

export function TrendingAppsSection({ apps }: TrendingAppsProps) {
  return (
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
        {apps.slice(0, 8).map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </motion.div>
  );
}
