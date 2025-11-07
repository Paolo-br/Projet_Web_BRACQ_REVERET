package com.example.alltogether.dto;

public class SocialLinkDTO {
    private String provider;
    private String url;

    public SocialLinkDTO() {}

    public SocialLinkDTO(String provider, String url) {
        this.provider = provider;
        this.url = url;
    }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
