/**
 * Resources Page
 *
 * Source: docs/ui-lockfiles/22-page-resources.md
 * - Resource catalog with category filters
 * - 3-column grid for resources
 */

import React, { useState } from 'react';
import { ResourcesHero } from './ResourcesHero';
import { ResourceFilters } from './ResourceFilters';
import { ResourceCard } from '../../components/ResourceCard';
import * as styles from './resources.module.css';

export interface ResourcesPageProps {
  locale?: 'zh-cn' | 'en';
}

// Static resource data (placeholder)
const RESOURCE_TYPES = {
  'zh-cn': [
    { id: 'all', label: '全部' },
    { id: 'whitepaper', label: '白皮书' },
    { id: 'technical', label: '技术文档' },
    { id: 'case', label: '案例研究' },
    { id: 'video', label: '视频教程' },
  ],
  en: [
    { id: 'all', label: 'All' },
    { id: 'whitepaper', label: 'Whitepapers' },
    { id: 'technical', label: 'Technical Docs' },
    { id: 'case', label: 'Case Studies' },
    { id: 'video', label: 'Video Tutorials' },
  ],
};

const RESOURCES = {
  'zh-cn': [
    {
      id: 1,
      title: '企业数智化转型白皮书 2024',
      description: '深度解析企业数智化转型路径，分享GeeStack全栈算力解决方案最佳实践',
      type: 'whitepaper',
      size: 'PDF · 3.2MB',
      date: '2024-12-15',
      gradient: 'linear-gradient(135deg, #1890FF 0%, #36CFC9 100%)',
    },
    {
      id: 2,
      title: 'GeeStack算力网络技术架构指南',
      description: '详细介绍GeeStack算力网络的技术架构、部署方案与运维实践',
      type: 'technical',
      size: 'PDF · 2.8MB',
      date: '2024-12-10',
      gradient: 'linear-gradient(135deg, #52C41A 0%, #95DE64 100%)',
    },
    {
      id: 3,
      title: '某大型银行智算中心建设案例',
      description: '分享GeeStack为某大型银行建设智算中心的完整实施过程与成果',
      type: 'case',
      size: 'PDF · 4.1MB',
      date: '2024-12-05',
      gradient: 'linear-gradient(135deg, #F70000 0%, #FF4D4F 100%)',
    },
    {
      id: 4,
      title: 'GeeStack产品入门教程视频',
      description: '快速了解GeeStack产品功能与使用方法，适合初学者',
      type: 'video',
      size: 'MP4 · 15:30',
      date: '2024-11-28',
      gradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
    },
    {
      id: 5,
      title: '液冷服务器部署最佳实践',
      description: '基于GeeStack液冷服务器的数据中心部署方案与经验总结',
      type: 'technical',
      size: 'PDF · 2.1MB',
      date: '2024-11-20',
      gradient: 'linear-gradient(135deg, #52C41A 0%, #95DE64 100%)',
    },
    {
      id: 6,
      title: 'AI训练算力优化白皮书',
      description: '面向AI大模型训练的算力优化策略与技术方案',
      type: 'whitepaper',
      size: 'PDF · 3.5MB',
      date: '2024-11-15',
      gradient: 'linear-gradient(135deg, #1890FF 0%, #36CFC9 100%)',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Enterprise Digital Transformation Whitepaper 2024',
      description: 'In-depth analysis of digital transformation paths with GeeStack full-stack computing solutions',
      type: 'whitepaper',
      size: 'PDF · 3.2MB',
      date: '2024-12-15',
      gradient: 'linear-gradient(135deg, #1890FF 0%, #36CFC9 100%)',
    },
    {
      id: 2,
      title: 'GeeStack Computing Network Architecture Guide',
      description: 'Technical architecture, deployment solutions and operations best practices',
      type: 'technical',
      size: 'PDF · 2.8MB',
      date: '2024-12-10',
      gradient: 'linear-gradient(135deg, #52C41A 0%, #95DE64 100%)',
    },
    {
      id: 3,
      title: 'Large Bank Intelligent Computing Center Case Study',
      description: 'Complete implementation process and results of GeeStack intelligent computing center',
      type: 'case',
      size: 'PDF · 4.1MB',
      date: '2024-12-05',
      gradient: 'linear-gradient(135deg, #F70000 0%, #FF4D4F 100%)',
    },
    {
      id: 4,
      title: 'GeeStack Product Tutorial Video',
      description: 'Quick start guide to GeeStack product features and usage',
      type: 'video',
      size: 'MP4 · 15:30',
      date: '2024-11-28',
      gradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
    },
    {
      id: 5,
      title: 'Liquid-Cooled Server Deployment Best Practices',
      description: 'Datacenter deployment solutions based on GeeStack liquid-cooled servers',
      type: 'technical',
      size: 'PDF · 2.1MB',
      date: '2024-11-20',
      gradient: 'linear-gradient(135deg, #52C41A 0%, #95DE64 100%)',
    },
    {
      id: 6,
      title: 'AI Training Computing Optimization Whitepaper',
      description: 'Computing optimization strategies and technical solutions for AI model training',
      type: 'whitepaper',
      size: 'PDF · 3.5MB',
      date: '2024-11-15',
      gradient: 'linear-gradient(135deg, #1890FF 0%, #36CFC9 100%)',
    },
  ],
};

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ locale = 'zh-cn' }) => {
  const resourceTypes = RESOURCE_TYPES[locale];
  const resources = RESOURCES[locale];
  const [activeType, setActiveType] = useState('all');

  const filteredResources = activeType === 'all' ? resources : resources.filter(r => r.type === activeType);

  return (
    <div className={styles.page}>
      <ResourcesHero locale={locale} />
      <ResourceFilters resourceTypes={resourceTypes} activeType={activeType} onTypeChange={setActiveType} locale={locale} />

      {/* Resources Grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {filteredResources.map(resource => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                type={resource.type}
                size={resource.size}
                date={resource.date}
                gradient={resource.gradient}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
