/**
 * 404 Not Found Page Component
 */

import React from 'react';
import * as styles from './not-found.module.css';

export interface NotFoundPageProps {
  locale?: 'zh-cn' | 'en';
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ locale = 'zh-cn' }) => {
  const title = locale === 'zh-cn' ? '页面未找到' : 'Page Not Found';
  const description =
    locale === 'zh-cn' ? '抱歉，您访问的页面不存在或已被删除' : 'Sorry, the page you are looking for does not exist or has been removed';
  const homeButton = locale === 'zh-cn' ? '返回首页' : 'Back to Home';

  const handleGoHome = () => {
    const homePath = locale === 'zh-cn' ? '/cn' : '/en';
    window.location.href = homePath;
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const goBackButton = locale === 'zh-cn' ? '返回上一页' : 'Go Back';

  return (
    <div className={styles.notFoundPage}>
      <section className={styles.hero} aria-labelledby="not-found-title">
        <div className={styles.container}>
          <div className={styles.errorCode}>404</div>
          <h1 id="not-found-title" className={styles.title}>
            {title}
          </h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.buttonGroup}>
            <button onClick={handleGoHome} className={styles.primaryButton}>
              {homeButton}
            </button>
            <button onClick={handleGoBack} className={styles.secondaryButton}>
              {goBackButton}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
