import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export const BookingForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="booking" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          Book a Consultation
        </h2>
        <Card className="max-w-[500px] mx-auto glass-card">
          <CardHeader>
            <CardTitle>Schedule a Chat Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/kevinjojo483?hide_landing_page_details=1&hide_gdpr_banner=1" 
              style={{ minWidth: "320px", height: "500px" }}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};