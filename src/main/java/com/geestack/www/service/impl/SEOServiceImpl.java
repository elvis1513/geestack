package com.geestack.www.service.impl;

import com.geestack.www.config.ApplicationProperties;
import com.geestack.www.service.SEOService;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * SEO service implementation
 * Generates sitemap.xml and robots.txt for search engine optimization
 */
@Service
public class SEOServiceImpl implements SEOService {

    private final ApplicationProperties applicationProperties;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final String DEFAULT_BASE_URL = "https://www.geestack.com";

    public SEOServiceImpl(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    /**
     * Get base URL with fallback to default
     */
    private String getBaseUrl() {
        String baseUrl = applicationProperties.getBaseUrl();
        return baseUrl != null ? baseUrl : DEFAULT_BASE_URL;
    }

    /**
     * Sitemap URL entry
     */
    private static class SitemapEntry {

        String loc;
        String lastmod;
        String changefreq;
        String priority;

        SitemapEntry(String loc, String lastmod, String changefreq, String priority) {
            this.loc = loc;
            this.lastmod = lastmod;
            this.changefreq = changefreq;
            this.priority = priority;
        }
    }

    @Override
    public String generateSitemap() {
        List<SitemapEntry> entries = new ArrayList<>();

        // Add all pages with both locales
        String currentDate = LocalDateTime.now().format(DATE_FORMATTER);
        String base = getBaseUrl();

        // Home pages
        entries.add(new SitemapEntry(base + "/cn", currentDate, "daily", "1.0"));
        entries.add(new SitemapEntry(base + "/en", currentDate, "daily", "1.0"));

        // Products pages
        entries.add(new SitemapEntry(base + "/cn/products-and-solutions", currentDate, "weekly", "0.9"));
        entries.add(new SitemapEntry(base + "/en/products-and-solutions", currentDate, "weekly", "0.9"));

        // Resources pages
        entries.add(new SitemapEntry(base + "/cn/resources", currentDate, "weekly", "0.8"));
        entries.add(new SitemapEntry(base + "/en/resources", currentDate, "weekly", "0.8"));

        // Cases pages
        entries.add(new SitemapEntry(base + "/cn/cases", currentDate, "weekly", "0.8"));
        entries.add(new SitemapEntry(base + "/en/cases", currentDate, "weekly", "0.8"));

        // Contact pages
        entries.add(new SitemapEntry(base + "/cn/contact", currentDate, "monthly", "0.7"));
        entries.add(new SitemapEntry(base + "/en/contact", currentDate, "monthly", "0.7"));

        // Build XML sitemap
        StringBuilder xml = new StringBuilder();
        xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        xml.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n");
        xml.append("        xmlns:xhtml=\"http://www.w3.org/1999/xhtml\">\n");

        for (SitemapEntry entry : entries) {
            xml.append("  <url>\n");
            xml.append("    <loc>").append(escapeXml(entry.loc)).append("</loc>\n");
            xml.append("    <lastmod>").append(entry.lastmod).append("</lastmod>\n");
            xml.append("    <changefreq>").append(entry.changefreq).append("</changefreq>\n");
            xml.append("    <priority>").append(entry.priority).append("</priority>\n");
            xml.append("  </url>\n");
        }

        xml.append("</urlset>");

        return xml.toString();
    }

    @Override
    public String generateRobotsTxt() {
        StringBuilder robots = new StringBuilder();

        // Allow all crawlers
        robots.append("# Robots.txt for GeeStack website\n");
        robots.append("# Generated automatically\n\n");

        robots.append("User-agent: *\n");
        robots.append("Allow: /\n\n");

        // Disallow search result pages from indexing
        robots.append("# Disallow search result pages\n");
        robots.append("Disallow: /cn/search\n");
        robots.append("Disallow: /en/search\n\n");

        // Sitemap location
        robots.append("# Sitemap\n");
        robots.append("Sitemap: ").append(getBaseUrl()).append("/sitemap.xml\n");

        return robots.toString();
    }

    /**
     * Escape special XML characters
     */
    private String escapeXml(String input) {
        if (input == null) {
            return "";
        }
        return input.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;").replace("'", "&apos;");
    }
}
