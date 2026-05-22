'use client';

import { motion } from 'motion/react';
import { Download, Star, Monitor, Apple, Globe } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { App, OSType } from '../data/mockData';

interface AppCardProps {
  app: App;
  onClick?: () => void;
  onInstall?: (appId: string) => void;
  showInstallButton?: boolean;
}

const OSIcon = ({ os }: { os: OSType }) => {
  switch (os) {
    case 'Windows':
      return <Monitor className="w-3 h-3" />;
    case 'macOS':
      return <Apple className="w-3 h-3" />;
    case 'Linux':
      return <Globe className="w-3 h-3" />;
  }
};

export function AppCard({ app, onClick, onInstall, showInstallButton = false }: AppCardProps) {
  const formatDownloads = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card
        className="h-full cursor-pointer overflow-hidden border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-200"
        onClick={onClick}
      >
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">{app.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{app.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{app.developer}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
            {app.description}
          </p>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>{app.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">•</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Download className="w-3.5 h-3.5" />
              <span>{formatDownloads(app.downloads)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {app.supportedOS.map((os) => (
                <div
                  key={os}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                >
                  <OSIcon os={os} />
                </div>
              ))}
            </div>
            {showInstallButton && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onInstall?.(app.id);
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Install
              </Button>
            )}
            {app.installed && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                Installed
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
