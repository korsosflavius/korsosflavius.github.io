import { useState, useEffect } from 'react';
import './ImageCarousel.css';
import poianaBrasovImg from '../assets/aerial-drone-view-poiana-brasov-romania-touristic-buildings-located-top-mountain-covered-with-lush-forest.jpg';
import turnulAlbImg from '../assets/turnul-alb.jpg';

interface CarouselImage {
  id: number;
  url: string;
  title: string;
  description: string;
  source: string;
}

const images: CarouselImage[] = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/19768814/pexels-photo-19768814.jpeg',
    title: 'Piața Sfatului',
    description: 'Centrul istoric al orașului Brașov',
    source: 'Pexels'
  },
  {
    id: 2,
    url: 'https://questo.imgix.net/quests/639240186e19ed576a53e9b3/pictures/646b12f4-ccfc-42ab-8a99-2e545e53e010.jpeg',
    title: 'Biserica Neagră',
    description: 'Cea mai mare biserică gotică din România',
    source: 'Questo'
  },
  {
    id: 3,
    url: 'https://www.clubulcopiilor.ro/wp-content/uploads/2023/04/Tampa_2-jpeg.webp',
    title: 'Tâmpa',
    description: 'Priveliște panoramică asupra Brașovului',
    source: 'Clubul Copiilor'
  },
  {
    id: 4,
    url: turnulAlbImg,
    title: 'Turnul Alb',
    description: 'Turn medieval de apărare cu vedere panoramică',
    source: 'Assets'
  },
  {
    id: 5,
    url: poianaBrasovImg,
    title: 'Poiana Brașov',
    description: 'Stațiune montană și resort de schi',
    source: 'Assets'
  }
];

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
        setIsAutoPlaying(true);
      } else if (e.key === 'ArrowRight') {
        goToNext();
        setIsAutoPlaying(true);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  const handleManualNavigation = (action: () => void) => {
    setIsAutoPlaying(false);
    action();
  };

  return (
    <section id="carousel" className="carousel-section">
      <div className="container">
        <h2 className="section-title">Galerie Foto</h2>
        <p className="section-subtitle">Descoperă frumusețea Brașovului</p>
        
        <div className="carousel-container">
          <div className="carousel-slides">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
              >
                <img src={image.url} alt={image.title} />
                <div className="carousel-caption">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="carousel-arrow carousel-arrow-left" 
            onClick={() => handleManualNavigation(goToPrevious)}
            aria-label="Imaginea anterioară"
          >
            <span>‹</span>
          </button>
          <button 
            className="carousel-arrow carousel-arrow-right" 
            onClick={() => handleManualNavigation(goToNext)}
            aria-label="Imaginea următoare"
          >
            <span>›</span>
          </button>

          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleManualNavigation(() => goToSlide(index))}
                aria-label={`Mergi la imaginea ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
