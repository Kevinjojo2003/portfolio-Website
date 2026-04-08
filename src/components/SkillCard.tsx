import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SkillCardProps {
  category: string;
  icon: ReactNode;
  items: string[];
  index: number;
}

export const SkillCard = ({ category, icon, items, index }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card className="glass-card h-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {icon}
            <h3 className="text-xl font-semibold">{category}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((skill, skillIndex) => (
              <motion.span
                key={skill}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 + skillIndex * 0.03 }}
                whileHover={{ scale: 1.1 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
