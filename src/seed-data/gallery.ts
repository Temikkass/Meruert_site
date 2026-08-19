/**
 * config/gallery.ts
 * ----------------------------------------------------------------------------
 * A flat, tagged array rather than two separate arrays (financialGallery /
 * travelGallery). Components filter by `project` at render time — the
 * homepage gallery section shows `project === "shared"`, each project page
 * shows its own images plus "shared" ones. One array, filtered per context,
 * is easier for a non-technical client to scan and reorder than three
 * separate lists that must stay conceptually aligned.
 */

import type { GalleryImage } from "@/types";

export const gallery: GalleryImage[] = [
  // Replace with real photos. Place files in /public/images/gallery.
  {
    id: "gallery-01",
    image: {
      src: "/images/gallery/placeholder-01.jpg",
      alt: "Replace with a real caption-worthy description",
      width: 1600,
      height: 2000,
    },
    project: "shared",
  },
  {
    id: "gallery-02",
    image: {
      src: "/images/gallery/placeholder-02.jpg",
      alt: "Replace with a real caption-worthy description",
      width: 1600,
      height: 1067,
    },
    project: "financial",
  },
  {
    id: "gallery-03",
    image: {
      src: "/images/gallery/placeholder-03.jpg",
      alt: "Replace with a real caption-worthy description",
      width: 1600,
      height: 1067,
    },
    project: "travel",
  },
];
