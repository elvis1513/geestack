/**
 * Cases Page Component
 */

import React, { useState } from 'react';
import { CasesHero } from './CasesHero';
import { IndustryFilters } from '../../sections/IndustryFilters';
import { CaseCard } from '../../components/CaseCard';
import * as styles from './cases.module.css';

export interface CasesPageProps {
  locale?: 'zh-cn' | 'en';
}

const INDUSTRIES = {
  'zh-cn': [
    { id: 'all', label: '全部' },
    { id: 'finance', label: '金融' },
    { id: 'government', label: '政府' },
    { id: 'manufacturing', label: '制造' },
    { id: 'education', label: '教育' },
    { id: 'healthcare', label: '医疗' },
    { id: 'energy', label: '能源' },
  ],
  en: [
    { id: 'all', label: 'All' },
    { id: 'finance', label: 'Finance' },
    { id: 'government', label: 'Government' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'education', label: 'Education' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'energy', label: 'Energy' },
  ],
};

const CASES = {
  'zh-cn': [
    {
      id: 1,
      customer: '某大型商业银行',
      title: '核心交易系统现代化改造',
      description: '基于GeeStack服务器实现核心交易系统升级，TPS提升300%',
      industry: 'finance',
      gradient: 'linear-gradient(135deg, #1890FF 0%, #36CFC9 100%)',
    },
    {
      id: 2,
      customer: '某省政府',
      title: '智慧政务云平台建设',
      description: '构建一体化政务云平台，服务覆盖全省3000万市民',
      industry: 'government',
      gradient: 'linear-gradient(135deg, #52C41A 0%, #95DE64 100%)',
    },
    {
      id: 3,
      customer: '知名汽车制造企业',
      title: '智能工厂数字化转型',
      description: '部署工业互联网平台，实现生产效率提升40%',
      industry: 'manufacturing',
      gradient: 'linear-gradient(135deg, #FA8C16 0%, #FFD666 100%)',
    },
    {
      id: 4,
      customer: '985高校',
      title: '科研计算平台升级',
      description: '建设高性能计算集群，支撑前沿科学研究',
      industry: 'education',
      gradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
    },
    {
      id: 5,
      customer: '三甲医院',
      title: '医疗影像存储系统',
      description: 'PB级医学影像存储与智能诊断平台',
      industry: 'healthcare',
      gradient: 'linear-gradient(135deg, #F70000 0%, #FF4D4F 100%)',
    },
    {
      id: 6,
      customer: '国家电网',
      title: '智能电网数据中台',
      description: '构建电力大数据平台，实现全域数据可视化',
      industry: 'energy',
      gradient: 'linear-gradient(135deg, #13C2C2 0%, #36CFC9 100%)',
    },
  ],
  en: [
    {
      id: 1,
      customer: 'Major Commercial Bank',
      title: 'Core Trading System Modernization',
      description: 'GeeStack servers enable core system upgrade with 300% TPS improvement',
      industry: 'finance',
      gradient: 'linear-gradient(135deg, #1890FF 0%, #36CFC9 100%)',
    },
    {
      id: 2,
      customer: 'Provincial Government',
      title: 'Smart Government Cloud Platform',
      description: 'Integrated government cloud serving 30 million citizens',
      industry: 'government',
      gradient: 'linear-gradient(135deg, #52C41A 0%, #95DE64 100%)',
    },
    {
      id: 3,
      customer: 'Leading Automaker',
      title: 'Smart Factory Digital Transformation',
      description: 'Industrial IoT platform deployment with 40% efficiency gain',
      industry: 'manufacturing',
      gradient: 'linear-gradient(135deg, #FA8C16 0%, #FFD666 100%)',
    },
    {
      id: 4,
      customer: 'Top University',
      title: 'Research Computing Platform Upgrade',
      description: 'HPC cluster deployment for cutting-edge research',
      industry: 'education',
      gradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
    },
    {
      id: 5,
      customer: 'Tier-3 Hospital',
      title: 'Medical Imaging Storage System',
      description: 'PB-scale medical imaging storage and AI diagnosis platform',
      industry: 'healthcare',
      gradient: 'linear-gradient(135deg, #F70000 0%, #FF4D4F 100%)',
    },
    {
      id: 6,
      customer: 'State Grid',
      title: 'Smart Grid Data Platform',
      description: 'Power big data platform with full-domain visualization',
      industry: 'energy',
      gradient: 'linear-gradient(135deg, #13C2C2 0%, #36CFC9 100%)',
    },
  ],
};

export const CasesPage: React.FC<CasesPageProps> = ({ locale = 'zh-cn' }) => {
  const [activeIndustry, setActiveIndustry] = useState('all');
  const industries = INDUSTRIES[locale];
  const cases = CASES[locale];

  const filteredCases = activeIndustry === 'all' ? cases : cases.filter(c => c.industry === activeIndustry);

  return (
    <div className={styles.casesPage}>
      <CasesHero locale={locale} />

      <section className={styles.filtersSection} aria-label="Filter cases by industry">
        <IndustryFilters industries={industries} activeIndustry={activeIndustry} onIndustryChange={setActiveIndustry} locale={locale} />
      </section>

      <section className={styles.casesSection} aria-label="Case studies">
        <div className={styles.casesGrid}>
          {filteredCases.map(c => (
            <CaseCard
              key={c.id}
              customer={c.customer}
              title={c.title}
              description={c.description}
              industry={c.industry}
              gradient={c.gradient}
              locale={locale}
            />
          ))}
        </div>
      </section>

      <section className={styles.ctaSection} aria-label="Need help?">
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>{locale === 'zh-cn' ? '需要我们的帮助？' : 'Need Our Help?'}</h2>
          <p className={styles.ctaSubtitle}>
            {locale === 'zh-cn'
              ? '我们的专家团队随时为您提供专业的咨询服务'
              : 'Our expert team is ready to provide professional consulting services'}
          </p>
          <button className={styles.ctaButton}>{locale === 'zh-cn' ? '联系我们' : 'Contact Us'}</button>
        </div>
      </section>
    </div>
  );
};

export default CasesPage;
