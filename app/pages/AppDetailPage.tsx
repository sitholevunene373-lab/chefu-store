import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Download, Star, Monitor, Apple, Globe, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Progress } from '../components/ui/progress';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { apps, type OSType } from '../data/mockData';
import { motion } from 'motion/react';
import { toast } from 'sonner';

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

export function AppDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = apps.find((a) => a.id === id);

  if (!app) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2">App not found</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
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
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

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
                      <p className="text-sm text-muted-foreground">
                        {formatDownloads(app.downloads)} ratings
                      </p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {reviews.map((review) => (
                        <div key={review.rating} className="flex items-center gap-3">
                          <span className="text-sm w-3">{review.rating}</span>
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <Progress value={review.percentage} className="flex-1" />
                          <span className="text-sm text-muted-foreground w-10 text-right">
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
                <CardContent className="pt-6">
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 mb-4"
                    onClick={handleInstall}
                  >
                    {app.installed ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Installed
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Install
                      </>
                    )}
                  </Button>
                  {app.hasUpdate && (
                    <Badge variant="secondary" className="w-full justify-center mb-4 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                      Update Available
                    </Badge>
                  )}
                </CardContent>
              </Card>

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
                    <div className="flex flex-wrap gap-2">
                      {app.supportedOS.map((os) => (
                        <Badge
                          key={os}
                          variant="secondary"
                          className="flex items-center gap-1.5"
                        >
                          <OSIcon os={os} />
                          {os}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Category</p>
                    <Badge variant="outline" className="capitalize">
                      {app.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
