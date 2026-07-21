export interface ResponsiveImageAsset {
  src: string;
  srcSet: string;
  avifSrc: string;
  avifSrcSet: string;
  width: number;
  height: number;
}

function responsiveImage(base: string): ResponsiveImageAsset {
  return {
    src: `${base}.webp`,
    srcSet: `${base}-960.webp 960w, ${base}.webp 1672w`,
    avifSrc: `${base}.avif`,
    avifSrcSet: `${base}-960.avif 960w, ${base}.avif 1672w`,
    width: 1672,
    height: 941,
  };
}

function serviceImage(name: string): ResponsiveImageAsset {
  return responsiveImage(`/images/services/${name}-v2`);
}

export const serviceImages = {
  flatbed: serviceImage('flatbed'),
  openDeck: serviceImage('open-deck'),
  stepDeck: serviceImage('step-deck'),
} as const;

export const heroImages = {
  contact: responsiveImage('/images/heroes/contact-operations-v1'),
  driverApplication: responsiveImage('/images/heroes/driver-application-v1'),
} as const;
