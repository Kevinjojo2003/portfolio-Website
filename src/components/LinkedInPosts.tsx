
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";

export const LinkedInPosts = () => {
  const { t } = useTranslation();
  
  const posts = [
    "urn:li:ugcPost:7306983829930393600",
    "urn:li:share:7202518006206193664",
    "urn:li:share:7180596647016501250",
    "urn:li:ugcPost:7176867683731218432",
    "urn:li:share:7163570252876800000",
    "urn:li:share:6965137549036003329"
  ];

  return (
    <section id="linkedin-posts" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          {t('linkedin.title')}
        </h2>
        
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {posts.map((postId, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/3 lg:basis-1/3">
                <Card className="glass-card p-4 flex justify-center h-[450px] overflow-hidden">
                  <iframe 
                    src={`https://www.linkedin.com/embed/feed/update/${postId}`}
                    height="100%" 
                    width="100%" 
                    frameBorder="0" 
                    allowFullScreen 
                    title={`LinkedIn Post ${index + 1}`}
                    className="max-w-full"
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="mx-2" />
            <CarouselNext className="mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
