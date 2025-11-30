package com.mikesgrill.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller to handle SPA (Single Page Application) routing.
 * When the React app is served from Spring Boot, client-side routes
 * (e.g., /admin/login, /menu) need to be forwarded to index.html
 * so that React Router can handle them.
 */
@Controller
public class SpaController {

    /**
     * Forward all non-API, non-static resource requests to index.html
     * This allows React Router to handle client-side routing.
     * 
     * The pattern excludes:
     * - /api/** (API endpoints)
     * - /uploads/** (uploaded files)
     * - Static resources (files with extensions like .js, .css, .png, etc.)
     */
    @GetMapping(value = {
        "/",
        "/menu",
        "/contact",
        "/admin",
        "/admin/login",
        "/admin/menu",
        "/admin/contacts",
        "/admin/users"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
