import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile_casual2.jpeg';
import './Home.css';

const Home = () => {
    return (
        <div className="home-content">
            <motion.div
                className="profile-container"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
            >
                <div className="profile-wrapper">
                    <img src={profileImg} alt="Alper Bahçekapılı" className="profile-img" />
                    <div className="blob-bg"></div>
                </div>
            </motion.div>

            <motion.div
                className="text-container"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1 className="name">Hi, I'm Alper! 👋</h1>
                <h2 className="title">Building cool AI & Software stuff @ Nokia</h2>
                <p className="summary">
                    I'm a Master's student at METU CENG who loves building AI products.
                    I work on NLP, Computer Vision, and Deep Learning, but I promise I speak human languages too!
                    Currently focused on Generative AI and few-shot learning in medical image analysis. If you feel like it, say hi from linkedin!
                </p>

                <div className="social-links">
                    <a href="mailto:alperbah.13@gmail.com" className="social-pill">Email</a>
                    <a href="https://www.linkedin.com/in/alper-bahcekapili/" target="_blank" rel="noreferrer" className="social-pill">LinkedIn</a>
                    <a href="https://github.com/alperbahcekapili" target="_blank" rel="noreferrer" className="social-pill">GitHub</a>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
