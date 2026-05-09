package com.algoviz.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String houtaiPath = "../houtai/dist";
        Path houtaiDir = Paths.get(houtaiPath).toAbsolutePath().normalize();

        registry.addResourceHandler("/admin/**")
                .addResourceLocations("file:" + houtaiDir.toString() + "/")
                .setCachePeriod(3600);

        registry.addResourceHandler("/assets/**")
                .addResourceLocations("file:" + houtaiDir.toString() + "/assets/")
                .setCachePeriod(3600);
    }
}
