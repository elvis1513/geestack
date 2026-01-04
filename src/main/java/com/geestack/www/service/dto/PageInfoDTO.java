package com.geestack.www.service.dto;

/**
 * DTO for pagination information
 */
public class PageInfoDTO {

    private Integer page;
    private Integer size;
    private Long totalElements;
    private Integer totalPages;

    public PageInfoDTO() {}

    public PageInfoDTO(Integer page, Integer size, Long totalElements, Integer totalPages) {
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
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

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }
}
