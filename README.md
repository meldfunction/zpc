# Zen Privacy Collective Website

Static HTML website for Zen Privacy Collective, a 501(c)(3) nonprofit focused on privacy education and organizational accompaniment.

## Contents

```
.
├── index.html           # Homepage
├── education.html       # Workshops and education services
├── about.html           # Mission, values, governance, team
├── tech-stack.html      # Recommended tools and infrastructure
├── security-fails.html  # Common security failure scenarios + fixes
├── shop.html            # Recommended gear and where to buy it
├── MISSING.md           # Launch audit: what is fixed and what is still open
├── css/
│   └── styles.css       # Styling for all pages
└── README.md            # This file
```

## Design notes

- **Responsive design:** Adapts to mobile, tablet, and desktop
- **Accessibility:** Semantic HTML, WCAG 2.1 AA color contrast
- **No dependencies:** Static HTML + CSS, no JavaScript required
- **Color scheme:** Zen-inspired palette with teal primary, gold accent, warm neutrals

## Deployment options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repo named `zenxyprivacy.github.io` (or any name)
2. Push this folder to the repo's `main` branch
3. Visit `https://zenxyprivacy.github.io` (or your custom domain)

### Option 2: Self-hosted (Any web server)
1. Upload files to your server (via SFTP, rsync, git, etc.)
2. Configure your web server to serve files from this directory
3. Ensure `index.html` is the default document

**Nginx example:**
```nginx
server {
    listen 443 ssl;
    server_name zenxyprivacy.org;
    root /var/www/zpc-site;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

**Apache example:**
```apache
<VirtualHost *:443>
    ServerName zenxyprivacy.org
    DocumentRoot /var/www/zpc-site
</VirtualHost>
```

### Option 3: Netlify (Recommended for non-technical users)
1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop this folder into Netlify
3. Custom domain setup in Netlify dashboard

## Customization

### Update contact info
- Edit footer links in each `.html` file
- Add real email address (currently `hello@zenxyprivacy.org`)
- Add links to newsletter signup, donation page, GitHub org

### Update workshop dates and times
- Edit workshop items in `education.html`
- Change venue, add registration link, adjust prerequisites

### Change colors
Edit `:root` CSS variables in `css/styles.css`:
```css
:root {
  --color-primary: #1a5c7a;      /* Main brand color */
  --color-secondary: #2d8fa3;    /* Hover/secondary */
  --color-accent: #d4af37;       /* Gold accents */
  --color-bg: #f5f3f0;           /* Page background */
  /* ... etc ... */
}
```

### Add additional pages
1. Create new `.html` file (e.g., `blog.html`)
2. Copy nav structure from `index.html`
3. Add link to new page in all navigation menus

## Browser support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lightweight: No external dependencies
- Fast load: one small stylesheet, no images or scripts
- Good accessibility: Semantic HTML, proper contrast

## Next steps

Before going live:
- [ ] Add real contact email and links
- [ ] Set up donation system (Stripe, PayPal, Donorbox)
- [ ] Create newsletter signup form
- [ ] Add workshop registration/ticketing
- [ ] Set up analytics (privacy-respecting: Plausible, Fathom, or Matomo)
- [ ] Configure SSL certificate (Let's Encrypt if self-hosted)
- [ ] Create `/admin` pages for managing workshop enrollment
- [ ] Set up contact form backend

## License

This site is open source. Feel free to fork, customize, and adapt for other nonprofits or organizations.

## Questions?

Contact: hello@zenxyprivacy.org
## Review draft (GitHub Pages)

This copy is a **review draft**. Every page carries `<meta name="robots" content="noindex, nofollow">`, and `robots.txt` blocks crawlers. Remove both before the real launch.

Deployment: `.github/workflows/pages.yml` publishes the repo root on every push to `main`. One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
