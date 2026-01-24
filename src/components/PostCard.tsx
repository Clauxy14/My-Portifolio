import React from 'react';
import './PostCard.css';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  readTime: number;
  date: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="post-card">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
        <div className="post-overlay">
          <span className="read-time">{post.readTime} min read</span>
        </div>
      </div>
      <div className="post-content">
        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-meta">
          <span className="post-date">{post.date}</span>
          <a href="#" className="read-more">Read More →</a>
        </div>
      </div>
    </article>
  );
};

export default PostCard;