package com.geestack.www.service.dto;

import java.util.List;

/**
 * DTO for search response
 */
public class SearchResponseDTO {

    private String lang;
    private String query;
    private List<SearchResultItemDTO> items;
    private PageInfoDTO page;

    public SearchResponseDTO() {}

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public List<SearchResultItemDTO> getItems() {
        return items;
    }

    public void setItems(List<SearchResultItemDTO> items) {
        this.items = items;
    }

    public PageInfoDTO getPage() {
        return page;
    }

    public void setPage(PageInfoDTO page) {
        this.page = page;
    }
}
