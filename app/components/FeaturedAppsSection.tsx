'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { AppCard } from './AppCard.client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import type { App } from '../data/mockData';

interface FeaturedAppsProps {
  apps: App[];
}

export function FeaturedAppsSection({ apps }: FeaturedAppsProps) {
  return (
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
        <Link href="/browse">
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
      <Carousel opts={{ align: 'start', loop: true }}>
        <CarouselContent>
          {apps.map((app) => (
            <CarouselItem key={app.id} className="md:basis-1/2 lg:basis-1/3">
              <AppCard app={app} showInstallButton />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </motion.div>
  );
}
