package com.geestack.www.service.impl;

import com.geestack.www.service.SearchService;
import com.geestack.www.service.dto.PageInfoDTO;
import com.geestack.www.service.dto.SearchRequestDTO;
import com.geestack.www.service.dto.SearchResponseDTO;
import com.geestack.www.service.dto.SearchResultItemDTO;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Search service implementation with mock data
 * TODO: P1 - Replace with PostgreSQL full-text search or Elasticsearch
 */
@Service
public class SearchServiceImpl implements SearchService {

    @Override
    public SearchResponseDTO search(SearchRequestDTO request) {
        SearchResponseDTO response = new SearchResponseDTO();
        response.setLang(request.getLang());
        response.setQuery(request.getQ());

        // Mock search results - match items containing the query
        List<SearchResultItemDTO> items = getMockResults(request.getLang(), request.getQ());
        response.setItems(items);

        // Mock pagination
        int totalElements = items.size();
        int totalPages = (int) Math.ceil((double) totalElements / request.getSize());
        PageInfoDTO pageInfo = new PageInfoDTO(request.getPage(), request.getSize(), (long) totalElements, totalPages);
        response.setPage(pageInfo);

        return response;
    }

    /**
     * Get mock search results based on language and query
     * TODO: P1 - Replace with real database search
     */
    private List<SearchResultItemDTO> getMockResults(String lang, String query) {
        List<SearchResultItemDTO> results = new ArrayList<>();
        String queryLower = query.toLowerCase();

        // Prefix for URLs based on language
        String urlPrefix = "zh-cn".equals(lang) ? "/cn" : "/en";

        // Mock products
        if (queryLower.contains("服务器") || queryLower.contains("server") || queryLower.isEmpty()) {
            results.add(
                new SearchResultItemDTO(
                    "prod-001",
                    "product",
                    "zh-cn".equals(lang) ? "机架式服务器" : "Rack Server",
                    "zh-cn".equals(lang)
                        ? "高性能机架式服务器，支持最新Intel Xeon处理器，适用于企业关键业务应用。"
                        : "High-performance rack server with latest Intel Xeon processors for enterprise business applications.",
                    urlPrefix + "/products/rack-server"
                )
            );
            results.add(
                new SearchResultItemDTO(
                    "prod-002",
                    "product",
                    "zh-cn".equals(lang) ? "存储系统" : "Storage System",
                    "zh-cn".equals(lang)
                        ? "企业级存储解决方案，支持多种存储协议，提供高可靠性和高性能。"
                        : "Enterprise storage solution supporting multiple protocols with high reliability and performance.",
                    urlPrefix + "/products/storage-system"
                )
            );
        }

        // Mock resources
        if (
            queryLower.contains("文档") ||
            queryLower.contains("document") ||
            queryLower.contains("白皮书") ||
            queryLower.contains("whitepaper") ||
            queryLower.isEmpty()
        ) {
            results.add(
                new SearchResultItemDTO(
                    "res-001",
                    "resource",
                    "zh-cn".equals(lang) ? "服务器部署指南" : "Server Deployment Guide",
                    "zh-cn".equals(lang)
                        ? "详细的服务器安装和配置步骤，包括硬件要求和软件设置。"
                        : "Detailed server installation and configuration steps including hardware and software requirements.",
                    urlPrefix + "/resources/server-deployment-guide"
                )
            );
            results.add(
                new SearchResultItemDTO(
                    "res-002",
                    "resource",
                    "zh-cn".equals(lang) ? "云架构白皮书" : "Cloud Architecture Whitepaper",
                    "zh-cn".equals(lang)
                        ? "深入了解云计算架构设计，包括微服务、容器化和DevOps实践。"
                        : "In-depth guide to cloud architecture design including microservices, containerization, and DevOps.",
                    urlPrefix + "/resources/cloud-architecture-whitepaper"
                )
            );
        }

        // Mock cases
        if (
            queryLower.contains("案例") ||
            queryLower.contains("case") ||
            queryLower.contains("客户") ||
            queryLower.contains("customer") ||
            queryLower.isEmpty()
        ) {
            results.add(
                new SearchResultItemDTO(
                    "case-001",
                    "case",
                    "zh-cn".equals(lang) ? "某大型银行数字化转型" : "Digital Transformation for Major Bank",
                    "zh-cn".equals(lang)
                        ? "帮助某大型银行实现核心系统现代化改造，提升系统性能和可靠性。"
                        : "Modernized core systems for a major bank, improving performance and reliability.",
                    urlPrefix + "/cases/bank-digital-transformation"
                )
            );
            results.add(
                new SearchResultItemDTO(
                    "case-002",
                    "case",
                    "zh-cn".equals(lang) ? "电商平台高并发方案" : "E-commerce High Concurrency Solution",
                    "zh-cn".equals(lang)
                        ? "为某电商平台设计高并发架构，支持百万级用户同时访问。"
                        : "Designed high-concurrency architecture for an e-commerce platform supporting millions of concurrent users.",
                    urlPrefix + "/cases/ecommerce-high-concurrency"
                )
            );
        }

        return results;
    }
}
