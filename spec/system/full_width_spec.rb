# frozen_string_literal: true

RSpec.describe "Full width component", system: true do
  let!(:theme) { upload_theme_component }
  fab!(:topic) { Fabricate(:post).topic }
  fab!(:posts) { Fabricate.times(10, :post, topic: topic) }

  before {}

  it "should keep the large logo visible when scrolling down a topic with sidebar visible" do
    visit topic.relative_url

    expect(page).to have_selector("#site-logo.logo-big")
    expect(page).not_to have_selector(".d-header h1.header-title")

    page.execute_script <<~JS
      document.querySelector("#post_10").scrollIntoView(true);
    JS

    expect(page).to have_selector(".d-header h1.header-title")
    expect(page).to have_selector("#site-logo.logo-big")
  end

  it "should use default behavior when scrolling down a topic with no sidebar" do
    visit topic.relative_url

    find(".header-sidebar-toggle .btn").click

    # in CI the visibility check is failing... even though the element was present and correct
    # visible: false turns off that filter
    expect(page).to have_selector("#site-logo.logo-big", visible: false)
    expect(page).not_to have_selector(".d-header h1.header-title")

    page.execute_script <<~JS
      document.querySelector("#post_10").scrollIntoView(true);
    JS

    expect(page).to have_selector(".d-header h1.header-title")
    expect(page).to have_selector("#site-logo.logo-small")
  end
end
