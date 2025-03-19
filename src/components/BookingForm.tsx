
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Calendar, Clock, Briefcase, Code } from "lucide-react";
import { useTranslation } from "react-i18next";

export const BookingForm = () => {
  const { t } = useTranslation();

  const businessServices = [
    t('booking.business.consulting'),
    t('booking.business.strategy'),
    t('booking.business.automation'),
    t('booking.business.analytics')
  ];

  const technicalServices = [
    t('booking.technical.ai'),
    t('booking.technical.ml'),
    t('booking.technical.data'),
    t('booking.technical.development')
  ];

  return (
    <section id="booking" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text text-center">
          {t('booking.title')}
        </h2>
        <p className="text-lg text-center text-muted-foreground mb-12">
          {t('booking.subtitle')}
        </p>
        
        <Card className="glass-card">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-8">{t('booking.services')}</h3>
            
            <Tabs defaultValue="business" className="mb-12">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
                <TabsTrigger value="business">
                  <Briefcase className="mr-2 h-4 w-4" />
                  {t('booking.business')}
                </TabsTrigger>
                <TabsTrigger value="technical">
                  <Code className="mr-2 h-4 w-4" />
                  {t('booking.technical')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="business" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {businessServices.map((service, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p>{service}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="technical" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {technicalServices.map((service, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p>{service}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">{t('booking.availability')}</h4>
                </div>
                <p className="text-muted-foreground">{t('booking.availabilityDesc')}</p>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">{t('booking.duration')}</h4>
                </div>
                <p className="text-muted-foreground">{t('booking.durationDesc')}</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {t('booking.bookNow')}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
