import Component from "@glimmer/component";
import HomeLogo from "discourse/components/header/home-logo";
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  document.body.classList.add("full-width-enabled");

  // When the sidebar is visible, force the HomeLogo to be in an 'un-minimized' state.
  const transformerExists = api.registerValueTransformer?.(
    "home-logo-minimized",
    ({ value, context }) => {
      if (value && context.showSidebar) {
        return false;
      }
      return value;
    }
  );

  if (transformerExists) {
    return;
  }

  // Remove this fallback once the `home-logo-minimized` transformer is in
  // stable
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
