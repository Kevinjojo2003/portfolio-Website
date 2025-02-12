
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const OpeningAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [dataStream, setDataStream] = useState<string[][]>([]);

  useEffect(() => {
    // Calculate number of rows and columns to fill screen
    const rows = Math.ceil(window.innerHeight / 24); // Assuming each row is ~24px
    const cols = Math.ceil(window.innerWidth / 100); // Assuming each binary number takes ~100px

    // Initialize grid
    setDataStream(Array(rows).fill(0).map(() => 
      Array(cols).fill('00000000')
    ));

    const interval = setInterval(() => {
      setDataStream(prev => {
        return prev.map(row => 
          row.map(() => Math.random().toString(2).substr(2, 8))
        );
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
      <div className="absolute inset-0 overflow-hidden">
        <div className="grid auto-rows-min gap-1 p-1 w-full h-full">
          {dataStream.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-between w-full">
              {row.map((binary, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="text-primary/60 font-mono text-sm animate-fade-up"
                  style={{
                    animationDelay: `${(rowIndex * 50 + colIndex * 20)}ms`,
                    opacity: 0
                  }}
                >
                  {binary}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
