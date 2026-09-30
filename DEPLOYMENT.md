# Deployment guide for Zen Privacy Collective website

Quick reference for getting the site live.

## Pre-flight checklist

Before launch (the full list with context is in `MISSING.md`):
- [ ] Workshop dates, calendar events, and their `status` in `zpc-data.js`
- [ ] Venue address and online join link
- [ ] Team or board names in the About page (`index.html`)
- [ ] Legal entity and fiscal-sponsor wording confirmed with ISI
- [ ] Contact email works (`hello@zenxyprivacy.org`, set as `ZPC_INBOX` in `index.html` and used across the plain pages)
- [ ] GitHub org URL in the footer (currently `https://github.com/zenxyprivacy`)
- [ ] Donation and newsletter links, or remove them
- [ ] Policy drafts approved (`privacy.html`, `conduct.html`, `accessibility.html`)
- [ ] Remove the `noindex` meta tags and the `robots.txt` block

## Option A: GitHub Pages (what this repo uses now)

`.github/workflows/pages.yml` deploys the repo root to GitHub Pages:

- **Every push to `main`** deploys the site. It reuses the headlines already published (no feed fetching) and rebuilds `text.html`.
- **Once a day** (11:17 UTC) it also refreshes the News tracker from RSS feeds. Scheduled runs are paused until 2026-10-01.
- **Actions → Deploy to GitHub Pages → Run workflow** redeploys with fresh headlines on demand.
- `design/` is removed before upload, so the raw Claude Design exports aren't published.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**. If the source is still "Deploy from a branch", GitHub runs a second deploy of the raw branch on every push, which can overwrite ours.

### Custom domain
1. Settings → Pages → Custom domain, enter the domain, and tick "Enforce HTTPS".
2. Add the DNS records GitHub shows (a `CNAME` to `meldfunction.github.io` for a subdomain, or the four `A` records for an apex domain).
3. Change the `/zpc/` link in `404.html` to `/`.

GitHub Pages can't send custom security headers. The pages already set `referrer` to `no-referrer` with a meta tag. For the full header set, self-host (Option C).

## Option B: Netlify (recommended for non-technical)

### Setup
1. Sign up at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `zpc-site` folder
4. Site goes live instantly at `https://[random-name].netlify.app`

### Custom domain
1. In Netlify dashboard: Site settings → Domain management
2. Add custom domain
3. Follow DNS instructions (varies by registrar)

### Automatic SSL (free)
Netlify provides free HTTPS automatically. No additional setup needed.

## Option C: Self-hosted Linux server

### Prerequisites
- Linux server (Ubuntu 20.04+ or Debian 11+)
- SSH access
- Domain name with DNS access

### Install Nginx
```bash
sudo apt update
sudo apt install nginx

# Enable and start
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Deploy site
```bash
# Copy files to server
scp -r zpc-site/* user@server:/var/www/zpc-site

# Or using rsync (better for updates)
rsync -avz zpc-site/ user@server:/var/www/zpc-site/
```

### Configure Nginx
Create `/etc/nginx/sites-available/zenxyprivacy.org`. This redirects HTTP to HTTPS, hides the nginx version, and sends the security headers a privacy org should have:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name zenxyprivacy.org www.zenxyprivacy.org;
    return 301 https://zenxyprivacy.org$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name zenxyprivacy.org;
    root /var/www/zpc-site;
    index index.html;
    server_tokens off;

    # ssl_certificate / ssl_certificate_key lines are added by certbot (below).

    # Everything is served from this site, so 'self' is enough. The page runtime compiles its template in the
    # browser (new Function) and index.html has two small inline scripts, hence 'unsafe-eval' and 'unsafe-inline'
    # for scripts; the design uses inline styles throughout. Test in a browser console after enabling.
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
    add_header X-Frame-Options "DENY" always;

    location / {
        try_files $uri $uri/ =404;
    }
    error_page 404 /404.html;

    # news.json and text.html change daily: always revalidate
    location ~* ^/(news\.json|text\.html)$ {
        add_header Cache-Control "no-cache";
        # add_header inside a location replaces the server-level ones, so repeat them here if you need them.
    }

    # Cache static assets (not immutable: file names don't change between versions)
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 7d;
    }

    # Access logs hold visitors' IP addresses. Keep them short or turn them off.
    access_log off;
}
```

The News tracker needs the daily refresh too. On a server, run it from cron and rebuild the text version:
```bash
# crontab -e
17 11 * * * cd /var/www/zpc-site && python3 scripts/fetch_news.py && node scripts/build_text.mjs
```

Enable and test:
```bash
sudo ln -s /etc/nginx/sites-available/zenxyprivacy.org \
    /etc/nginx/sites-enabled/

sudo nginx -t
sudo systemctl reload nginx
```

### SSL (Let's Encrypt)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d zenxyprivacy.org -d www.zenxyprivacy.org

# Auto-renewal is configured automatically
```

## Monitoring & maintenance

### Check site health
```bash
# SSL certificate validity
echo | openssl s_client -servername zenxyprivacy.org -connect zenxyprivacy.org:443 2>/dev/null | \
  openssl x509 -noout -dates
```

### Set up monitoring
- [Uptime Robot](https://uptimerobot.com) or [StatusCake](https://www.statuscake.com) for uptime alerts. They only check the site from outside; they don't see visitors.

### Regular updates
- Check for broken links monthly (run link checker tool)
- Update workshop dates and content before each session
- Review footer contact info quarterly
- Update `zpc-data.js` as tools change (it feeds the Tools page and the text version)
- Renew `.well-known/security.txt` before its `Expires` date (Sept 30, 2027)

## Analytics

**Default: none.** The privacy policy (`privacy.html`) promises no trackers and no analytics. Adding any script that counts visitors means updating that page first.

If you ever need numbers:
1. **Server log counts** (self-hosting only): tools like GoAccess read nginx logs on your own server, with no script in the page. Keep logs for days, not months.
2. **Self-hosted, cookie-free counters** such as GoatCounter or Matomo on your own server, loaded from your own domain so the CSP stays `'self'`.

Avoid third-party analytics scripts (Plausible cloud, Fathom, Google Analytics). Each one tells another company about every visitor.

## Emergency procedures

### Site is down
1. Check server status: `systemctl status nginx`
2. Check error logs: `journalctl -u nginx -n 50`
3. Verify DNS is working: `nslookup zenxyprivacy.org`
4. Restart Nginx: `sudo systemctl restart nginx`

### Hacked/defaced
1. Take site offline immediately
2. Restore from clean backup
3. Review access logs for intrusion
4. Change all credentials
5. Consider security audit

### Performance issues
```bash
# Check server load
top

# Check disk space
df -h

# Check log size
du -sh /var/log/nginx/*
```

## Backup strategy

Keep regular backups:
```bash
# Manual backup
tar czf zpc-site-backup-$(date +%Y%m%d).tar.gz /var/www/zpc-site

# Automated weekly backup
# Add to crontab: 0 2 * * 0 tar czf /backups/zpc-$(date +\%Y\%m\%d).tar.gz /var/www/zpc-site
```

## Questions?

Contact: hello@zenxyprivacy.org