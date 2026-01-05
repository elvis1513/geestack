import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs';

import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

// Inner component that has access to Router context
const AppContent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 只在需要认证的路由时才检查会话（管理后台等）
    // 公共网站（/cn/*, /en/*）不需要认证检查
    const currentPath = window.location.pathname;
    const needsAuth = currentPath.startsWith('/admin');

    if (needsAuth) {
      dispatch(getSession());
    }
    // getProfile() 获取应用配置信息，公共网站也需要
    dispatch(getProfile());
  }, []);

  return (
    <div className="app-container">
      <ToastContainer position="top-left" className="toastify-container" toastClassName="toastify-toast" />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter basename={baseHref}>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
