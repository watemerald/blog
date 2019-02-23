---
title: Misaligned image placeholder
tags: ["bug"]
cover: mailboxes.jpg
author: baobab koodaa
---

This page demoes a placeholder-cropping-bug in gatsby-image.

<re-image src="mailboxes.jpg" fluid=2 opacity=0 title="Photo by Mathyas Kurmann on Unsplash"></re-image>

<re-image src="mailboxes.jpg" fluid=1 opacity=0 title="Photo by Mathyas Kurmann on Unsplash"></re-image>

The first image is cropped and the placeholder is cropped incorrectly; it doesn't align.
The second image is not cropped, and shows how the tracedSVG placeholder is supposed to align.
In order to see this clearly you probably have to smash hard refresh (ctrl+shift+r) many times in a row.
Sorry about that - I tried to make the transition longer, but was unable to do so. Keep smashing hard refresh
and point your eyes on the alignment of the placeholder in the first picture.

This is the GraphQL for the first image:

```javascript
childImageSharp {
    fluid(maxWidth: 800, maxHeight: 360, quality: 90, traceSVG: { color: "#f9ebd2" }) {
        originalImg
        tracedSVG
        src
        srcSet
        aspectRatio
        srcSetWebp
        sizes
    }
    ...
```

GraphQL for the second image is otherwise the same, except there is no "maxHeight", so it's not cropped.
This shows that the misalignment of the placeholder is caused by cropping.

Even though the cropping of the actual image is done by image-sharp, it looks like `fluid.tracedSVG` is _not_ cropped by image-sharp,
but is instead cropped by gatsby-image when it's generating the `<picture>`. In order to demonstrate this, below is 2 images on
top of each other: `fluid.tracedSVG`, which is always visible, and a `<Picture fluid={fluid}>` which goes to opacity 0 when you hover
over it. You can see that the underlying tracedSVG is the original size, even though it is supposedly cropped. So it looks like the cropping of the placeholder is done inside gatsby-image instead.

<re-image src="mailboxes.jpg" fluid=2 opacity=1 title="Photo by Mathyas Kurmann on Unsplash"></re-image>

If you look at the source of this page, it's pretty ugly (mostly to create that hover effect), but all you really need to demonstrate
this bug is the GraphQL above and a `<Picture fluid={fluid} />`.

