import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/components/ThemeProvider";
import { Download, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const BookingForm = () => {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    document.documentElement.style.fontSize = `${value[0]}px`;
  };

  return (
    <section id="booking" className="py-16 px-4" aria-label="Booking and Services Section">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Book a Consultation
          </h2>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              aria-label="Download Resume"
            >
              <a 
                href="https://drive.google.com/file/d/1FbcJTU8HlAYkABnixfUynwya2euTFxAM/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <span className="text-sm">Font Size:</span>
          <Slider
            defaultValue={[16]}
            max={24}
            min={12}
            step={1}
            onValueChange={handleFontSizeChange}
            className="w-48"
            aria-label="Adjust font size"
          />
          <span className="text-sm">{fontSize}px</span>
        </div>

        <Card className="glass-card max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Schedule a Chat Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/kevinjojo483?hide_landing_page_details=1&hide_gdpr_banner=1" 
              style={{ minWidth: "320px", height: "400px" }}
              role="complementary"
              aria-label="Calendly scheduling widget"
            />
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">My Services</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="business">
                  <AccordionTrigger className="text-lg font-semibold">
                    Business Services
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 text-left">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">1. Startup Support and Mentorship</h4>
                      <p className="text-muted-foreground">Empowering entrepreneurs to kickstart and scale their ventures:</p>
                      <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                        <li>Conduct workshops on entrepreneurship fundamentals</li>
                        <li>Assist in developing comprehensive business plans and investor-ready pitches</li>
                        <li>Guide startups through incubation, funding opportunities, and ecosystem integration</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">2. Corporate Relations and Networking</h4>
                      <p className="text-muted-foreground">Helping businesses forge meaningful partnerships and expand networks:</p>
                      <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                        <li>Develop and implement strategies to secure and maintain strategic partnerships</li>
                        <li>Create effective sponsorship strategies, sponsor decks, and identify potential collaborators</li>
                        <li>Train teams to manage stakeholder relationships for long-term success</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">3. Human Resources and Leadership Development</h4>
                      <p className="text-muted-foreground">Building strong teams and fostering leadership within organizations:</p>
                      <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                        <li>Provide recruitment strategies and team-building sessions for optimized performance</li>
                        <li>Design HR frameworks to improve employee satisfaction and retention</li>
                        <li>Conduct leadership training and personal development programs tailored to team leaders</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">4. Event Management and Execution</h4>
                      <p className="text-muted-foreground">Delivering seamless, impactful events for startups and organizations:</p>
                      <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                        <li>Organize startup events, hackathons, pitch competitions, and conferences</li>
                        <li>Plan and execute networking meetups and panel discussions</li>
                        <li>Oversee event logistics, sponsorship integrations, and audience engagement</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technical">
                  <AccordionTrigger className="text-lg font-semibold">
                    Technical Services
                  </AccordionTrigger>
                  <AccordionContent className="space-y-6 text-left">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">1. Machine Learning and AI Solutions</h4>
                      <p className="text-muted-foreground">Providing intelligent systems tailored to your business needs:</p>
                      <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                        <li>Design, develop, and deploy machine learning models for predictive analytics</li>
                        <li>Implement natural language processing (NLP) solutions for sentiment analysis and chatbot development</li>
                        <li>Build custom AI-powered solutions such as recommendation systems, fraud detection, and automation tools</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">2. Data Analysis and Visualization</h4>
                      <p className="text-muted-foreground">Turning raw data into actionable insights:</p>
                      <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                        <li>Perform statistical analysis and data mining for decision-making</li>
                        <li>Create interactive dashboards using Tableau, Power BI, or Streamlit</li>
                        <li>Conduct advanced sentiment analysis and financial trend forecasting</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">3. Software Development</h4>
                      <p className="text-muted-foreground">Building efficient and user-friendly software applications:</p>
                      <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                        <li>Develop Python-based tools for data processing, automation, and analysis</li>
                        <li>Create web applications using HTML, CSS, JavaScript, and frameworks like Streamlit or Flask</li>
                        <li>Optimize existing software for performance and scalability</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">4. Computer Vision Applications</h4>
                      <p className="text-muted-foreground">Enhancing image and video-based systems for automation:</p>
                      <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                        <li>Develop object detection and tracking solutions using OpenCV and TensorFlow</li>
                        <li>Implement deep learning models for image classification, segmentation, and recognition</li>
                        <li>Design automated surveillance and traffic monitoring systems</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};