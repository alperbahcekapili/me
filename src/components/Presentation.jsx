import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Presentation.css';

const slides = [
    {
        id: 1,
        title: 'Yeni Dünyada Rekabet',
        type: 'unordered',
        content: [
            'Hiç olmadığı kadar çekişmeli',
            'Side-project yapmak kolaylaştı',
            'Seçmek ve seçilmek daha zor'
        ],
        color: '#FF6B6B' // Deep Coral
    },
    {
        id: 2,
        title: 'Sıradan İşe Alım Akışı',
        type: 'ordered',
        content: [
            'İK’ ya ihtiyaç bildirilir',
            'İlan açılır ve yüzlerce başvuru toplanır',
            '<strong>Statik veya dinamik filtrelerle ilk eleme yapılır</strong>',
            '<strong>İlgili ekibe özgeçmişler dağıtılır</strong>',
            'Adaylar puanlanır ve take-home task’ ı gönderilir',
            'Take-home teslim eden adaylarla mülakat ayarlanır'
        ],
        color: '#E67E22' // Carrot Orange
    },
    {
        id: 3,
        title: 'Sıradan Olmayan İşe Alım Akışı #1',
        type: 'ordered',
        content: [
            'İlgili ihtiyaç oluşur',
            'Ekip içinde referans araştırması yapılır',
            'İlgili kişilerin özgeçmişi incelenir',
            'Mülakat ayarlanır'
        ],
        color: '#D35400' // Pumpkin Orange
    },
    {
        id: 4,
        title: 'Sıradan Olmayan İşe Alım Akışı #2',
        subtitle: 'Sıradan İşe Alım Akışı → 3. adım',
        type: 'ordered',
        content: [
            'Aday işe alım ekibine ulaşır',
            'İlgili kişinin özgeçmişi incelenir',
            'Ekip üyesinin ilgili bulması neticesinde filtreleri egale eder<br/><small style="opacity: 0.8; margin-top: 5px; display: block;">Sıradan İşe Alım Akışı → 5. adım</small>'
        ],
        color: '#C0392B' // Soft Mahogany
    },
    {
        id: 5,
        title: 'The Wolf of the Wall Street',
        type: 'unordered',
        content: [
            'Profesörler, arkadaşlar, yakın çevre, uzak çevre ile sürekli temasta olmak',
            'Yeni çağ = yeni fırsatlar',
            'Luck = Doing X Telling'
        ],
        color: '#8E44AD' // Warm Purple
    },
    {
        id: 6,
        title: 'Girişimcilik Hiç Olmadığı Kadar Kolay',
        type: 'custom',
        content: [
            { text: 'Fikir → Ürün → Test → Tekrar et' },
            {
                text: 'Türkiye Girişimci Destekleme Programları:',
                nested: ['KOSGEB Girişimci Destekleme Programı', 'TÜBİTAK 1512 (BİGG)']
            },
            {
                text: 'Global Programlar',
                nested: ['Y Combinator', 'Techstars', 'Erasmus Genç Girişimciler Programı']
            },
            { text: 'Kuluçka Merkezleri' },
            { text: 'Hackathon ve Ideathon yarışmaları' }
        ],
        color: '#F39C12' // Golden Honey
    },
    {
        id: 7,
        title: 'Yurt Dışına Açılan Kapı: Akademi',
        type: 'custom',
        content: [
            { text: 'Erken başlamak' },
            {
                text: 'Yurt Dışında Doktora',
                nested: ['Burs programları: Jean Monnet, YLSY', '“Research Grants”']
            },
            { text: 'Bulunmak ⇒ vizyon, tecrübe' }
        ],
        color: '#27AE60' // Earthy Green
    },
    {
        id: 8,
        title: 'Hap Tavsiyeler',
        type: 'unordered',
        content: [
            'Odaklanan kişi fark atar',
            'Kişisel imaj çok kıymetli',
            'En iyi yatırım kendinize yaptığınız yatırımdır'
        ],
        color: '#FF7F50' // Coral Shift
    },
    {
        id: 9,
        title: 'Soru Cevap!',
        type: 'text',
        content: 'Teşekkürler!',
        color: '#6D214F' // Midnight Plum
    },
];

const Presentation = () => {
    const navigate = useNavigate();

    const renderContent = (slide) => {
        if (slide.type === 'ordered') {
            return (
                <ol className="slide-list ordered">
                    {slide.content.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ol>
            );
        }
        if (slide.type === 'unordered') {
            return (
                <ul className="slide-list unordered">
                    {slide.content.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            );
        }
        if (slide.type === 'custom') {
            return (
                <ul className="slide-list unordered">
                    {slide.content.map((item, i) => (
                        <li key={i}>
                            {item.text}
                            {item.nested && (
                                <ul className="nested-list">
                                    {item.nested.map((n, j) => <li key={j}>{n}</li>)}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            );
        }
        return <p className="slide-text">{slide.content}</p>;
    };

    return (
        <div className="presentation-snap-container">
            <button className="back-home-btn" onClick={() => navigate('/')}>
                ← Back to Portfolio
            </button>

            {slides.map((slide, index) => (
                <section
                    key={slide.id}
                    className="presentation-slide"
                    style={{ backgroundColor: slide.color }}
                >
                    <motion.div
                        className="slide-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="slide-number">Slide {index + 1} of {slides.length}</span>
                        <h1 className="slide-title">{slide.title}</h1>
                        {slide.subtitle && <h2 className="slide-subtitle">{slide.subtitle}</h2>}

                        <div className="slide-body">
                            {renderContent(slide)}
                        </div>

                        {index < slides.length - 1 && (
                            <div className="next-indicator">Kaydırın ↓</div>
                        )}
                    </motion.div>
                </section>
            ))}
        </div>
    );
};

export default Presentation;
