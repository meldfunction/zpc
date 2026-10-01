# Who can reach your kid? Project files

**index.html** is the complete site. Keep it next to the **images/** folder, which it loads its photos from, and open it in any browser.

**kids-devices-snapshot.pdf** is a printable snapshot of the core views (map, plan, tech radar, learn, devices and news, guide, essay) using a sample family.

**images/** holds the photos the page uses, compressed for the web.

**image-credits.csv** lists every photo, where it appears, where it came from, and its rights status.

> Unsplash photos are used under the Unsplash License, credited to each photographer. All brand photos (Tin Can, Cosmo, Spacetalk, TickTalk, Gabb, Bark) are used with permission, granted 2026-10-01; see `image-credits.csv`.

**grab_images.py** and **urls.txt** are the image collection tools. The URL list now only has the pages still missing: Garmin and the Samsung newsroom page for the Bark Watch.

## News

The "Latest from the ZPC news tracker" box shows Kids & families stories from the main site's `news.json`, which the site's GitHub Action builds daily from RSS feeds. The family plan saves to the viewer's own browser.

This guide is part of the ZPC site: it uses the ZPC header, colors, and fonts (`../css/fonts.css`), and is linked from the Families page (`../#calm`).

## Still to do

- A Garmin Bounce 2 image (drawn icon for now)
- Images for Verizon Gizmo Watch 4, Xplora, Apple Watch, and Xiaotiancai (drawn icons for now)
