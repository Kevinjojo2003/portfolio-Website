
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const IPTracker = () => {
  const [visitorIP, setVisitorIP] = useState<string>('');
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get visitor's IP
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setVisitorIP(data.ip);
        
        // Get existing visitors from localStorage
        const storedVisitors = localStorage.getItem('visitors');
        let visitors: string[] = [];
        
        if (storedVisitors) {
          visitors = JSON.parse(storedVisitors);
        }
        
        // Check if this IP is new
        if (!visitors.includes(data.ip)) {
          visitors.push(data.ip);
          localStorage.setItem('visitors', JSON.stringify(visitors));
        }
        
        // Update count
        setVisitorCount(visitors.length);
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();
  }, []);

  return (
    <Card className="glass-card w-fit">
      <CardContent className="p-2 text-right">
        <p className="text-xs text-muted-foreground/70">
          Visitors: {visitorCount} | IP: {visitorIP}
        </p>
      </CardContent>
    </Card>
  );
};
