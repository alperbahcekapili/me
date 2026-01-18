import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BlogPost.css';

const blogPosts = {
    'software-career-path': {
        title: 'Software Career Path',
        date: 'Coming Soon',
        author: 'Alper Bahçekapılı',
        content: `
            <h2>Building a Successful Software Career</h2>
            <p>This blog post covers strategies for advancing your software engineering career, from junior developer to senior positions.</p>
            <p>Topics covered:</p>
            <ul>
                <li>Early career foundations</li>
                <li>Skill development roadmap</li>
                <li>Networking and visibility</li>
                <li>Switching roles and companies</li>
                <li>Leadership transitions</li>
            </ul>
            <p><em>Content coming soon...</em></p>
        `
    },
    'deep-learning': {
        title: 'Deep Learning Fundamentals',
        date: 'Coming Soon',
        author: 'Alper Bahçekapılı',
        content: `
            <h2>Understanding Deep Learning</h2>
            <p>A comprehensive guide to deep learning concepts, architectures, and practical applications.</p>
            <p>Topics covered:</p>
            <ul>
                <li>Neural network basics</li>
                <li>Convolutional Neural Networks (CNNs)</li>
                <li>Recurrent Neural Networks (RNNs)</li>
                <li>Transformers and Attention mechanisms</li>
                <li>Training tips and best practices</li>
            </ul>
            <p><em>Content coming soon...</em></p>
        `
    },
    'clean-code': {
        title: 'Writing Clean Code',
        date: 'Coming Soon',
        author: 'Alper Bahçekapılı',
        content: `
            <h2>Principles of Clean Code</h2>
            <p>Learn how to write maintainable, readable, and efficient code that scales.</p>
            <p>Topics covered:</p>
            <ul>
                <li>Naming conventions</li>
                <li>Functions and methods</li>
                <li>Error handling</li>
                <li>Comments and documentation</li>
                <li>Code formatting and style</li>
            </ul>
            <p><em>Content coming soon...</em></p>
        `
    },
    'atomic-habits': {
        title: 'Atomic Habits for Developers',
        date: 'Coming Soon',
        author: 'Alper Bahçekapılı',
        content: `
            <h2>Building Better Programming Habits</h2>
            <p>Applying atomic habits principles to improve your development skills and productivity.</p>
            <p>Topics covered:</p>
            <ul>
                <li>Habit formation loops</li>
                <li>Consistent daily practice</li>
                <li>Code review discipline</li>
                <li>Continuous learning</li>
                <li>Measuring progress</li>
            </ul>
            <p><em>Content coming soon...</em></p>
        `
    }
};

const BlogPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const post = blogPosts[postId];

    if (!post) {
        return (
            <div className="blog-container">
                <button className="back-btn" onClick={() => navigate('/')}>
                    ← Back to Portfolio
                </button>
                <div className="blog-content">
                    <h1>Blog Post Not Found</h1>
                    <p>The blog post you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="blog-container">
            <button className="back-btn" onClick={() => navigate('/')}>
                ← Back to Portfolio
            </button>

            <motion.article
                className="blog-article"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <header className="blog-header">
                    <h1 className="blog-title">{post.title}</h1>
                    <div className="blog-meta">
                        <span className="blog-author">{post.author}</span>
                        <span className="blog-date">{post.date}</span>
                    </div>
                </header>

                <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.article>
        </div>
    );
};

export default BlogPost;
