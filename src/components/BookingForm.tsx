import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const BookingForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Booking request sent successfully! I'll get back to you soon.");
  };

  return (
    <section id="booking" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          Book a Consultation
        </h2>
        <Card className="max-w-lg mx-auto bg-secondary/50 border-none">
          <CardHeader>
            <CardTitle>Schedule a Chat Session</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input placeholder="Your Name" required />
                <Input type="email" placeholder="Your Email" required />
                <Textarea 
                  placeholder="What would you like to discuss?"
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
              <Button type="submit" className="w-full">
                Request Booking
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};