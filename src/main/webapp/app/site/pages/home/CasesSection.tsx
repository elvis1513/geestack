/**
 * Cases Section
 *
 * Source: docs/ui-lockfiles/20-page-home.md
 * - 1 column (featured case + view more)
 */

import React from 'react';
import * as styles from './CasesSection.module.css';

export interface CasesSectionProps {
  locale?: 'zh-cn' | 'en';
}

const FEATURED_CASE = {
  'zh-cn': {
    id: 1,
    title: 'GeeStack智企1.0 AI大模型在企业落地实践',
    description:
      '基于GeeStack全栈算力解决方案，帮助企业构建AI大模型应用平台。通过云边智融合架构，实现模型训练、推理部署的一站式服务，加速AI在业务场景中的落地应用，提升企业智能化水平。',
    industry: '企业服务',
    image: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    link: '/cn/cases/ai-implementation',
  },
  en: {
    id: 1,
    title: 'GeeStack Enterprise 1.0 AI LLM Implementation',
    description:
      'Built AI large model application platform for enterprises using GeeStack full-stack computing solutions. Through cloud-edge-AI fusion architecture, we provide one-stop services for model training and inference deployment, accelerating AI implementation in business scenarios and elevating enterprise intelligence.',
    industry: 'Enterprise Services',
    image: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    link: '/en/cases/ai-implementation',
  },
};

export const CasesSection: React.FC<CasesSectionProps> = ({ locale = 'zh-cn' }) => {
  const caseStudy = FEATURED_CASE[locale];
  const sectionTitle = locale === 'zh-cn' ? '成功案例' : 'Success Stories';
  const viewAllText = locale === 'zh-cn' ? '查看更多案例' : 'View More Cases';
  const industryLabel = locale === 'zh-cn' ? '行业' : 'Industry';
  const learnMoreText = locale === 'zh-cn' ? '了解详情' : 'Learn More';

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{sectionTitle}</h2>
      <a href={caseStudy.link} className={styles.caseCard}>
        <div className={styles.image} style={{ background: caseStudy.image }} />
        <div className={styles.content}>
          <span className={styles.industry}>
            {industryLabel}: {caseStudy.industry}
          </span>
          <h3 className={styles.caseTitle}>{caseStudy.title}</h3>
          <p className={styles.caseDescription}>{caseStudy.description}</p>
          <span className={styles.cta}>{learnMoreText} →</span>
        </div>
      </a>
      <div className={styles.footer}>
        <a href={locale === 'zh-cn' ? '/cn/cases' : '/en/cases'} className={styles.viewAll}>
          {viewAllText}
        </a>
      </div>
    </section>
  );
};
