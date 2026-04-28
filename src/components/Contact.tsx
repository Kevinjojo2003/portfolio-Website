import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Phone, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { SectionWrapper } from "./SectionWrapper";

const EMAIL = "kevinjojo003@gmail.com";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(1000),
});

type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success(t("contact.copied"));
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error(t("contact.copyFailed"));
    }
  };

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
      await emailjs.send(
        "service_2aqxkzp",
        "template_yvxbwxp",
        {
          from_name: result.data.name,
          from_email: result.data.email,
          message: result.data.message,
          to_email: EMAIL,
        },
        "Ql_2AQQQhNvGxFXYz"
      );
      toast.success(t("contact.success"));
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error(t("contact.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <SectionWrapper
      id="contact"
      eyebrow={t("contact.eyebrow")}
      title={t("contact.title")}
      description={t("contact.description")}
    >
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center">
          <button
            onClick={copyEmail}
            className="mono text-lg md:text-xl text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
            aria-label="Copy email address"
          >
            {EMAIL}
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
            )}
          </button>
        </div>

        <div className="flex justify-center gap-3">
          <a
            href="https://github.com/Kevinjojo2003"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full surface-card-hover flex items-center justify-center text-muted-foreground hover:text-primary"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/kevinjojo/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full surface-card-hover flex items-center justify-center text-muted-foreground hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="tel:+919447406989"
            className="w-10 h-10 rounded-full surface-card-hover flex items-center justify-center text-muted-foreground hover:text-primary"
            aria-label="Phone"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="surface-card p-6 space-y-4">
          <div>
            <Input
              placeholder={t("contact.name")}
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-background/50 border-white/10 focus-visible:border-primary"
              required
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>
          <div>
            <Input
              placeholder={t("contact.email")}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-background/50 border-white/10 focus-visible:border-primary"
              required
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <Textarea
              placeholder={t("contact.message")}
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="bg-background/50 border-white/10 focus-visible:border-primary min-h-[140px]"
              required
            />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? t("contact.sending") : t("contact.send")}
          </Button>
        </form>
      </div>
    </SectionWrapper>
  );
};
