const browser = chrome || browser;

(async () => {
  const settings = (await browser.storage.sync.get("settings")).settings || {};
  const isActive =
    typeof settings.active !== "undefined" ? settings.active : true;
  const pattern =
    /\/assets\/(ethereum|arbitrum|binance|polygon|optimism|linea|base)\/(0x[a-fA-F0-9]+)\/\d+/;
  const config = {
    active: isActive,
    current: { button: null },
    button: {
      style: [
        "display: flex",
        "align-items: center",
        "gap: 5px",
        "margin: 8px",
        "right: 0px",
        "height: 30px",
        "padding: 5px 7px 5px 5px",
        "color: rgb(0,0,0)",
        "background: rgb(230, 250, 54)",
        "position: absolute",
        "z-index: 8675309",
        "cursor: pointer",
        "border-radius: 15px",
        `font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"`,
        "font-weight: 500",
        "opacity: 0",
        "transition: opacity 0.2s ease-in-out 0.015s",
      ],
    },
  };

  function validateLink(link) {
    const matches = link.match(pattern);
    if (matches) return true;

    return null;
  }

  function makeSaveButton() {
    const el = document.createElement("a");
    el.innerHTML = `
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1718 1718"
      height="24"
    >
      <path d="M1708.45,730.66l-.17-1.1-4.75,.17s-.1,1.44-.13,1.58l-1.58,.07c-2.07,26.66-6.43,51.99-12.96,75.25-16.01,57.28-42.84,115.14-75.52,162.93-36.15,52.91-78.24,92.12-121.74,113.39-27.14,13.3-54.05,23.05-79.95,29-20.1,4.53-39.93,6.8-58.86,6.8-65.63,0-125.76-27.62-173.93-79.85-74.46-80.78-117.58-219.63-107.31-345.56,3.57-44.05,10.62-85.04,17.42-124.66,14.47-84.11,26.94-156.75,3.61-232.69-12.51-40.68-38.93-72.22-74.46-88.86-24.19-11.34-49.44-17.08-75.11-17.08-82.5,0-150.57,58.1-183.76,107.86-50.68,75.97-75.94,171.63-69.23,262.41,6.25,84.97,35.7,140.98,79.89,216.81,22.16,38,45.25,71.57,65.66,101.22,34.5,50.17,64.29,93.5,78.99,141.02,20.38,65.87,6.22,97.55-.83,108.13-8.69,13.06-22.64,20.58-41.51,22.37-2.41,.24-4.78,.34-7.08,.34-57.59,0-58.69-78.62-59.34-125.62v-1.06c-.03-3.1-.1-6.05-.14-8.87-1.96-92.05-37.32-147.06-82.12-216.74-28.11-43.71-59.96-93.22-87.93-160.67-44.74-107.75-55.97-211.69-33.36-308.9,.79-3.47,1.65-6.94,2.54-10.45,27.45-108.2,95.31-246.77,262.58-292.44,31.68-8.66,64.22-13.06,96.69-13.06,98.34,0,184,40.48,234.99,111.02,41.27,57.07,62.54,121.77,65.08,197.78,.62,18.07,.14,37.01-1.41,56.28-3.61,43.47-12.82,91.12-28.11,145.65-30.92,110.23-38.41,203.62-22.23,277.53,12.41,56.69,39.52,99.89,74.36,118.47,28.24,15.05,58.34,22.68,89.44,22.68,79.44,0,151.8-50.68,188.29-100.88,57.38-78.96,87.62-218.19,82.67-301.92-1.82-30.72-4.43-56.73-8.04-79.75l-.1-.34-.07-.17c-67.9-146.82-175.58-271.27-311.41-359.89C1188.2,48.07,1026.16,0,859,0,629.54,0,413.83,89.34,251.58,251.58,89.37,413.83,0,629.54,0,859c0,66.69,7.7,133.21,22.92,197.78l.27,1.13,4.78-.69s-.07-1.41-.1-1.51l1.58-.24c-2.95-51.13,1.68-100.36,13.43-142.39,16.01-57.24,42.85-115.14,75.52-162.93,36.15-52.88,78.24-92.12,121.74-113.39,26.94-13.2,53.7-22.92,79.51-28.9,20.27-4.6,40.27-6.91,59.37-6.91,65.63,0,125.79,27.59,173.93,79.82,74.46,80.75,117.58,219.63,107.31,345.59-3.57,44.08-10.62,85.04-17.46,124.66-14.47,84.11-26.94,156.75-3.61,232.68,12.47,40.68,38.93,72.23,74.46,88.86,24.19,11.34,49.44,17.07,75.11,17.07,82.5,0,150.57-58.1,183.76-107.89,50.68-75.97,75.93-171.63,69.23-262.4-6.25-84.94-35.7-140.98-79.89-216.82-22.09-37.9-45.22-71.54-65.63-101.22-34.5-50.17-64.29-93.49-78.99-141.05-20.38-65.87-6.22-97.55,.79-108.1,8.69-13.06,22.64-20.58,41.51-22.37,2.41-.24,4.81-.34,7.08-.34,57.59,0,58.69,78.55,59.34,125.45l.03,1.34c.03,3.06,.1,5.94,.14,8.73,1.96,92.05,37.32,147.06,82.12,216.74,28.11,43.71,59.96,93.25,87.93,160.67,43.33,104.32,55.21,205.16,35.39,299.72-.55,2.61-1.14,5.22-1.72,7.84-26.25,112.9-93.63,257.35-265.46,304.29-31.68,8.66-64.22,13.02-96.69,13.05-98.34,0-184-40.47-234.99-111.01-41.27-57.07-62.53-121.77-65.08-197.78-.38-11.03-.34-22.44,.07-33.84,1.99-49.48,11.65-104.46,29.48-168.09,30.92-110.23,38.42-203.62,22.23-277.53-12.4-56.73-39.51-99.89-74.35-118.47-28.24-15.05-58.31-22.68-89.44-22.68-79.41,0-151.8,50.68-188.29,100.88-57.38,78.96-87.62,218.19-82.67,301.92,3.06,52.02,8.35,90.27,17.21,124.18l.1,.28,.07,.13c150.08,279.21,440.19,452.73,756.95,452.73,229.46,0,445.17-89.34,607.42-251.58,162.24-162.25,251.58-377.96,251.58-607.42,0-42.88-3.2-86.07-9.55-128.34Z"></path>
      </svg>
      <span>Buy</span>
  `;
    el.setAttribute("class", "squid-extension-buy-button");
    el.setAttribute("href", "https://checkout.squidrouter.com");
    el.setAttribute("style", config.button.style.join(" !important;"));
    setTimeout(() => (el.style.opacity = 1), 100);
    return el;
  }

  function extractParamsFromURL(url) {
    const pattern = /\/assets\/(\w+)\/(\w+)\/(\d+)/;
    const matches = url.match(pattern);

    if (matches) {
      const chainName = matches[1];
      const contract = matches[2];
      const tokenId = matches[3];

      return { chainName, contract, tokenId };
    }

    return null;
  }

  function over(e) {
    if (!isActive || config.current.button) return;
    const el = e.target;
    const link = el.closest("a");
    const button = el
      .closest("article")
      .querySelector("[data-testid=ItemCardPrice]");
    if (!link || !button) return;
    const validatedLink = validateLink(link.href);
    if (!validatedLink) return;
    const params = extractParamsFromURL(link.href);

    document
      .querySelectorAll(".squid-extension-buy-button")
      .forEach((el) => el.remove());

    const saveButton = makeSaveButton();
    link.appendChild(saveButton);
    config.current.button = saveButton;

    saveButton.addEventListener("click", (e) => {
      e.preventDefault();
      window
        .open(
          `https://checkout.squidrouter.com/collection/${params.chainName}/${params.contract}/${params.tokenId}`,
          "_blank"
        )
        .focus();
    });

    link.addEventListener("mouseleave", (e) => {
      config.current.button = null;
      saveButton.style.opacity = 0;
      setTimeout(() => saveButton.remove(), 200);
    });
  }

  document.body.addEventListener("mouseover", over);
})();
