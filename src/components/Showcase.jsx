import React, { useState } from 'react';
import './Showcase.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import vizviz from '../assets/gallery/vızvız.jpg';

const showcaseData = [
    {
        title: 'Blogs',
        color: 'var(--color-swe)',
        items: [
            { id: 'b1', label: 'CodeTheFuture MiniCamp', link: '/presentation', internal: true, active: true },
            { id: 'b2', label: 'AI Research Insights', link: '#', active: false },
            { id: 'b3', label: 'Software Career Path', link: '#', active: false },
        ]
    },
    {
        title: 'Projects',
        color: 'var(--color-startup)',
        items: [
            { id: 'p1', label: 'Agentic Cybersecurity', link: 'https://agesec.site', active: true },
            { id: 'p2', label: 'RAG Chatbot', link: '#', active: false },
            { id: 'p3', label: 'CV Object Tracker', link: '#', active: false },
        ]
    },
    {
        title: 'Books to Read',
        color: 'var(--color-research)',
        items: [
            { id: 'bk1', label: 'Deep Learning', link: '#', active: false },
            { id: 'bk2', label: 'Clean Code', link: '#', active: false },
            { id: 'bk3', label: 'Atomic Habits', link: '#', active: false },
        ]
    },
    {
        title: 'Best Photos',
        color: 'var(--color-parttime)',
        items: [
            { id: 'ph1', label: 'Vızvız', image: vizviz, active: true },
            { id: 'ph2', label: 'Nature Walk', image: null, active: false },
            { id: 'ph3', label: 'Team Photo', image: null, active: false },
        ]
    }
];

const Showcase = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handlePhotoClick = (item) => {
        if (item.image) {
            setSelectedImage(item);
        }
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

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
                            {section.items.map((item) => {
                                // Best Photos section - handle image display
                                if (section.title === 'Best Photos') {
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handlePhotoClick(item)}
                                            className={`showcase-btn ${item.active ? '' : 'disabled'}`}
                                            type="button"
                                        >
                                            {item.label}
                                        </button>
                                    );
                                }

                                // Other sections - handle links
                                return item.internal ? (
                                    <Link
                                        key={item.id}
                                        to={item.link}
                                        className={`showcase-btn ${item.active ? '' : 'disabled'}`}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.id}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`showcase-btn ${item.active ? '' : 'disabled'}`}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Image Modal */}
            {selectedImage && (
                <div className="image-modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>✕</button>
                        <img src={selectedImage.image} alt={selectedImage.label} />
                        <h3>{selectedImage.label}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Showcase;
