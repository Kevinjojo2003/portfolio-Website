import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const IPTracker = () => {
  const [visitorIP, setVisitorIP] = useState<string>('');
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setVisitorIP(data.ip);
        
        // Here you would typically send this IP to your backend
        // For now, we'll just store it in localStorage
        const visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
        if (!visitors.includes(data.ip)) {
          visitors.push(data.ip);
          localStorage.setItem('visitors', JSON.stringify(visitors));
          setVisitorCount(visitors.length);
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();
  }, []);

  return (
    <Card className="glass-card">
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">
          Unique Visitors: {visitorCount}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Your IP: {visitorIP}
        </p>
      </CardContent>
    </Card>
  );
};