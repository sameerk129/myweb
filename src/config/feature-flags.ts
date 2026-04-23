export type FeatureFlags = {
  /**
   * Shows a low-opacity collage of org logos behind the hero content.
   */
  heroLogoScatterBackground: boolean;
  /**
   * Toggles the contact form card in the Contact section.
   */
  showContactForm: boolean;
  /**
   * Hides text labels in the mobile bottom navigation (icons only).
   */
  mobileBottomNavHideLabels: boolean;
};

export const featureFlags: FeatureFlags = {
  heroLogoScatterBackground: false,
  showContactForm: false,
  mobileBottomNavHideLabels: false,
};
