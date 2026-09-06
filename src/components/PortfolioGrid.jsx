import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './PortfolioGrid.css';

// Company Logos
// Nokia logo URL (PNG from external source)
const nokiaLogo = 'https://1000logos.net/wp-content/uploads/2017/03/Nokia-Logo-768x432.png';
import aselsanLogo from '../assets/aselsan.svg';
import falLogo from '../assets/fal_logo.svg';

// Grid Images
import academicImg from '../assets/grid/academic.jpg';
import projectsImg from '../assets/grid/projects.jpg';
import rayTracerImg from '../assets/grid/ray_tracer.jpg';
import diffusionImg from '../assets/grid/diffusion.jpg';
import blogsImg from '../assets/grid/blogs.jpg';
import talksImg from '../assets/grid/talks.jpg';
import booksImg from '../assets/grid/books.jpg';

// Gallery Photos
import vizviz from '../assets/gallery/vızvız.jpg';
import foxy from '../assets/gallery/foxy.jpg';
import pinky from '../assets/gallery/pinky.jpg';
import riseAndShine from '../assets/gallery/rise-and-shine.jpg';
import wholeFamily from '../assets/gallery/whole-family.jpg';
import paper from '../assets/grid/paper.jpeg';

const gridItems = [
  // 1. Companies Worked At
  {
    id: 'nokia',
    title: 'Nokia',
    sub: 'Software Developer • GenAI & RAG',
    type: 'modal',
    logo: nokiaLogo,
    logoClass: 'logo-nokia',
    bgColor: '#ffffff',
    modalData: {
      title: 'Nokia',
      role: 'Software Developer',
      date: 'Sep 2025 - June 2026 & Jul 2023 - Nov 2024',
      desc: 'Building Generative AI & Retrieval-Augmented Generation (RAG) solutions for enterprise platforms and telecommunication workflows.',
      logo: nokiaLogo
    }
  },
  {
    id: 'aselsan',
    title: 'Aselsan',
    sub: 'Computer Vision Engineer',
    type: 'modal',
    logo: aselsanLogo,
    logoClass: 'logo-aselsan',
    bgColor: '#ffffff',
    modalData: {
      title: 'Aselsan',
      role: 'Computer Vision Engineer',
      date: 'Nov 2024 - Sep 2025',
      desc: 'Defense industry computer vision projects: Multi-target tracking, object detection algorithms, and real-time image enhancement pipelines.',
      logo: aselsanLogo
    }
  },
  {
    id: 'fal',
    title: 'fal.ai',
    sub: 'AI & Generative Media Developer',
    type: 'modal',
    logo: falLogo,
    logoClass: 'logo-fal',
    bgColor: '#ffffff',
    modalData: {
      title: 'fal.ai',
      role: 'Applied MLE',
      date: 'Since June 2026',
      desc: 'Developing fast Generative AI inference pipelines',
      logo: falLogo,
      link: 'https://fal.ai',
      linkText: 'Visit fal.ai ↗'
    }
  },

  // 2. Academic (Graduation Clothing)
  {
    id: 'academic',
    title: 'METU (ODTÜ) MSc',
    sub: 'NLP, Deep Learning & Medical AI',
    type: 'modal',
    image: academicImg,
    modalData: {
      title: 'Middle East Technical University (METU)',
      role: 'MSc with Thesis in Computer Engineering',
      place: 'Sep 2023 - Present',
      date: 'Active',
      image: academicImg,
      desc: `Courses taken (GPA 4.00):`,
      courses: [
        {
          title: 'CENG 501 DEEP LEARNING',
          meta: 'Fall 2023-2024'
        },
        {
          title: 'CENG 570 COMPUTATIONAL GEOMETRY',
          meta: 'Fall 2023-2024'
        },
        {
          title: 'CENG 502 ADVANCED DEEP LEARNING',
          meta: 'Spring 2023-2024'
        },
        {
          title: 'CENG 590 RESEARCH METHODS AND ETHICS',
          meta: 'Spring 2023-2024'
        },
        {
          title: 'CENG 796 DEEP GENERATIVE MODELS',
          meta: 'Spring 2023-2024'
        },
        {
          title: 'CENG 795 SPECIAL TOPICS: ADVANCED RAY TRACING',
          meta: 'Fall 2024-2025'
        },
        {
          title: 'CENG 596 INFORMATION RETRIEVAL',
          meta: 'Spring 2024-2025'
        }
      ]
    }
  },

  // 3. Projects & Startups
  {
    id: 'ray-tracer',
    title: 'C++ Ray Tracer',
    sub: 'Advanced 3D Ray Tracing Engine',
    type: 'external',
    link: 'https://github.com/alperbahcekapili/Advanced-Ray-Tracing',
    image: rayTracerImg
  },

  // 4. Talks
  {
    id: 'atilim-talk',
    title: 'Yapay Zekanın Çağında Olmak',
    sub: 'Atılım University IEEE Keynote',
    type: 'internal',
    link: '/atilim-ieee',
    image: talksImg
  },

  // 5. Blogs & Writings
  {
    id: 'codethefuture',
    title: 'CodeTheFuture MiniCamp',
    sub: 'Interactive Slide Presentation',
    type: 'internal',
    link: '/presentation',
    image: blogsImg
  },
  {
    id: 'diffusion-models',
    title: 'Diffusion Models Guide',
    sub: 'Deep Generative Models Summary',
    type: 'external',
    link: 'https://github.com/alperbahcekapili/deep-generative-models-topic-summaries/blob/main/diffusion_models.md',
    image: diffusionImg
  },

  // 7. Photos
  {
    id: 'photo-vizviz',
    title: '🐾 Vızvız',
    sub: 'Photo',
    type: 'photo',
    image: vizviz,
    caption: 'Vızvız enjoying a quiet afternoon'
  },
  {
    id: 'photo-foxy',
    title: '🦊 Foxy',
    sub: 'Photo',
    type: 'photo',
    image: foxy,
    caption: 'Foxy striking a pose'
  },
  {
    id: 'photo-pinky',
    title: '🌸 Pinky',
    sub: 'Photo',
    type: 'photo',
    image: pinky,
    caption: 'Pinky in full bloom'
  },
  {
    id: 'photo-rise-and-shine',
    title: '🌅 Rise and Shine',
    sub: 'Photo',
    type: 'photo',
    image: riseAndShine,
    caption: 'Golden morning light'
  },
  {
    id: 'photo-whole-family',
    title: '👨‍👩‍👧‍👦 Whole Family',
    sub: 'Photo',
    type: 'photo',
    image: wholeFamily,
    caption: 'Unforgettable moments with the whole family'
  },
  {
    id: 'thesis',
    title: 'CONWISE-FT',
    sub: 'ENHANCING FEW‑SHOT LEARNING THROUGH CONTRASTIVE PROJECTION TUNING AND POST‑TRAINING WEIGHT ENSEMBLING',
    type: 'external',
    link: 'https://user.ceng.metu.edu.tr/~emre/research-group.html',
    image: paper
  },
  {
    id: 'colorectal-dataset',
    title: 'Heliyon: Colorectal cancer tumor grade segmentation: A new dataset and baseline results (2025)',
    sub: 'Benchmark Dataset Paper',
    type: 'external',
    link: 'https://scholar.google.com/citations?user=jJjKReQAAAAJ&hl=en',
    image: paper
  },
  {
    id: 'colorectal-challenge',
    title: 'ICIPW: Colorectal Cancer Tumor Grade Segmentation in Histopathology (2025)',
    sub: 'International Challenge Publication',
    type: 'external',
    link: 'https://scholar.google.com/citations?user=jJjKReQAAAAJ&hl=en',
    image: paper
  }
];

