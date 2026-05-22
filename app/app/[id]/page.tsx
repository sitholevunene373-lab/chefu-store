'use client';

import { Apple, ArrowLeft, CheckCircle, Download, Globe, Monitor, Star } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { toast } from 'sonner';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel';
import { Progress } from '../../components/ui/progress';
import { Separator } from '../../components/ui/separator';
import { apps } from '../../data/mockData';
import { OSType } from '@/app/types';

interface AppDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const OSIcon = ({ os }: { os: OSType }) => {
  switch (os) {
    case 'Windows':
      return <Monitor className="w-4 h-4" />;
    case 'macOS':
      return <Apple className="w-4 h-4" />;
    case 'Linux':
      return <Globe className="w-4 h-4" />;
  }
};

export default function AppDetailPage({ params }: AppDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const app = apps.find((a) => String(a.id) === id);

  if (!app) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="mb-2">App not found</h2>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDownloads = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const handleInstall = () => {
    toast.success(`Installing ${app.name}...`, {
      description: 'The download will begin shortly.',
    });
  };

  const reviews = [
    { rating: 5, percentage: 75 },
    { rating: 4, percentage: 15 },
    { rating: 3, percentage: 6 },
    { rating: 2, percentage: 2 },
    { rating: 1, percentage: 2 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/browse">
          <Button variant="ghost" className="mb-6 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                <span className="text-5xl">{app.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="mb-1">{app.name}</h1>
                    <p className="text-muted-foreground">{app.developer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{app.rating}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>{formatDownloads(app.downloads)} downloads</span>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Screenshots</CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel opts={{ align: 'start' }}>
                  <CarouselContent>
                    {app.screenshots.map((screenshot, index) => (
                      <CarouselItem key={index} className="md:basis-1/2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                          <img
                            src={screenshot}
                            alt={`${app.name} screenshot ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{app.longDescription}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ratings & Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-1">{app.rating}</div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(app.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Based on user reviews</p>
                  </div>

                  <div className="flex-1 space-y-2">
                    {reviews.map((review) => (
                      <div key={review.rating} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 min-w-20">
                          <span className="text-sm">{review.rating}</span>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <Progress value={review.percentage} className="flex-1" />
                        <span className="text-sm text-muted-foreground min-w-12">
                          {review.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Version</p>
                  <p className="font-medium">{app.version}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Size</p>
                  <p className="font-medium">{app.size}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Supported Platforms</p>
                  <div className="space-y-2">
                    {app.supportedOS.map((os) => (
                      <div key={os} className="flex items-center gap-2">
                        <OSIcon os={os} />
                        <span className="text-sm">{os}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <Badge variant="secondary" className="capitalize">
                    {app.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleInstall}
              disabled={app.installed}
            >
              <Download className="w-4 h-4 mr-2" />
              {app.installed ? 'Installed' : 'Install Now'} 
            </Button>

            {app.installed && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary">
                <CheckCircle className="w-4 h-4" />
                Already installed
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
