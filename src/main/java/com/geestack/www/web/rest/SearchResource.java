package com.geestack.www.web.rest;

import com.geestack.www.service.SearchService;
import com.geestack.www.service.dto.SearchRequestDTO;
import com.geestack.www.service.dto.SearchResponseDTO;
import jakarta.validation.Valid;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for site search
 */
@RestController
@RequestMapping("/api/site")
public class SearchResource {

    private static final Logger log = LoggerFactory.getLogger(SearchResource.class);

    private final SearchService searchService;

    public SearchResource(SearchService searchService) {
        this.searchService = searchService;
    }

    /**
     * GET /api/site/search : Search for content
     *
     * @param lang the language (zh-cn or en)
     * @param q    the search query
     * @param page the page number (default 0)
     * @param size the page size (default 10, max 50)
     * @return the search response
     */
    @GetMapping("/search")
    public ResponseEntity<SearchResponseDTO> search(
        @RequestParam(value = "lang") String lang,
        @RequestParam(value = "q") String q,
        @RequestParam(value = "page", defaultValue = "0") Integer page,
        @RequestParam(value = "size", defaultValue = "10") Integer size
    ) {
        String requestId = UUID.randomUUID().toString();
        log.debug("[{}] Search request: lang={}, q={}, page={}, size={}", requestId, lang, sanitizeQuery(q), page, size);

        // Build and validate request
        SearchRequestDTO request = new SearchRequestDTO();
        request.setLang(lang);
        request.setQ(q);
        request.setPage(page);
        request.setSize(size);

        // Perform search
        long startTime = System.currentTimeMillis();
        SearchResponseDTO response = searchService.search(request);
        long duration = System.currentTimeMillis() - startTime;

        log.info(
            "[{}] Search completed: query='{}', results={}, duration={}ms",
            requestId,
            sanitizeQuery(q),
            response.getItems().size(),
            duration
        );

        return ResponseEntity.ok(response);
    }

    /**
     * Sanitize query string for logging (remove sensitive data)
     */
    private String sanitizeQuery(String query) {
        if (query == null) {
            return "";
        }
        // Truncate long queries
        return query.length() > 50 ? query.substring(0, 50) + "..." : query;
    }
}
