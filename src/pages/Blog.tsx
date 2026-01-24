import React, { useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import "./Blog.css";

interface Post {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  category: string;
  readTime: number;
}

const posts: Post[] = [
  {
    id: 1,
    title: "Getting Started with React",
    date: "2026-01-20",
    excerpt: "Learn the basics of React and how to build your first component.",
    content: "React is a popular JavaScript library for building user interfaces...",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    tags: ["React", "JavaScript", "Frontend"],
    category: "React",
    readTime: 5,
  },
  {
    id: 2,
    title: "Modern CSS Techniques",
    date: "2026-01-15",
    excerpt: "Explore advanced CSS features like Grid, Flexbox, and animations.",
    content: "CSS has evolved significantly with new layout methods...",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    tags: ["CSS", "Web Design", "Frontend"],
    category: "CSS",
    readTime: 7,
  },
  {
    id: 3,
    title: "Building Responsive Websites",
    date: "2026-01-10",
    excerpt: "Tips and tricks for creating mobile-friendly web applications.",
    content: "Responsive design is crucial in today's multi-device world...",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    tags: ["Responsive", "Mobile", "Web Development"],
    category: "Web Development",
    readTime: 6,
  },
  {
    id: 4,
    title: "TypeScript Best Practices",
    date: "2026-01-05",
    excerpt: "Master TypeScript with these essential tips and patterns.",
    content: "TypeScript adds static typing to JavaScript...",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    category: "TypeScript",
    readTime: 8,
  },
  {
    id: 5,
    title: "Advanced React Hooks",
    date: "2025-12-28",
    excerpt: "Deep dive into custom hooks and advanced state management.",
    content: "React hooks have revolutionized how we manage state...",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
    tags: ["React", "Hooks", "State Management"],
    category: "React",
    readTime: 10,
  },
  {
    id: 6,
    title: "CSS Grid vs Flexbox",
    date: "2025-12-20",
    excerpt: "When to use Grid and when to use Flexbox for layouts.",
    content: "Both CSS Grid and Flexbox are powerful layout tools...",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    tags: ["CSS", "Grid", "Flexbox"],
    category: "CSS",
    readTime: 6,
  },
  {
    id: 7,
    title: "JavaScript ES6+ Features",
    date: "2025-12-15",
    excerpt: "Essential modern JavaScript features every developer should know.",
    content: "ES6 brought many new features to JavaScript...",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
    tags: ["JavaScript", "ES6", "Modern JS"],
    category: "JavaScript",
    readTime: 9,
  },
  {
    id: 8,
    title: "Performance Optimization in React",
    date: "2025-12-10",
    excerpt: "Techniques to make your React apps faster and more efficient.",
    content: "Performance is crucial for user experience...",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    tags: ["React", "Performance", "Optimization"],
    category: "React",
    readTime: 11,
  },
  {
    id: 9,
    title: "Web Accessibility Fundamentals",
    date: "2025-12-05",
    excerpt: "Building inclusive web experiences for all users.",
    content: "Web accessibility ensures that websites are usable by everyone...",
    image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400",
    tags: ["Accessibility", "Web Standards", "UX"],
    category: "Web Development",
    readTime: 7,
  },
  {
    id: 10,
    title: "Node.js Backend Development",
    date: "2025-11-30",
    excerpt: "Introduction to server-side JavaScript with Node.js.",
    content: "Node.js allows you to use JavaScript on the server...",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
    tags: ["Node.js", "Backend", "JavaScript"],
    category: "Backend",
    readTime: 8,
  },
  {
    id: 11,
    title: "Git Workflow Best Practices",
    date: "2025-11-25",
    excerpt: "Master Git with these essential workflow patterns.",
    content: "Version control is essential for modern development...",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400",
    tags: ["Git", "Version Control", "Workflow"],
    category: "Tools",
    readTime: 6,
  },
  {
    id: 12,
    title: "Testing React Applications",
    date: "2025-11-20",
    excerpt: "Comprehensive guide to testing React components and apps.",
    content: "Testing ensures your code works as expected...",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    tags: ["React", "Testing", "Jest"],
    category: "React",
    readTime: 12,
  },
];

const POSTS_PER_PAGE = 6;

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(posts.map(post => post.category))];
    return cats;
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main className="blog">
        <div className="container">
          <div className="blog-header">
            <h1>My Blog</h1>
            <p>Thoughts on web development, design, and technology</p>
          </div>

          <div className="blog-controls">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-stats">
            <p>{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found</p>
          </div>

          <div className="blog-posts">
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="page-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
