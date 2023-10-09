import { apiInitializer } from "discourse/lib/api";
import Session from "discourse/models/session";
import { h } from "virtual-dom";
import { iconNode } from "discourse-common/lib/icon-library";

export default apiInitializer("0.8", (api) => {
  document.body.classList.add("full-width-enabled");

  api.reopenWidget("home-logo", {
    logo() {
      const { siteSettings } = this,
        mobileView = this.site.mobileView;

      const darkModeOptions = Session.currentProp("darkModeAvailable")
        ? { dark: true }
        : {};

      const mobileLogoUrl = this.mobileLogoUrl(),
        mobileLogoUrlDark = this.mobileLogoUrl(darkModeOptions);

      const showMobileLogo = mobileView && mobileLogoUrl.length > 0;

      const logoUrl = this.logoUrl(),
        logoUrlDark = this.logoUrl(darkModeOptions);
      const title = siteSettings.title;

      if (this.attrs.minimized && !this.attrs.showSidebar) {
        const logoSmallUrl = this.smallLogoUrl(),
          logoSmallUrlDark = this.smallLogoUrl(darkModeOptions);
        if (logoSmallUrl.length) {
          return this.logoElement(
            "logo-small",
            logoSmallUrl,
            title,
            logoSmallUrlDark
          );
        } else {
          return iconNode("home");
        }
      } else if (showMobileLogo) {
        return this.logoElement(
          "logo-mobile",
          mobileLogoUrl,
          title,
          mobileLogoUrlDark
        );
      } else if (logoUrl.length) {
        return this.logoElement("logo-big", logoUrl, title, logoUrlDark);
      } else {
        return h("h1#site-text-logo.text-logo", { key: "logo-text" }, title);
      }
    },
  });
});
