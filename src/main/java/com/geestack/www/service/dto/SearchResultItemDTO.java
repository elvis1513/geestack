package com.geestack.www.service.dto;

import java.util.List;

/**
 * DTO for a single search result item
 */
public class SearchResultItemDTO {

    private String id;
    private String type; // product, resource, case
    private String title;
    private String summary;
    private String url;
    private String thumbnail;
    private String category;
    private List<String> tags;
    private String publishedAt;

    public SearchResultItemDTO() {}

    public SearchResultItemDTO(String id, String type, String title, String summary, String url) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.summary = summary;
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(String publishedAt) {
        this.publishedAt = publishedAt;
    }
}
