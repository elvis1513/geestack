package com.geestack.www.service.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * DTO for search requests
 */
public class SearchRequestDTO {

    @NotBlank(message = "Language is required")
    @Pattern(regexp = "zh-cn|en", message = "Language must be 'zh-cn' or 'en'")
    private String lang;

    @NotBlank(message = "Query is required")
    @Size(min = 1, max = 100, message = "Query must be between 1 and 100 characters")
    private String q;

    @Min(value = 0, message = "Page must be >= 0")
    private Integer page = 0;

    @Min(value = 1, message = "Size must be >= 1")
    @Max(value = 50, message = "Size must be <= 50")
    private Integer size = 10;

    public SearchRequestDTO() {}

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public String getQ() {
        return q;
    }

    public void setQ(String q) {
        this.q = q;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }
}
