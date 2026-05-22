import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor, Download, Bell, Shield, HardDrive } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">
            Manage your CheFu Store preferences
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how CheFu Store looks on your device
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-3 block">Theme</Label>
                  <RadioGroup value={theme} onValueChange={setTheme}>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <RadioGroupItem value="light" id="light" className="peer sr-only" />
                        <Label
                          htmlFor="light"
                          className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                        >
                          <Sun className="mb-3 h-6 w-6" />
                          Light
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                        <Label
                          htmlFor="dark"
                          className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                        >
                          <Moon className="mb-3 h-6 w-6" />
                          Dark
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="system" id="system" className="peer sr-only" />
                        <Label
                          htmlFor="system"
                          className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
                        >
                          <Monitor className="mb-3 h-6 w-6" />
                          System
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Downloads</CardTitle>
                <CardDescription>
                  Configure how apps are downloaded and installed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Download Location</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose where to save downloaded apps
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => toast.info('Feature coming soon')}>
                    <HardDrive className="w-4 h-4 mr-2" />
                    Change
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-install">Auto-install updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically download and install app updates
                    </p>
                  </div>
                  <Switch id="auto-install" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="parallel-downloads">Parallel downloads</Label>
                    <p className="text-sm text-muted-foreground">
                      Download multiple apps simultaneously
                    </p>
                  </div>
                  <Switch id="parallel-downloads" defaultChecked />
                </div>
                <Separator />
                <div>
                  <Label className="mb-2 block">Download speed limit</Label>
                  <Select defaultValue="unlimited">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                      <SelectItem value="10mb">10 MB/s</SelectItem>
                      <SelectItem value="5mb">5 MB/s</SelectItem>
                      <SelectItem value="1mb">1 MB/s</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Manage notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="update-notifications">Update notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when updates are available
                    </p>
                  </div>
                  <Switch id="update-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-apps">New app recommendations</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive suggestions for new apps
                    </p>
                  </div>
                  <Switch id="new-apps" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="download-complete">Download complete</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when downloads finish
                    </p>
                  </div>
                  <Switch id="download-complete" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>
                  Control your data and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">Usage analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve CheFu Store by sharing usage data
                    </p>
                  </div>
                  <Switch id="analytics" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="verify-apps">Verify app signatures</Label>
                    <p className="text-sm text-muted-foreground">
                      Only install verified and signed applications
                    </p>
                  </div>
                  <Switch id="verify-apps" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">CheFu Store</p>
                    <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => toast.info('Feature coming soon')}>
                    Check for Updates
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => toast.info('Feature coming soon')}>
                    Release Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
