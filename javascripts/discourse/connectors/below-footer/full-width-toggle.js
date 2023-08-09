import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class FullWidthToggle extends Component {
  @service currentUser;
  @service keyValueStore;
  @service site;
  @service appEvents;

  @tracked fullWidthEnabled = this.keyValueStore.getItem("fullWidthEnabled") === "true";

  get shouldRender() {
    if (this.site.desktopView) {
      return true;
    }
  }

  @action
  removeClasses() {
    document.body.classList.remove("full-width-enabled");
  }

  @action
  toggleClasses() {
    if (this.fullWidthEnabled) {
      document.body.classList.add("full-width-enabled");
    } else {
      document.body.classList.remove("full-width-enabled");
    }
  }

  @action
  toggleFullWidth() {
    let currentValue = this.fullWidthEnabled;
    this.keyValueStore.setItem("fullWidthEnabled", `${!currentValue}`);
    this.fullWidthEnabled = !currentValue;
    this.toggleClasses();
    this.appEvents.trigger("site-header:force-refresh");
    console.log('sent appEvents.trigger("site-header:force-refresh")');
  }
}
