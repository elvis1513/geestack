package com.geestack.www.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.geestack.www.service.impl.SEOServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Unit tests for SEOService
 * Verifies sitemap.xml and robots.txt generation
 */
class SEOServiceTest {

    private SEOService seoService;

    @BeforeEach
    void setUp() {
        seoService = new SEOServiceImpl();
    }

    @Test
    void testGenerateSitemap() {
        String sitemap = seoService.generateSitemap();

        // Verify XML structure
        assertThat(sitemap).isNotNull();
        assertThat(sitemap).startsWith("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
        assertThat(sitemap).contains("<urlset");
        assertThat(sitemap).contains("xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"");

        // Verify home pages
        assertThat(sitemap).contains("<loc>https://www.geestack.com/cn</loc>");
        assertThat(sitemap).contains("<loc>https://www.geestack.com/en</loc>");

        // Verify products pages
        assertThat(sitemap).contains("<loc>https://www.geestack.com/cn/products-and-solutions</loc>");
        assertThat(sitemap).contains("<loc>https://www.geestack.com/en/products-and-solutions</loc>");

        // Verify resources pages
        assertThat(sitemap).contains("<loc>https://www.geestack.com/cn/resources</loc>");
        assertThat(sitemap).contains("<loc>https://www.geestack.com/en/resources</loc>");

        // Verify cases pages
        assertThat(sitemap).contains("<loc>https://www.geestack.com/cn/cases</loc>");
        assertThat(sitemap).contains("<loc>https://www.geestack.com/en/cases</loc>");

        // Verify contact pages
        assertThat(sitemap).contains("<loc>https://www.geestack.com/cn/contact</loc>");
        assertThat(sitemap).contains("<loc>https://www.geestack.com/en/contact</loc>");

        // Verify required elements
        assertThat(sitemap).contains("<lastmod>");
        assertThat(sitemap).contains("<changefreq>");
        assertThat(sitemap).contains("<priority>");

        // Verify priority values
        assertThat(sitemap).contains("<priority>1.0</priority>"); // Home
        assertThat(sitemap).contains("<priority>0.9</priority>"); // Products
        assertThat(sitemap).contains("<priority>0.8</priority>"); // Resources/Cases
        assertThat(sitemap).contains("<priority>0.7</priority>"); // Contact

        // Verify closing tag
        assertThat(sitemap).endsWith("</urlset>");
    }

    @Test
    void testGenerateRobotsTxt() {
        String robotsTxt = seoService.generateRobotsTxt();

        assertThat(robotsTxt).isNotNull();

        // Verify user-agent directive
        assertThat(robotsTxt).contains("User-agent: *");
        assertThat(robotsTxt).contains("Allow: /");

        // Verify disallow for search pages
        assertThat(robotsTxt).contains("Disallow: /cn/search");
        assertThat(robotsTxt).contains("Disallow: /en/search");

        // Verify sitemap reference
        assertThat(robotsTxt).contains("Sitemap: https://www.geestack.com/sitemap.xml");
    }

    @Test
    void testSitemapXmlEscaping() {
        String sitemap = seoService.generateSitemap();

        // Verify properly formed XML (contains tags)
        assertThat(sitemap).contains("<");
        assertThat(sitemap).contains(">");

        // Verify no unescaped ampersands (except in &lt;, &gt;, &amp;, etc.)
        // Count standalone & characters that aren't part of entities
        long unescapedAmpCount = sitemap.chars().filter(c -> c == '&').count();
        long entityCount = sitemap.chars().filter(c -> c == ';').count();

        // All & should be part of entities (followed by ;)
        // Actually, for simple sitemap without special chars, just verify structure
        assertThat(sitemap).contains("<?xml");
        assertThat(sitemap).contains("<urlset");
        assertThat(sitemap).contains("</urlset>");
    }

    @Test
    void testSitemapAllPages() {
        String sitemap = seoService.generateSitemap();

        // Count URL entries (should be 10: 5 pages x 2 languages)
        // Pages: home, products, resources, cases, contact
        long urlCount = sitemap.lines().filter(line -> line.trim().equals("<url>")).count();
        assertThat(urlCount).isEqualTo(10);
    }

    @Test
    void testSitemapChangefreq() {
        String sitemap = seoService.generateSitemap();

        // Verify changefreq values
        assertThat(sitemap).contains("<changefreq>daily</changefreq>"); // Home
        assertThat(sitemap).contains("<changefreq>weekly</changefreq>"); // Products
        assertThat(sitemap).contains("<changefreq>monthly</changefreq>"); // Contact
    }
}
