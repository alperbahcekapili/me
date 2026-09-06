import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import profileImg from '../assets/profile_casual2.jpeg';
import './Home.css';

const Home = () => {
    return (
        <section className="hero-container">
            <div className="hero-content">
                <motion.div
                    className="profile-container"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                >
                    <div className="profile-wrapper">
                        <img src={profileImg} alt="Alper Bahçekapılı" className="profile-img" />
                        <div className="blob-bg"></div>
                    </div>
                </motion.div>

                <motion.div
                    className="text-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    <h1 className="name">Hi, I'm Alper! 👋</h1>
                    <h2 className="title">Building cool AI & Software stuff</h2>

                    <p className="summary">
                        I'm a Master's student at METU CENG who loves building AI products.
                        I work on NLP, Computer Vision, and Deep Learning, but I promise I speak human languages too!
                        Currently focused on Generative AI and few-shot learning in medical image analysis. If you feel like it, say hi from LinkedIn!
                    </p>

                    <div className="social-links">
                        <a href="mailto:alperbah.13@gmail.com" className="social-pill email-pill">
                            <span className="pill-icon">✉️</span> Email
                        </a>
                        <a href="https://www.linkedin.com/in/alper-bahcekapili/" target="_blank" rel="noreferrer" className="social-pill linkedin-pill">
                            <span className="pill-icon">💼</span> LinkedIn
                        </a>
                        <a href="https://github.com/alperbahcekapili" target="_blank" rel="noreferrer" className="social-pill github-pill">
                            <span className="pill-icon">🐙</span> GitHub
                        </a>
                        <Link to="/writings" className="social-pill writings-pill">
                            <span className="pill-icon">✍️</span> Writings
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
