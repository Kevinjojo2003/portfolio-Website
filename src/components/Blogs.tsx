
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Blogs = () => {
  const { t } = useTranslation();

  const blogs = [
    {
      title: t('blogs.memories'),
      url: "https://writingsbykevin.blogspot.com/2021/10/memories-have-life_0402192773.html",
      excerpt: t('blogs.memoriesDesc'),
      date: "October 2021"
    },
    {
      title: t('blogs.trust'),
      url: "https://writingsbykevin.blogspot.com/2022/04/trust%20to%20friends.html",
      excerpt: t('blogs.trustDesc'),
      date: "April 2022"
    }
  ];

  return (
    <section id="blogs" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          {t('blogs.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <Card key={index} className="glass-card group hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <a 
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-muted-foreground mb-2">{blog.excerpt}</p>
                <p className="text-sm text-muted-foreground">{blog.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
