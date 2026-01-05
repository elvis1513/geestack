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

// Hero slides with background images from xFusion
const HERO_SLIDES = {
  'zh-cn': [
    {
      id: 1,
      title: 'xFusionPark算力集群',
      subtitle: '新一代算力集群解决方案，助力AI行业应用落地',
      cta: '了解详情',
      ctaLink: '/cn/products/xfusionpark',
      image: '/content/images/hero/hero-carousel-1.jpg',
    },
    {
      id: 2,
      title: '超聚变工作站X3 8000',
      subtitle: '专业级工作站，释放极致创造力',
      cta: '了解详情',
      ctaLink: '/cn/products/station-x3-8000',
      image: '/content/images/hero/hero-carousel-2.png',
    },
    {
      id: 3,
      title: '分体式智能充电系统',
      subtitle: '全系列产品，全场景补能解决方案',
      cta: '了解详情',
      ctaLink: '/cn/products/smart-energy',
      image: '/content/images/hero/hero-carousel-3.png',
    },
    {
      id: 4,
      title: '智企1.0数智化转型',
      subtitle: 'AI大模型在企业落地实践，开启业务变革新篇章',
      cta: '了解详情',
      ctaLink: '/cn/cases/ai-enterprise',
      image: '/content/images/hero/hero-carousel-4.png',
    },
  ],
  en: [
    {
      id: 1,
      title: 'xFusionPark Computing Cluster',
      subtitle: 'Next-generation computing cluster solutions for AI industry applications',
      cta: 'Learn More',
      ctaLink: '/en/products/xfusionpark',
      image: '/content/images/hero/hero-carousel-1.jpg',
    },
    {
      id: 2,
      title: 'xFusion Station X3 8000',
      subtitle: 'Professional workstation for ultimate creativity',
      cta: 'Learn More',
      ctaLink: '/en/products/station-x3-8000',
      image: '/content/images/hero/hero-carousel-2.png',
    },
    {
      id: 3,
      title: 'Distributed Intelligent Charging System',
      subtitle: 'Complete product line for all charging scenarios',
      cta: 'Learn More',
      ctaLink: '/en/products/smart-energy',
      image: '/content/images/hero/hero-carousel-3.png',
    },
    {
      id: 4,
      title: 'Enterprise Intelligence 1.0',
      subtitle: 'AI large model implementation for business transformation',
      cta: 'Learn More',
      ctaLink: '/en/cases/ai-enterprise',
      image: '/content/images/hero/hero-carousel-4.png',
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
            style={{ backgroundImage: `url(${slide.image})` }}
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
