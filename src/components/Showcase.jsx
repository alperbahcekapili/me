import React from 'react';
import './Showcase.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const showcaseData = [
    {
        title: 'Blogs',
        color: 'var(--color-swe)',
        items: [
            { id: 'b1', label: 'Presentation', link: '/presentation', internal: true },
            { id: 'b2', label: 'AI Research Insights', link: '#' },
            { id: 'b3', label: 'Software Career Path', link: '#' },
        ]
    },
    {
        title: 'Projects',
        color: 'var(--color-startup)',
        items: [
            { id: 'p1', label: 'Agesec Security', link: 'https://agesec.site' },
            { id: 'p2', label: 'RAG Chatbot', link: '#' },
            { id: 'p3', label: 'CV Object Tracker', link: '#' },
        ]
    },
    {
        title: 'Books to Read',
        color: 'var(--color-research)',
        items: [
            { id: 'bk1', label: 'Deep Learning', link: '#' },
            { id: 'bk2', label: 'Clean Code', link: '#' },
            { id: 'bk3', label: 'Atomic Habits', link: '#' },
        ]
    },
    {
        title: 'Best Photos',
        color: 'var(--color-parttime)',
        items: [
            { id: 'ph1', label: 'Ankara Skyline', link: '#' },
            { id: 'ph2', label: 'Nature Walk', link: '#' },
            { id: 'ph3', label: 'Team Photo', link: '#' },
        ]
    }
];

const Showcase = () => {
    return (
        <div className="showcase-container">
            {showcaseData.map((section, index) => (
                <motion.div
                    key={index}
                    className="showcase-row"
                    style={{ backgroundColor: section.color }}
                    initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                >
                    <div className="row-content">
                        <h2 className="row-title">{section.title}</h2>
                        <div className="button-group">
                            {section.items.map((item) => (
                                item.internal ? (
                                    <Link
                                        key={item.id}
                                        to={item.link}
                                        className={`showcase-btn ${item.label !== 'Presentation' ? 'disabled' : ''}`}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.id}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`showcase-btn ${item.label !== 'Presentation' ? 'disabled' : ''}`}
                                    >
                                        {item.label}
                                    </a>
                                )
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Showcase;
