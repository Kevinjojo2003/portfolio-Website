
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_2aqxkzp",
        "template_yvxbwxp",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "kevinjojo483@gmail.com"
        },
        "Ql_2AQQQhNvGxFXYz"
      );

      toast.success(t('contact.success'));
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(t('contact.error'));
      console.error("Email error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 px-6 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          {t('contact.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-secondary/50 border-none hover:bg-secondary/60 transition-colors">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">{t('contact.info')}</h3>
              <div className="space-y-4">
                <a
                  href="mailto:kevinjojo003@gmail.com"
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  kevinjojo003@gmail.com
                </a>
                <a
                  href="tel:+919447406989"
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  +91-9447406989
                </a>
                <a
                  href="https://github.com/Kevinjojo2003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/kevinjojo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  Cochin, Kerala
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/50 border-none hover:bg-secondary/60 transition-colors">
            <CardContent className="p-6 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  placeholder={t('contact.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input 
                  placeholder={t('contact.email')}
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Textarea 
                  placeholder={t('contact.message')}
                  className="min-h-[120px]" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contact.sending') : t('contact.send')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
