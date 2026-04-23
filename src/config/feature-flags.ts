export type FeatureFlags = {
  /**
   * Shows a low-opacity collage of org logos behind the hero content.
   */
  heroLogoScatterBackground: boolean;
};

export const featureFlags: FeatureFlags = {
  heroLogoScatterBackground: true,
};
