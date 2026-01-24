import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Blog.css";

const posts = [
  {
    id: 1,
    title: "Getting Started with React",
    date: "2026-01-20",
    excerpt: "Learn the basics of React and how to build your first component.",
    content:
      "React is a popular JavaScript library for building user interfaces...",
  },
  {
    id: 2,
    title: "Modern CSS Techniques",
    date: "2026-01-15",
    excerpt:
      "Explore advanced CSS features like Grid, Flexbox, and animations.",
    content: "CSS has evolved significantly with new layout methods...",
  },
  {
    id: 3,
    title: "Building Responsive Websites",
    date: "2026-01-10",
    excerpt: "Tips and tricks for creating mobile-friendly web applications.",
    content: "Responsive design is crucial in today's multi-device world...",
  },
];

const Blog: React.FC = () => {
  return (
    <>
      <Header />
      <main className="blog">
        <div className="container">
          <h1>My Blog</h1>
          <div className="blog-posts">
            {posts.map((post) => (
              <article key={post.id} className="blog-post">
                <h2>{post.title}</h2>
                <p className="post-date">{post.date}</p>
                <p className="post-excerpt">{post.excerpt}</p>
                <a href="#" className="read-more">
                  Read More
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
