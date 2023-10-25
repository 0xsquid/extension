import "./style.css";

const browser = chrome || browser;
const { settings } = await browser.storage.sync.get("settings");
const isActive =
  typeof settings.active !== "undefined" ? settings.active : true;

const toggleEl = document.querySelector("#toggle");

if (isActive) toggleEl.checked = 1;

toggleEl.addEventListener("change", (e) => {
  const el = e.target;
  if (el.checked) {
    browser.storage.sync.set({ settings: { active: true } });
  } else {
    browser.storage.sync.set({ settings: { active: false } });
  }
});

document.querySelector("#new-tab").addEventListener("click", () => {
  chrome.tabs.create({ url: "index.html?newTab=1" });
});
