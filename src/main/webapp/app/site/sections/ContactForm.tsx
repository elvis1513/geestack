/**
 * Contact Form Section
 */

import React, { useState } from 'react';
import * as styles from './ContactForm.module.css';

export interface ContactFormProps {
  locale?: 'zh-cn' | 'en';
}

export const ContactForm: React.FC<ContactFormProps> = ({ locale = 'zh-cn' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static placeholder - no actual submission
    // Form submission will be implemented with backend API
    alert(locale === 'zh-cn' ? '感谢您的留言，我们会尽快与您联系！' : 'Thank you for your message, we will contact you soon!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const labels = {
    name: locale === 'zh-cn' ? '姓名' : 'Name',
    email: locale === 'zh-cn' ? '邮箱' : 'Email',
    phone: locale === 'zh-cn' ? '电话' : 'Phone',
    company: locale === 'zh-cn' ? '公司' : 'Company',
    message: locale === 'zh-cn' ? '留言' : 'Message',
    submit: locale === 'zh-cn' ? '提交' : 'Submit',
  };

  return (
    <section className={styles.formSection} aria-label="Contact form">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            {labels.name} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder={locale === 'zh-cn' ? '请输入您的姓名' : 'Enter your name'}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            {labels.email} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder={locale === 'zh-cn' ? '请输入您的邮箱' : 'Enter your email'}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            {labels.phone}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
            placeholder={locale === 'zh-cn' ? '请输入您的电话' : 'Enter your phone'}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company" className={styles.label}>
            {labels.company}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={styles.input}
            placeholder={locale === 'zh-cn' ? '请输入您的公司名称' : 'Enter your company'}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            {labels.message} *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className={styles.textarea}
            placeholder={locale === 'zh-cn' ? '请输入您的留言内容' : 'Enter your message'}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          {labels.submit}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
