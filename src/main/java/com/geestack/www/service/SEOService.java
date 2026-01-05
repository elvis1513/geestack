package com.geestack.www.service;

/**
 * Service for handling SEO-related operations
 * Generates sitemap.xml and robots.txt for search engines
 */
public interface SEOService {
    /**
     * Generate sitemap.xml content
     *
     * @return XML string containing sitemap for all pages
     */
    String generateSitemap();

    /**
     * Generate robots.txt content
     *
     * @return robots.txt content
     */
    String generateRobotsTxt();
}
