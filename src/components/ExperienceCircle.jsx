import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ExperienceCircle.css';

// Data Categorized
const categories = {
    research: {
        id: 'research',
        title: 'Research',
        color: 'var(--color-research)',
        items: [
            { id: 'r1', title: 'MSc Student', place: 'METU', date: 'Sep 2023 - Present', desc: 'Computer Science. Focus on NLP & Deep Learning.' },
            { id: 'r2', title: 'Research Intern', place: 'TOBB ETU (STAR)', date: 'Jul 2022 - Mar 2023', desc: 'Stance Detection on Social Media. Built end-to-end crawling & analysis capability.' },
            { id: 'r3', title: 'Publication', place: 'Dataset & Baseline', date: '2023', desc: 'Colorectal cancer tumor grade segmentation: A new dataset and baseline results.' },
            { id: 'r4', title: 'Publication', place: 'Challenge', date: '2023', desc: 'Colorectal Cancer Tumor Grade Segmentation in Digital Histopathology Images.' },
        ]
    },
    swe: {
        id: 'swe',
        title: 'Software Eng.',
        color: 'var(--color-swe)',
        items: [
            { id: 's1', title: 'Software Developer', place: 'Nokia', date: 'Sep 2025 - Present', desc: 'Generative AI & RAG solutions. (Also worked here Jul 2023 - Nov 2024).' },
            { id: 's2', title: 'CV Engineer', place: 'Aselsan', date: 'Nov 2024 - Sep 2025', desc: 'Defense projects: Detection, tracking, and image enhancement.' },
        ]
    },
    parttime: {
        id: 'parttime',
        title: 'Part-time & Intern',
        color: 'var(--color-parttime)',
        items: [
            { id: 'p1', title: 'Tutor', place: 'Kodland', date: 'Mar 2023 - Jul 2023', desc: 'Teaching Python to kids.' },
            { id: 'p2', title: 'Intern', place: 'Kuartis', date: 'Sep 2022 - Dec 2022', desc: 'Quantization and Federated Learning.' },
            { id: 'p3', title: 'Intern', place: 'Zenam', date: 'Jan 2022 - Jul 2022', desc: 'Web Development (.NET, Angular).' },
            { id: 'p4', title: 'Teaching Assistant', place: 'TOBB ETU', date: 'Oct 2021 - Dec 2021', desc: 'C Programming Course.' },
            { id: 'p5', title: 'Intern', place: 'HAVELSAN', date: 'Jun 2021 - Sep 2021', desc: 'Digital Twin Proof-of-Concept.' },
        ]
    },
    startup: {
        id: 'startup',
        title: 'Startup',
        color: 'var(--color-startup)',
        items: [
            { id: 'e1', title: 'Founder / Dev', place: 'Agesec', date: 'Present', desc: 'Autonomous Offensive Security. Awarded in YFYI competition. Check agesec.site.' },
        ]
    }
};

const ExperienceCircle = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [satelliteDist, setSatelliteDist] = useState(140);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setSatelliteDist(window.innerWidth < 768 ? 95 : 180);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Quadrant Positions calculation
    // We will have 4 main "Category Nodes" fixed at corners
    // When hovered, they reveal their "Leaf Nodes".

    const handleCategoryHover = (catKey) => {
        setActiveCategory(catKey);
    };

    return (
        <div className="experience-container">
            {/* Show All Toggle */}
            <div className="toggle-wrapper" onClick={() => setShowAll(!showAll)}>
                <span className="toggle-label">Show Everything</span>
                <div className={`switch ${showAll ? 'on' : ''}`}>
                    <div className="handle" />
                </div>
            </div>

            {/* Central "ME" Node */}
            <div className="center-wrapper">
                <motion.div
                    className="me-blob"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    ME
                </motion.div>
            </div>

            {/* Category Orbits */}
            <div className="orbit-container">
                <CategoryNode
                    cat={categories.research}
                    position={{ top: '32%', left: '32%' }}
                    angleRange={{ start: 100, end: 300 }}
                    onHover={handleCategoryHover}
                    isActive={showAll || activeCategory === 'research'}
                    setActiveItem={setActiveItem}
                    dist={satelliteDist}
                />
                <CategoryNode
                    cat={categories.swe}
                    position={{ top: '32%', right: '32%' }}
                    angleRange={{ start: 280, end: 350 }}
                    onHover={handleCategoryHover}
                    isActive={showAll || activeCategory === 'swe'}
                    setActiveItem={setActiveItem}
                    dist={satelliteDist}
                />
                <CategoryNode
                    cat={categories.parttime}
                    position={{ bottom: '32%', right: '32%' }}
                    angleRange={{ start: 100, end: 340 }}
                    onHover={handleCategoryHover}
                    isActive={showAll || activeCategory === 'parttime'}
                    setActiveItem={setActiveItem}
                    dist={satelliteDist}
                />
                <CategoryNode
                    cat={categories.startup}
                    position={{ bottom: '32%', left: '32%' }}
                    angleRange={{ start: 100, end: 170 }}
                    onHover={handleCategoryHover}
                    isActive={showAll || activeCategory === 'startup'}
                    setActiveItem={setActiveItem}
                    dist={satelliteDist}
                />
            </div>

            {/* Info Card Pop-up */}
            <AnimatePresence>
                {activeItem && (
                    <motion.div
                        className="info-modal"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className="modal-header" style={{ background: activeItem.color }}>
                            {/* Use category color if passed, else default */}
                        </div>
                        <div className="modal-content">
                            <h3>{activeItem.place}</h3>
                            <h4>{activeItem.title}</h4>
                            <span className="modal-date">{activeItem.date}</span>
                            <p>{activeItem.desc}</p>
                        </div>
                        <button className="close-btn" onClick={() => setActiveItem(null)}>✕</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CategoryNode = ({ cat, position, angleRange, onHover, isActive, setActiveItem, dist }) => {
    return (
        <div
            className={`category-node ${isActive ? 'active' : ''}`}
            style={{ ...position, backgroundColor: cat.color }}
            onMouseEnter={() => onHover(cat.id)}

        >
            <span className="cat-title">{cat.title}</span>

            {/* Satellite Items - Only show when active */}
            <AnimatePresence>
                {isActive && (
                    <div className="satellites">
                        {cat.items.map((item, index) => {
                            // Calculate position around the category node
                            // Distributed within angleRange
                            const totalSpan = angleRange.end - angleRange.start;
                            const step = cat.items.length > 1 ? totalSpan / (cat.items.length - 1) : 0;
                            const angle = angleRange.start + (index * step);
                            const rad = (angle * Math.PI) / 180;
                            // dist used from props

                            const x = Math.cos(rad) * dist;
                            const y = Math.sin(rad) * dist;

                            return (
                                <motion.div
                                    key={item.id}
                                    className="satellite-item"
                                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                                    animate={{ scale: 1, opacity: 1, x: x, y: y }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ delay: index * 0.05, type: 'spring' }}
                                    onClick={(e) => { e.stopPropagation(); setActiveItem({ ...item, color: cat.color }); }}
                                >
                                    {item.place}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExperienceCircle;
