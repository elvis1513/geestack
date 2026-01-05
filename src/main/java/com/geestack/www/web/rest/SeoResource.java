package com.geestack.www.web.rest;

import com.geestack.www.service.SEOService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for SEO resources
 * Provides sitemap.xml and robots.txt for search engines
 */
@RestController
@RequestMapping("/seo")
public class SeoResource {

    private static final Logger log = LoggerFactory.getLogger(SeoResource.class);

    private final SEOService seoService;

    public SeoResource(SEOService seoService) {
        this.seoService = seoService;
    }

    /**
     * GET /sitemap.xml : Get sitemap for search engines
     *
     * @return the sitemap XML content
     */
    @GetMapping(value = "/sitemap.xml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<String> getSitemap() {
        log.debug("REST request to get sitemap.xml");

        String sitemap = seoService.generateSitemap();

        // Cache sitemap for 1 hour
        CacheControl cacheControl = CacheControl.maxAge(3600, java.util.concurrent.TimeUnit.SECONDS);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_XML);
        headers.setCacheControl(cacheControl);

        log.info("Sitemap.xml generated successfully ({} bytes)", sitemap.length());

        return ResponseEntity.ok().headers(headers).body(sitemap);
    }

    /**
     * GET /robots.txt : Get robots.txt for search engines
     *
     * @return the robots.txt content
     */
    @GetMapping(value = "/robots.txt", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> getRobotsTxt() {
        log.debug("REST request to get robots.txt");

        String robotsTxt = seoService.generateRobotsTxt();

        // Cache robots.txt for 24 hours
        CacheControl cacheControl = CacheControl.maxAge(86400, java.util.concurrent.TimeUnit.SECONDS);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        headers.setCacheControl(cacheControl);

        log.info("robots.txt generated successfully ({} bytes)", robotsTxt.length());

        return ResponseEntity.ok().headers(headers).body(robotsTxt);
    }
}
