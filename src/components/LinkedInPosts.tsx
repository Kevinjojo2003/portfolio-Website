import { Card } from "@/components/ui/card";

export const LinkedInPosts = () => {
  return (
    <section id="linkedin-posts" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          Featured LinkedIn Posts
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass-card p-4 flex justify-center">
            <iframe 
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7202518006206193664" 
              height="600" 
              width="100%" 
              frameBorder="0" 
              allowFullScreen 
              title="LinkedIn Post 1"
              className="max-w-[504px]"
            />
          </Card>
          
          <Card className="glass-card p-4 flex justify-center">
            <iframe 
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7180596647016501250" 
              height="600" 
              width="100%" 
              frameBorder="0" 
              allowFullScreen 
              title="LinkedIn Post 2"
              className="max-w-[504px]"
            />
          </Card>
          
          <Card className="glass-card p-4 flex justify-center">
            <iframe 
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7180596647016501250" 
              height="600" 
              width="100%" 
              frameBorder="0" 
              allowFullScreen 
              title="LinkedIn Post 3"
              className="max-w-[504px]"
            />
          </Card>
        </div>
      </div>
    </section>
  );
};