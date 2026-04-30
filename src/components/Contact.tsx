import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { motion } from "framer-motion";

const EMAIL = "kevinjojo003@gmail.com";
const PHONE = "+91-9447406989";

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
        "Ql_2AQQQhNvGxFXYz",
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

  const details = [
    { icon: Mail, label: t("contact.email.label"), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: t("contact.phone.label"), value: PHONE, href: `tel:${PHONE.replace(/-/g, "")}` },
    { icon: Github, label: t("contact.github.label"), value: "Kevinjojo2003", href: "https://github.com/Kevinjojo2003" },
    { icon: Linkedin, label: t("contact.linkedin.label"), value: "kevinjojo", href: "https://www.linkedin.com/in/kevinjojo/" },
    { icon: MapPin, label: t("contact.location.label"), value: t("contact.location.value"), href: null },
  ];

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <p className="eyebrow mb-3">{t("contact.eyebrow")}</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight heading-gradient">
            {t("contact.title")}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">{t("contact.description")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="surface-card p-6 md:p-7"
          >
            <ul className="divide-y divide-white/[0.06]">
              {details.map((d) => {
                const Icon = d.icon;
                const content = (
                  <div className="flex items-center gap-4 py-4 group">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">{d.label}</div>
                      <div className="text-sm text-foreground truncate group-hover:text-primary transition-colors">{d.value}</div>
                    </div>
                  </div>
                );
                return (
                  <li key={d.label}>
                    {d.href ? (
                      <a href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="surface-card p-6 md:p-7 space-y-4"
          >
            <div>
              <Input
                placeholder={t("contact.name")}
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-background/50 border-white/[0.08] focus-visible:border-primary focus-visible:ring-primary/30"
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
                className="bg-background/50 border-white/[0.08] focus-visible:border-primary focus-visible:ring-primary/30"
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
                className="bg-background/50 border-white/[0.08] focus-visible:border-primary focus-visible:ring-primary/30 min-h-[160px]"
                required
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-[1.01]"
            >
              {isSubmitting ? t("contact.sending") : t("contact.send")}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
