# Who can reach your kid? Project files

**index.html** is the complete site. Keep it next to the **images/** folder, which it loads its photos from, and open it in any browser.

**kids-devices-snapshot.pdf** is a printable snapshot of the core views (map, plan, tech radar, learn, devices and news, guide, essay) using a sample family.

**images/** holds the photos the page uses, compressed for the web.

**image-credits.csv** lists every photo, where it appears, where it came from, and its rights status.

> Unsplash photos are free to use under the Unsplash License, credited to each photographer. Press page images are published by the company for media use. Anything marked "Permission pending" needs the brand's OK before the site is shared publicly.

**grab_images.py** and **urls.txt** are the image collection tools. The URL list now only has the pages still missing: Garmin and the Samsung newsroom page for the Bark Watch.

## News

The "Latest from the ZPC news tracker" box shows Kids & families stories from the main site's `news.json`, which the site's GitHub Action builds daily from RSS feeds. The family plan saves to the viewer's own browser.

This guide is part of the ZPC site: it uses the ZPC header, colors, and fonts (`../css/fonts.css`), and is linked from the Families page (`../#calm`).

## Still to do

- A Garmin Bounce 2 image (drawn icon for now)
- Permission from Spacetalk, TickTalk, Gabb, and Bark for their photos
- Images for Verizon Gizmo Watch 4, Xplora, Apple Watch, and Xiaotiancai (drawn icons for now)
