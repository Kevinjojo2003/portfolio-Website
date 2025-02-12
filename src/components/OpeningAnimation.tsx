
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const OpeningAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [dataStream, setDataStream] = useState<string[]>([]);

  // Generate random binary stream
  useEffect(() => {
    const interval = setInterval(() => {
      setDataStream(prev => {
        const newStream = [...prev];
        if (newStream.length > 100) newStream.shift();
        return [...newStream, Math.random().toString(2).substr(2, 8)];
      });
    }, 50);

    // Run for 3 seconds then complete
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onComplete();
      toast.success("Welcome to my portfolio!");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="grid grid-cols-12 gap-4 p-4">
          {dataStream.map((binary, index) => (
            <div
              key={index}
              className="text-primary/60 font-mono text-sm animate-fade-up"
              style={{
                animationDelay: `${index * 50}ms`,
                opacity: 0
              }}
            >
              {binary}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
