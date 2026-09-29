# Deployment guide for Zen Privacy Collective website

Quick reference for getting the site live.

## Pre-flight checklist

Before deploying, update these placeholders:
- [ ] Workshop dates and times in `education.html`
- [ ] Venue address and registration links
- [ ] Team member names/bios in `about.html`
- [ ] EIN and legal entity name
- [ ] Real contact email (replace `hello@zenxyprivacy.org` throughout)
- [ ] GitHub org URL (currently `https://github.com/zenxyprivacy`)
- [ ] Donation link
- [ ] Newsletter signup link

## Option A: GitHub Pages (fastest)

### Setup
```bash
# Clone or create a new repo
git clone https://github.com/YOUR-ORG/zenxyprivacy.github.io.git
cd zenxyprivacy.github.io

# Copy site files
cp -r path/to/zpc-site/* .

# Commit and push
git add .
git commit -m "Add ZPC website"
git push origin main
```

### Going live
- Site automatically deploys to `https://YOUR-ORG.github.io`
- To use custom domain:
  1. Create `CNAME` file with your domain
  2. Add DNS `CNAME` record pointing to `USERNAME.github.io`
  3. Enable HTTPS in repo settings

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
Create `/etc/nginx/sites-available/zenxyprivacy.org`:
```nginx
server {
    listen 80;
    server_name zenxyprivacy.org www.zenxyprivacy.org;
    root /var/www/zpc-site;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
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
- [Uptime Robot](https://uptimerobot.com) - Free uptime monitoring
- [StatusCake](https://www.statuscake.com) - Website monitoring
- [Plausible Analytics](https://plausible.io) - Privacy-respecting analytics

### Regular updates
- Check for broken links monthly (run link checker tool)
- Update workshop dates and content before each session
- Review footer contact info quarterly
- Update tech-stack.html as tools change

## Analytics (privacy-respecting)

### Option 1: Plausible Analytics
```html
<!-- Add to <head> in each page -->
<script defer data-domain="zenxyprivacy.org" src="https://plausible.io/js/script.js"></script>
```

### Option 2: Fathom Analytics
```html
<!-- Add to <head> -->
<script src="https://cdn.usefathom.com/script.js" data-site="XXXX" defer></script>
```

### Option 3: Matomo (self-hosted)
- More complex but full control over data
- Requires separate server or Docker container

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