import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const blogs = [
  {
    title: "Memories Have Life",
    url: "https://writingsbykevin.blogspot.com/2021/10/memories-have-life_0402192773.html",
    excerpt: "Explore the lasting impact of memories in our lives",
    date: "October 2021"
  },
  {
    title: "Trust to Friends",
    url: "https://writingsbykevin.blogspot.com/2022/04/trust%20to%20friends.html",
    excerpt: "A reflection on friendship and trust",
    date: "April 2022"
  }
];

export const Blogs = () => {
  return (
    <section id="blogs" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text text-center">
          My Blog Posts
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