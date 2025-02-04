import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import { useEffect } from "react";
import "./i18n/config";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Add mobile-specific meta tags
    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no'
      );
    }

    // Add mobile web app capable meta tags
    const metaApple = document.createElement('meta');
    metaApple.setAttribute('name', 'apple-mobile-web-app-capable');
    metaApple.setAttribute('content', 'yes');
    document.head.appendChild(metaApple);

    // Add status bar style meta tag
    const metaStatus = document.createElement('meta');
    metaStatus.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
    metaStatus.setAttribute('content', 'black-translucent');
    document.head.appendChild(metaStatus);

    return () => {
      document.head.removeChild(metaApple);
      document.head.removeChild(metaStatus);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="capacitor-app">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;