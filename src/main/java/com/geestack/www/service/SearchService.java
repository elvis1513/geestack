package com.geestack.www.service;

import com.geestack.www.service.dto.SearchRequestDTO;
import com.geestack.www.service.dto.SearchResponseDTO;

/**
 * Service for handling search operations
 */
public interface SearchService {
    /**
     * Search for content matching the query
     *
     * @param request the search request
     * @return the search response with matching items
     */
    SearchResponseDTO search(SearchRequestDTO request);
}
