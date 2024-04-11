import Component from "@glimmer/component";
import HomeLogo from "discourse/components/header/home-logo";
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  document.body.classList.add("full-width-enabled");

  // When the sidebar is visible, force the HomeLogo to be in an 'un-minimized' state.
  // Importing and using the HomeLogo component here isn't ideal... it's not really public API.
  // But, it is certainly better than monkey-patching inside the component.
  api.renderInOutlet(
    "home-logo",
    class FullWidthHomeLogo extends Component {
      get forceMinimizedFalse() {
        return (
          this.args.outletArgs.minimized &&
          api.container.lookup("controller:application").get("showSidebar")
        );
      }

      <template>
        {{#if this.forceMinimizedFalse}}
          <HomeLogo @minimized={{false}} />
        {{else}}
          {{yield}}
        {{/if}}
      </template>
    }
  );
});
