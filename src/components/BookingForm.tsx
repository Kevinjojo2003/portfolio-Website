import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

export const BookingForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send email to admin
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: 'kevinjojo483@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          booking_date: date?.toLocaleDateString(),
        },
        'YOUR_PUBLIC_KEY'
      );

      // Send confirmation email to user
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_CONFIRMATION_TEMPLATE_ID',
        {
          to_email: formData.email,
          name: formData.name,
          message: formData.message,
          booking_date: date?.toLocaleDateString(),
        },
        'YOUR_PUBLIC_KEY'
      );

      toast.success("Booking request sent successfully! Check your email for confirmation.");
      setFormData({ name: '', email: '', message: '' });
      setDate(undefined);
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error("Failed to send booking request. Please try again.");
    }
  };

  return (
    <section id="booking" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          Book a Consultation
        </h2>
        <Card className="max-w-lg mx-auto glass-card hover:scale-105 transition-transform duration-300">
          <CardHeader>
            <CardTitle>Schedule a Chat Session</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder="Your Name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
                <Textarea 
                  placeholder="What would you like to discuss?"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-[100px]"
                  required
                />
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-muted-foreground">
                    Preferred Date
                  </label>
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? date.toDateString() : "Pick a date"}
                    </Button>
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full hover:scale-105 transition-transform">
                Request Booking
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};