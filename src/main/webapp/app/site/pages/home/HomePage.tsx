/**
 * GeeStack Home Page
 *
 * Source: docs/ui-lockfiles/20-page-home.md
 * - Sections: Hero, Featured, Products, Energy, Cases, News
 * - Hero: Full-bleed carousel (LCP candidate)
 * - Grid layouts by section
 */

import React from 'react';
import { HeroSection } from './HeroSection';
import { FeaturedSection } from './FeaturedSection';
import { ProductsSection } from './ProductsSection';
import { EnergySection } from './EnergySection';
import { CasesSection } from './CasesSection';
import { NewsSection } from './NewsSection';
import * as styles from './home.module.css';

export interface HomePageProps {
  locale?: 'zh-cn' | 'en';
}

export const HomePage: React.FC<HomePageProps> = ({ locale = 'zh-cn' }) => {
  return (
    <div className={styles.homePage}>
      {/* Hero Section - Full-bleed, no container */}
      <HeroSection locale={locale} />

      {/* Featured Section - 4 columns */}
      <section className={styles.section}>
        <div className={styles.container}>
          <FeaturedSection locale={locale} />
        </div>
      </section>

      {/* Products Section - 3 columns */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <ProductsSection locale={locale} />
        </div>
      </section>

      {/* Energy Section - 3 columns */}
      <section className={styles.section}>
        <div className={styles.container}>
          <EnergySection locale={locale} />
        </div>
      </section>

      {/* Cases Section - 1 column */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <CasesSection locale={locale} />
        </div>
      </section>

      {/* News Section - 3 columns */}
      <section className={styles.section}>
        <div className={styles.container}>
          <NewsSection locale={locale} />
        </div>
      </section>
    </div>
  );
};
