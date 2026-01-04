/**
 * Hero Section
 *
 * Source: docs/ui-lockfiles/20-page-home.md
 * - Full-bleed carousel
 * - LCP candidate
 * - 16:9 aspect ratio
 */

import React, { useState, useEffect } from 'react';
import * as styles from './HeroSection.module.css';

export interface HeroSectionProps {
  locale?: 'zh-cn' | 'en';
}

// Hero slides with gradient backgrounds matching xFusion brand style
const HERO_SLIDES = {
  'zh-cn': [
    {
      id: 1,
      title: '让智算数能更好地服务您',
      subtitle: 'GeeStack致力于提供领先的算力网络解决方案',
      cta: '了解更多',
      ctaLink: '/cn/solutions',
      gradient: 'linear-gradient(135deg, #0a1929 0%, #1a2332 50%, #2c3e50 100%)',
    },
    {
      id: 2,
      title: '全栈算力解决方案',
      subtitle: '云、边、智融合的全栈算力解决方案产品与服务',
      cta: '查看产品',
      ctaLink: '/cn/products',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    },
    {
      id: 3,
      title: '绿色智慧能源',
      subtitle: '全系列产品，全场景补能',
      cta: '探索方案',
      ctaLink: '/cn/energy',
      gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Empowering Digital Intelligence',
      subtitle: 'Leading computing network solutions for the AI era',
      cta: 'Learn More',
      ctaLink: '/en/solutions',
      gradient: 'linear-gradient(135deg, #0a1929 0%, #1a2332 50%, #2c3e50 100%)',
    },
    {
      id: 2,
      title: 'Full-Stack Computing Solutions',
      subtitle: 'Cloud-edge-AI integrated computing infrastructure',
      cta: 'View Products',
      ctaLink: '/en/products',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    },
    {
      id: 3,
      title: 'Green Energy Solutions',
      subtitle: 'Complete product line for all scenarios',
      cta: 'Explore',
      ctaLink: '/en/energy',
      gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)',
    },
  ],
};

export const HeroSection: React.FC<HeroSectionProps> = ({ locale = 'zh-cn' }) => {
  const slides = HERO_SLIDES[locale];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  // Navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % slides.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero carousel"
    >
      {/* Slides */}
      <div className={styles.slides}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
            style={{ background: slide.gradient }}
            aria-hidden={index !== currentIndex}
          >
            <div className={styles.overlay}>
              <div className={styles.container}>
                <div className={styles.content}>
                  <h1 className={styles.title}>{slide.title}</h1>
                  <p className={styles.subtitle}>{slide.subtitle}</p>
                  <a href={slide.ctaLink} className={styles.cta}>
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className={`${styles.nav} ${styles.prev}`} onClick={goToPrevious} aria-label="Previous slide">
        ‹
      </button>
      <button className={`${styles.nav} ${styles.next}`} onClick={goToNext} aria-label="Next slide">
        ›
      </button>

      {/* Indicators */}
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
};
