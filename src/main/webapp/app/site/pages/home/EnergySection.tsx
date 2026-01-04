/**
 * Energy Section
 *
 * Source: docs/ui-lockfiles/20-page-home.md
 * - 3 columns grid
 * - Energy solutions cards
 */

import React from 'react';
import * as styles from './ProductsSection.module.css'; // Reuse styles

export interface EnergySectionProps {
  locale?: 'zh-cn' | 'en';
}

const ENERGY_SOLUTIONS = {
  'zh-cn': [
    {
      id: 1,
      title: 'FusionWatt充电系统',
      description: '全系列液冷充电产品，全场景补能解决方案',
      image: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      link: '/cn/energy/fusionwatt',
    },
    {
      id: 2,
      title: '液冷超充',
      description: '600kW+大功率液冷超充，极速补能体验',
      image: 'linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)',
      link: '/cn/energy/liquid-cooling',
    },
    {
      id: 3,
      title: '光储充一体化',
      description: '光伏发电+储能+充电，绿色智慧能源方案',
      image: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      link: '/cn/energy/integrated',
    },
  ],
  en: [
    {
      id: 1,
      title: 'FusionWatt Charging System',
      description: 'Full-series liquid-cooled charging products for all scenarios',
      image: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
      link: '/en/energy/fusionwatt',
    },
    {
      id: 2,
      title: 'Liquid-Cooled Supercharging',
      description: '600kW+ high-power liquid-cooled ultra-fast charging',
      image: 'linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)',
      link: '/en/energy/liquid-cooling',
    },
    {
      id: 3,
      title: 'Integrated PV-Storage-Charging',
      description: 'Solar + storage + charging integrated green energy solution',
      image: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      link: '/en/energy/integrated',
    },
  ],
};

export const EnergySection: React.FC<EnergySectionProps> = ({ locale = 'zh-cn' }) => {
  const solutions = ENERGY_SOLUTIONS[locale];
  const sectionTitle = locale === 'zh-cn' ? '能源智慧解决方案' : 'Energy Solutions';
  const sectionDescription = locale === 'zh-cn' ? '全系列产品，全场景补能' : 'Full product lineup for all charging scenarios';
  const viewAllText = locale === 'zh-cn' ? '查看全部' : 'View All';

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{sectionTitle}</h2>
          <p className={styles.description}>{sectionDescription}</p>
        </div>
        <a href={locale === 'zh-cn' ? '/cn/energy' : '/en/energy'} className={styles.viewAll}>
          {viewAllText} →
        </a>
      </div>
      <div className={styles.grid}>
        {solutions.map(solution => (
          <a key={solution.id} href={solution.link} className={styles.card}>
            <div className={styles.image} style={{ background: solution.image }} />
            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{solution.title}</h3>
              <p className={styles.cardDescription}>{solution.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
