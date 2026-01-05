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
      customer: '智企1.0',
      title: '超聚变智企1.0 AI大模型在企业落地实践',
      description: '基于GeeStack全栈算力解决方案，帮助企业构建AI大模型应用平台。通过云边智融合架构，实现模型训练、推理部署的一站式服务',
      industry: 'finance',
      image: '/content/images/cases/case-ai-enterprise.png',
      link: '/cn/cases/ai-enterprise',
    },
    {
      id: 2,
      customer: 'Global Switch',
      title: '高效 低碳 可靠！超聚变助力Global Switch数据中心显著降本增效',
      description: 'Global Switch已具备充足的冷却能力，可以满足香港不断增长的AI需求',
      industry: 'energy',
      image: '/content/images/cases/case-global-switch.jpg',
      link: '/cn/cases/global-switch',
    },
    {
      id: 3,
      customer: '中国联通',
      title: '超聚变静音全液冷一体化算力系统成功部署中国联通互联网应用创新基地',
      description: '联合研发业界首个"静音全液冷一体化系统"，实现数据中心绿色低碳和无人运维',
      industry: 'manufacturing',
      image: '/content/images/cases/case-unicom.jpg',
      link: '/cn/cases/unicom',
    },
    {
      id: 4,
      customer: 'ENAGEO',
      title: '超聚变助力阿尔及利亚石油公司ENAGEO，提供卓越服务器解决方案',
      description: '在撒哈拉沙漠极端高温环境下，超聚变FusionServer服务器依然能够稳定运行',
      industry: 'energy',
      image: '/content/images/cases/case-enageo.jpg',
      link: '/cn/cases/enageo',
    },
  ],
  en: [
    {
      id: 1,
      customer: 'Enterprise 1.0',
      title: 'AI Large Model Implementation in Enterprise',
      description:
        'Built AI large model application platform using GeeStack full-stack computing solutions with cloud-edge-AI fusion architecture',
      industry: 'finance',
      image: '/content/images/cases/case-ai-enterprise.png',
      link: '/en/cases/ai-enterprise',
    },
    {
      id: 2,
      customer: 'Global Switch',
      title: 'xFusion Helps Global Switch Data Center Reduce Costs and Improve Efficiency',
      description: "Global Switch now has sufficient cooling capacity to meet Hong Kong's growing AI demands",
      industry: 'energy',
      image: '/content/images/cases/case-global-switch.jpg',
      link: '/en/cases/global-switch',
    },
    {
      id: 3,
      customer: 'China Unicom',
      title: 'Silent Liquid-Cooled Integrated System Deployed at China Unicom Innovation Base',
      description: 'Jointly developed industry-first "silent full liquid-cooled system" for green and unmanned datacenter operations',
      industry: 'manufacturing',
      image: '/content/images/cases/case-unicom.jpg',
      link: '/en/cases/unicom',
    },
    {
      id: 4,
      customer: 'ENAGEO',
      title: 'xFusion Provides Server Solutions for Algeria Oil Company ENAGEO',
      description: 'In the extreme heat of the Sahara Desert, xFusion FusionServer delivers stable operation',
      industry: 'energy',
      image: '/content/images/cases/case-enageo.jpg',
      link: '/en/cases/enageo',
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
        <IndustryFilters industries={industries} activeIndustry={activeIndustry} onIndustryChange={setActiveIndustry} />
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
              image={c.image}
              link={c.link}
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
