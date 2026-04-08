import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send("service_2aqxkzp", "template_yvxbwxp", {
        from_name: result.data.name,
        from_email: result.data.email,
        message: result.data.message,
        to_email: "kevinjojo483@gmail.com"
      }, "Ql_2AQQQhNvGxFXYz");

      toast.success(t('contact.success'));
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <SectionWrapper id="contact" title={t('contact.title')} className="bg-secondary/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-secondary/50 border-none hover:bg-secondary/60 transition-colors">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">{t('contact.info')}</h3>
              <div className="space-y-4">
                <a href="mailto:kevinjojo003@gmail.com" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="mr-2 h-4 w-4" /> kevinjojo003@gmail.com
                </a>
                <a href="tel:+919447406989" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="mr-2 h-4 w-4" /> +91-9447406989
                </a>
                <a href="https://github.com/Kevinjojo2003" target="_blank" rel="noopener noreferrer" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
                <a href="https://linkedin.com/in/kevinjojo" target="_blank" rel="noopener noreferrer" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" /> Cochin, Kerala
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-secondary/50 border-none hover:bg-secondary/60 transition-colors">
            <CardContent className="p-6 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input placeholder={t('contact.name')} name="name" value={formData.name} onChange={handleChange} required />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Input placeholder={t('contact.email')} type="email" name="email" value={formData.email} onChange={handleChange} required />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Textarea placeholder={t('contact.message')} className="min-h-[120px]" name="message" value={formData.message} onChange={handleChange} required />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t('contact.sending') : t('contact.send')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