const PortfolioGrid = () => {
  const navigate = useNavigate();
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedPhoto) setSelectedPhoto(null);
        else if (activeModalItem) setActiveModalItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, activeModalItem]);

  const handleCardClick = (item) => {
    if (item.type === 'external') {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    } else if (item.type === 'internal') {
      navigate(item.link);
    } else if (item.type === 'photo') {
      setSelectedPhoto(item);
    } else if (item.type === 'modal') {
      setActiveModalItem(item);
    }
  };

  return (
    <div className="portfolio-grid-section">
      <div className="square-grid-container">
        {gridItems.map((item) => (
          <div
            key={item.id}
            className="square-card"
            onClick={() => handleCardClick(item)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(item);
              }
            }}
          >
            {/* Visual Container */}
            <div className="square-visual" style={{ backgroundColor: item.bgColor || '#f1f5f9' }}>
              {item.logo ? (
                <div className="logo-card-wrapper">
                  <img src={item.logo} alt={item.title} className={`square-brand-logo ${item.logoClass || ''}`} />
                </div>
              ) : (
                <img src={item.image} alt={item.title} className="square-img" />
              )}
            </div>

            {/* Minimalist Hover Overlay - Headers Only (No categories) */}
            <div className="hover-overlay">
              <h3 className="overlay-title">{item.title}</h3>
              <p className="overlay-sub">{item.sub}</p>
              <span className="overlay-action">
                {item.type === 'external' ? 'Open link ↗' : item.type === 'internal' ? 'View page →' : item.type === 'photo' ? 'View photo ↗' : 'View details ↗'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              className="modal-card"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close"
              >
                ✕
              </button>

              <div className="modal-inner">
                {activeModalItem.modalData?.image && (
                  <div className="modal-hero-cover">
                    <img src={activeModalItem.modalData.image} alt={activeModalItem.title} className="modal-cover-img" />
                  </div>
                )}

                <div className="modal-header-banner">
                  <h2>{activeModalItem.modalData?.title || activeModalItem.title}</h2>
                </div>

                <div className="modal-body-list">
                  <div className="modal-item-card">
                    <div className="item-card-top">
                      <h4>{activeModalItem.modalData?.role}</h4>
                      <span className="item-date">{activeModalItem.modalData?.date}</span>
                    </div>
                    {activeModalItem.modalData?.place && (
                      <p className="item-subhead"><strong>{activeModalItem.modalData.place}</strong></p>
                    )}
                    <p>{activeModalItem.modalData?.desc}</p>
                    {activeModalItem.modalData?.link && (
                      <a
                        href={activeModalItem.modalData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link-btn"
                        style={{ marginTop: '0.85rem' }}
                      >
                        {activeModalItem.modalData.linkText || 'Open Link ↗'}
                      </a>
                    )}
                  </div>

                  {/* Courses taken if available */}
                  {activeModalItem.modalData?.courses && (
                    <div className="modal-sub-section">
                      <h4>Courses taken</h4>
                      <ul>
                        {activeModalItem.modalData.courses.map((c, idx) => (
                          <li key={idx}>
                            <strong>{c.title}</strong>
                            <span className="course-meta">{c.meta}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL PHOTO LIGHTBOX */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="photo-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="photo-lightbox-modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="lightbox-image-container">
                <img src={selectedPhoto.image} alt={selectedPhoto.label || selectedPhoto.title} className="lightbox-img" />
              </div>
              <div className="lightbox-caption">
                <h3>{selectedPhoto.title || selectedPhoto.label}</h3>
                <p>{selectedPhoto.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioGrid;
