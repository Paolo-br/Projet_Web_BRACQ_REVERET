package com.example.alltogether.dto;

public class FileUploadResponse {
    private String url;
    private String filename;
    private long size;
    private String message;

    public FileUploadResponse(String url, String filename, long size, String message) {
        this.url = url;
        this.filename = filename;
        this.size = size;
        this.message = message;
    }

    // Getters et setters
    public String getUrl() {
        return url;
    }

    public String getFilename() {
        return filename;
    }

    public long getSize() {
        return size;
    }

    public String getMessage() {
        return message;
    }
}
