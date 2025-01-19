import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const LinkedInPosts = () => {
  return (
    <section id="linkedin-posts" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          Featured LinkedIn Posts
        </h2>
        
        <Carousel className="w-full max-w-[500px] mx-auto">
          <CarouselContent>
            <CarouselItem>
              <Card className="glass-card p-4 flex justify-center h-[500px]">
                <iframe 
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:7202518006206193664" 
                  height="100%" 
                  width="100%" 
                  frameBorder="0" 
                  allowFullScreen 
                  title="LinkedIn Post 1"
                  className="max-w-[500px]"
                />
              </Card>
            </CarouselItem>
            
            <CarouselItem>
              <Card className="glass-card p-4 flex justify-center h-[500px]">
                <iframe 
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:7180596647016501250" 
                  height="100%" 
                  width="100%" 
                  frameBorder="0" 
                  allowFullScreen 
                  title="LinkedIn Post 2"
                  className="max-w-[500px]"
                />
              </Card>
            </CarouselItem>
            
            <CarouselItem>
              <Card className="glass-card p-4 flex justify-center h-[500px]">
                <iframe 
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7176867683731218432" 
                  height="100%" 
                  width="100%" 
                  frameBorder="0" 
                  allowFullScreen 
                  title="LinkedIn Post 3"
                  className="max-w-[500px]"
                />
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card className="glass-card p-4 flex justify-center h-[500px]">
                <iframe 
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:7163570252876800000" 
                  height="100%" 
                  width="100%" 
                  frameBorder="0" 
                  allowFullScreen 
                  title="LinkedIn Post 4"
                  className="max-w-[500px]"
                />
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card className="glass-card p-4 flex justify-center h-[500px]">
                <iframe 
                  src="https://www.linkedin.com/embed/feed/update/urn:li:share:6965137549036003329" 
                  height="100%" 
                  width="100%" 
                  frameBorder="0" 
                  allowFullScreen 
                  title="LinkedIn Post 5"
                  className="max-w-[500px]"
                />
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};