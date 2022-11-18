import { apiInitializer } from "discourse/lib/api";
import hbs from "discourse/widgets/hbs-compiler";

export default apiInitializer("0.8", (api) => {
  api.reopenWidget("header-contents", {
    tagName: "div.contents",
    template: hbs`
      <div class="header-contents__toggle-and-logo">
        {{#if this.site.desktopView}}
          {{#if this.siteSettings.enable_experimental_sidebar_hamburger}}
            {{#if attrs.sidebarEnabled}}
              {{sidebar-toggle attrs=attrs}}
            {{/if}}
          {{/if}}
        {{/if}}
        {{home-logo attrs=attrs}}
      </div>
      {{#if attrs.topic}}
        {{header-topic-info attrs=attrs}}
      {{/if}}
      
      <div class="panel clearfix" role="navigation">{{yield}}</div>
    `,
  });
});
