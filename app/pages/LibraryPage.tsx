'use client';

import { useNavigate } from 'react-router';
import { Rocket, RefreshCw, Trash2, ArrowUpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { getInstalledApps } from '../data/mockData';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function LibraryPage() {
  const navigate = useNavigate();
  const installedApps = getInstalledApps();

  const handleLaunch = (appName: string) => {
    toast.success(`Launching ${appName}...`);
  };

  const handleUpdate = (appName: string) => {
    toast.success(`Updating ${appName}...`);
  };

  const handleUninstall = (appName: string) => {
    toast.success(`Uninstalling ${appName}...`);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="mb-2">My Library</h1>
              <p className="text-muted-foreground">
                {installedApps.length} {installedApps.length === 1 ? 'app' : 'apps'} installed
              </p>
            </div>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Check for Updates
            </Button>
          </div>

          {installedApps.length > 0 ? (
            <div className="space-y-3">
              {installedApps.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:bg-accent/30 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 cursor-pointer"
                          onClick={() => navigate(`/app/${app.id}`)}
                        >
                          <span className="text-3xl">{app.icon}</span>
                        </div>

                        <div
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => navigate(`/app/${app.id}`)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium truncate">{app.name}</h3>
                            {app.hasUpdate && (
                              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                                Update Available
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {app.developer} • Version {app.version}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{app.size}</span>
                            <Separator orientation="vertical" className="h-3" />
                            <span className="capitalize">{app.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="default"
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => handleLaunch(app.name)}
                          >
                            <Rocket className="w-4 h-4 mr-2" />
                            Launch
                          </Button>
                          {app.hasUpdate && (
                            <Button
                              variant="outline"
                              size="default"
                              onClick={() => handleUpdate(app.name)}
                            >
                              <ArrowUpCircle className="w-4 h-4 mr-2" />
                              Update
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUninstall(app.name)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2">No apps installed</h3>
                <p className="text-muted-foreground mb-4">
                  Browse the store to find apps to install
                </p>
                <Button onClick={() => navigate('/browse')}>Browse Apps</Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
