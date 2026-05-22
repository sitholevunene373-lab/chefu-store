'use client';

import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { AppNavigation } from './components/AppNavigation';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { AppDetailPage } from './pages/AppDetailPage';
import { LibraryPage } from './pages/LibraryPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <BrowserRouter>
        <div className="size-full flex bg-background text-foreground">
          <AppNavigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/app/:id" element={<AppDetailPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}