---
title: Don't send your own email
tags: ["email", "everything-is-broken"]
cover: mailboxes.jpg
author: baobab koodaa
---

Refresh to see weird bug.

<re-img src="mailboxes.jpg" title="Photo by Mathyas Kurmann on Unsplash"></re-img>

Upper image is `<Picture fluid={fluid}>`. Lower image is `<img src={fluid.tracedSVG}>`.
Clearly the tracedSVG is generated correctly. What causes `<Picture>` to behave like this (upper image)?
