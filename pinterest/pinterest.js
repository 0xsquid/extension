(function () {
  "use strict";

  // globals
  const global = {
    debug: false,
    lang: "en",
    domain: "www",
    hazButton: false,
    nopin: false,
    observer: {},
    meta: {},
    lastWheel: 0,
  };

  // immutable settings, available globally
  const config = {
    me: "logic",
    version: 2021010101,
    hoverBoardPicker: {
      minImageSize: 250,
    },
    digits: "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz",
    overlay: {
      style: [
        // prevent our iframe from inheriting any global iframe background styling
        "background: transparent",
        "border: none",
        // dark mode switches color schemes and may change out the meaning of "transparent"
        "color-scheme: none",
        "display: block",
        "position: fixed",
        "height: 100%",
        "width: 100%",
        "top: 0",
        "right: 0",
        "bottom: 0",
        "left: 0",
        "margin: 0",
        "clip: auto",
        "opacity: 1",
        "padding: 0",
        "z-index: 9223372036854775807",
      ],
    },
    search: {
      style: [
        "width: 24px",
        "height: 24px",
        "background: rgba(0,0,0,.4) url(data:image/svg+xml;base64,PHN2ZyBpZD0ic291cmNlIiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMTEiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuOCI+PC9jaXJjbGU+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUuMDgzNCA0LjU4MzMzSDEzLjMzMzRWNS43NDk5OUgxNS4wODM0QzE1LjcyNjggNS43NDk5OSAxNi4yNSA2LjI3MzI0IDE2LjI1IDYuOTE2NjZWOC42NjY2NkgxNy40MTY3VjYuOTE2NjZDMTcuNDE2NyA1LjYyOTgzIDE2LjM3MDIgNC41ODMzMyAxNS4wODM0IDQuNTgzMzNaTTE2LjI1IDE1LjA4MzNDMTYuMjUgMTUuNzI2NyAxNS43MjY4IDE2LjI1IDE1LjA4MzQgMTYuMjVIMTMuMzMzNFYxNy40MTY3SDE1LjA4MzRDMTYuMzcwMiAxNy40MTY3IDE3LjQxNjcgMTYuMzcwMiAxNy40MTY3IDE1LjA4MzNWMTMuMzMzM0gxNi4yNVYxNS4wODMzWk01Ljc1MDA0IDE1LjA4MzNWMTMuMzMzM0g0LjU4MzM3VjE1LjA4MzNDNC41ODMzNyAxNi4zNzAyIDUuNjI5ODcgMTcuNDE2NyA2LjkxNjcxIDE3LjQxNjdIOC42NjY3MVYxNi4yNUg2LjkxNjcxQzYuMjczMjkgMTYuMjUgNS43NTAwNCAxNS43MjY3IDUuNzUwMDQgMTUuMDgzM1pNNS43NTAwNCA2LjkxNjY2QzUuNzUwMDQgNi4yNzMyNCA2LjI3MzI5IDUuNzQ5OTkgNi45MTY3MSA1Ljc0OTk5SDguNjY2NzFWNC41ODMzM0g2LjkxNjcxQzUuNjI5ODcgNC41ODMzMyA0LjU4MzM3IDUuNjI5ODMgNC41ODMzNyA2LjkxNjY2VjguNjY2NjZINS43NTAwNFY2LjkxNjY2Wk05LjI1MDA0IDEwLjcwODNDOS4yNTAwNCA5LjkwNDQ5IDkuOTA0NTQgOS4yNDk5OSAxMC43MDg0IDkuMjQ5OTlDMTEuNTEyMiA5LjI0OTk5IDEyLjE2NjcgOS45MDQ0OSAxMi4xNjY3IDEwLjcwODNDMTIuMTY2NyAxMS41MTIyIDExLjUxMjIgMTIuMTY2NyAxMC43MDg0IDEyLjE2NjdDOS45MDQ1NCAxMi4xNjY3IDkuMjUwMDQgMTEuNTEyMiA5LjI1MDA0IDEwLjcwODNaTTEzLjYyNSAxNC41QzEzLjg0OSAxNC41IDE0LjA3MyAxNC40MTQ4IDE0LjI0NCAxNC4yNDM5QzE0LjU4NTIgMTMuOTAyMSAxNC41ODUyIDEzLjM0NzkgMTQuMjQ0IDEzLjAwNjFMMTMuMDcwMyAxMS44MzNDMTMuMjM0MiAxMS40OTA2IDEzLjMzMzQgMTEuMTEyNiAxMy4zMzM0IDEwLjcwODNDMTMuMzMzNCA5LjI2MTA4IDEyLjE1NTYgOC4wODMzMyAxMC43MDg0IDguMDgzMzNDOS4yNjExMiA4LjA4MzMzIDguMDgzMzcgOS4yNjEwOCA4LjA4MzM3IDEwLjcwODNDOC4wODMzNyAxMi4xNTU2IDkuMjYxMTIgMTMuMzMzMyAxMC43MDg0IDEzLjMzMzNDMTEuMTEyNiAxMy4zMzMzIDExLjQ5MDYgMTMuMjM0MiAxMS44MzMgMTMuMDcwMkwxMy4wMDYxIDE0LjI0MzlDMTMuMTc3IDE0LjQxNDggMTMuNDAxIDE0LjUgMTMuNjI1IDE0LjVaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPgo8L3N2Zz4=) 50% 50% no-repeat",
        "background-size: 24px 24px",
        "position: absolute",
        "opacity: 1",
        "z-index: 8675309",
        "display: none",
        "cursor: pointer",
        "border: none",
        "border-radius: 12px",
      ],
    },
    save: {
      domain: {
        www: true,
        uk: true,
        br: true,
        jp: true,
        fr: true,
        es: true,
        pl: true,
        de: true,
        ru: true,
        it: true,
        au: true,
        nl: true,
        tr: true,
        id: true,
        hu: true,
        pt: true,
        se: true,
        cz: true,
        gr: true,
        kr: true,
        ro: true,
        dk: true,
        sk: true,
        fi: true,
        in: true,
        no: true,
        za: true,
        nz: true,
      },
      lookup: {
        // alt location: cs
        cs: {
          d: "cz",
        },
        // alt location: dk
        da: {
          d: "dk",
        },
        // default de / de-de; alt de-at
        de: {
          alt: {
            // Austria
            at: "de",
          },
        },
        // alt locale: gr; Greece also gets requests for el-cy
        el: {
          d: "gr",
          alt: {
            // Cyprus
            cy: "gr",
          },
        },
        // English has many alt domains
        en: {
          alt: {
            // Australia
            au: "au",
            // Great Britain
            gb: "uk",
            // Ireland
            ie: "uk",
            // India
            in: "in",
            // New Zealand
            nz: "nz",
            // United Kingdom
            uk: "uk",
            // South Africa
            za: "za",
          },
        },
        // Spanish also has many alt domains
        es: {
          alt: {
            // Latin America
            419: "www",
            // Argentina
            ar: "www",
            // Chile
            cl: "www",
            // Columbia
            co: "www",
            // Latin America
            la: "www",
            // Mexico
            mx: "www",
            // Peru
            pe: "www",
            // USA
            us: "www",
            // Uruguay
            uy: "www",
            // Venezuela
            ve: "www",
            // Latin America
            xl: "www",
          },
        },
        // Finnish: fi and fi-fi work; all others go to lang-domain
        fi: true,
        // French: auto-default to France, but do the right things for Belgium and Canada
        fr: {
          alt: {
            be: "fr",
            ca: "www",
          },
        },
        // Hindu: redirect to India (so does en-in)
        hi: {
          d: "in",
        },
        hu: true,
        id: true,
        it: true,
        ja: {
          d: "jp",
        },
        ko: {
          d: "kr",
        },
        // Malaysian: send to WWW
        ms: {
          d: "www",
        },
        nl: {
          alt: {
            be: "nl",
          },
        },
        nb: {
          d: "no",
        },
        pl: true,
        pt: {
          alt: {
            // Brazil
            br: {
              d: "br",
              s: "pt-br",
            },
          },
        },
        ro: true,
        ru: true,
        sk: true,
        sv: {
          d: "se",
        },
        tl: {
          d: "www",
        },
        th: {
          d: "www",
        },
        tr: {
          alt: {
            // Cyprus
            cy: "tr",
          },
        },
        uk: true,
        vi: true,
      },
      style: {
        lego: [
          "border-radius: 10px",
          "text-indent: 12px",
          "width: auto",
          "height: 20px",
          "line-height: 24px",
          "padding: 0 8px",
          "text-align: center",
          "vertical-align: middle",
          'font: 11px/20px "Helvetica Neue", Helvetica, sans-serif',
          "font-weight: bolder",
          "color: #fff",
          "background: #e60023 url(data:image/svg+xml;base64,PHN2ZyBpZD0ic291cmNlIiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjYiIGZpbGw9IiNFNjAwMjMiPjwvY2lyY2xlPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNkMwIDguNTYxNSAxLjYwNTUgMTAuNzQ4NSAzLjg2NSAxMS42MDlDMy44MSAxMS4xNDA1IDMuNzUxNSAxMC4zNjggMy44Nzc1IDkuODI2QzMuOTg2IDkuMzYgNC41NzggNi44NTcgNC41NzggNi44NTdDNC41NzggNi44NTcgNC4zOTk1IDYuNDk5NSA0LjM5OTUgNS45N0M0LjM5OTUgNS4xNCA0Ljg4MDUgNC41MiA1LjQ4IDQuNTJDNS45OSA0LjUyIDYuMjM2IDQuOTAyNSA2LjIzNiA1LjM2MUM2LjIzNiA1Ljg3MzUgNS45MDk1IDYuNjM5NSA1Ljc0MSA3LjM1QzUuNjAwNSA3Ljk0NDUgNi4wMzk1IDguNDI5NSA2LjYyNTUgOC40Mjk1QzcuNjg3IDguNDI5NSA4LjUwMzUgNy4zMSA4LjUwMzUgNS42OTRDOC41MDM1IDQuMjYzNSA3LjQ3NTUgMy4yNjQgNi4wMDggMy4yNjRDNC4zMDkgMy4yNjQgMy4zMTE1IDQuNTM4NSAzLjMxMTUgNS44NTZDMy4zMTE1IDYuMzY5NSAzLjUwOSA2LjkxOTUgMy43NTYgNy4yMTlDMy44MDQ1IDcuMjc4NSAzLjgxMiA3LjMzIDMuNzk3NSA3LjM5MDVDMy43NTIgNy41Nzk1IDMuNjUxIDcuOTg1IDMuNjMxNSA4LjA2OEMzLjYwNSA4LjE3NyAzLjU0NSA4LjIwMDUgMy40MzE1IDguMTQ3NUMyLjY4NTUgNy44MDA1IDIuMjE5NSA2LjcxIDIuMjE5NSA1LjgzNEMyLjIxOTUgMy45NDk1IDMuNTg4IDIuMjE5NSA2LjE2NTUgMi4yMTk1QzguMjM3NSAyLjIxOTUgOS44NDggMy42OTYgOS44NDggNS42NjlDOS44NDggNy43Mjc1IDguNTUwNSA5LjM4NDUgNi43NDg1IDkuMzg0NUM2LjE0MyA5LjM4NDUgNS41NzQ1IDkuMDY5NSA1LjM3OTUgOC42OThDNS4zNzk1IDguNjk4IDUuMDggOS44MzkgNS4wMDc1IDEwLjExOEM0Ljg2NjUgMTAuNjYgNC40NzU1IDExLjM0NiA0LjIzMyAxMS43MzU1QzQuNzkyIDExLjkwNzUgNS4zODUgMTIgNiAxMkM5LjMxMzUgMTIgMTIgOS4zMTM1IDEyIDZDMTIgMi42ODY1IDkuMzEzNSAwIDYgMEMyLjY4NjUgMCAwIDIuNjg2NSAwIDZaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPgo8L3N2Zz4=) 4px 50% no-repeat",
          "background-size: 12px 12px",
          // extra rules for extensions only
          "position: absolute",
          "opacity: 1",
          "z-index: 8675309",
          "display: none",
          "cursor: pointer",
          "border: none",
          "font-weight: bold",
          "-webkit-font-smoothing: antialiased",
          "-moz-osx-font-smoothing: grayscale",
        ],
      },
      offset: {
        top: 10,
        left: 10,
        right: 32,
      },
    },
    // metas to observe
    seek: { nopin: 1, nohover: 1, nosearch: 1 },
    // don't do stuff on these domains
    nopeList: [
      /^https?:\/\/(.*?\.|)craigslist\.org\//,
      /^https?:\/\/(.*?\.|)chase\.com\//,
      /^https?:\/\/(.*?\.|)facebook\.com\//,
      /^https?:\/\/mail\.aol\.com\//,
      /^https?:\/\/(.*?\.|)atmail\.com\//,
      /^https?:\/\/(.*?\.|)contactoffice\.com\//,
      /^https?:\/\/(.*?\.|)fastmail\.fm\//,
      /^https?:\/\/(.*?\.|)webmail\.gandi\.net\//,
      /^https?:\/\/accounts\.google\.com\//,
      /^https?:\/\/myaccount\.google\.com\//,
      /^https?:\/\/mail\.google\.com\//,
      /^https?:\/\/docs\.google\.com\//,
      /^https?:\/\/gmx\.com\//,
      /^https?:\/\/(.*?\.|)hushmail\.com\//,
      /^https?:\/\/(.*?\.|)laposte\.fr\//,
      /^https?:\/\/mail\.lycos\.com\//,
      /^https?:\/\/(.*?\.|)mail\.com\//,
      /^https?:\/\/(.*?\.|)mail\.ru\//,
      /^https?:\/\/(.*?\.|)opolis\.eu\//,
      /^https?:\/\/(.*?\.|)outlook\.com\//,
      /^https?:\/\/(.*?\.|)nokiamail\.com\//,
      /^https?:\/\/apps\.rackspace\.com\//,
      /^https?:\/\/mail\.rediff\.com\//,
      /^https?:\/\/(.*?\.|)runbox\.com\//,
      /^https?:\/\/mail\.sify\.com\//,
      /^https?:\/\/webmail\.thexyz\.com\//,
      /^https?:\/\/login\.yahoo\.com\//,
      /^https?:\/\/mail\.yahoo\.com\//,
      /^https?:\/\/mail\.yandex\.com\//,
    ],
    // don't hover on domains matching these
    noHoverList: [
      /^https?:\/\/ramandel\.com\//,
      /^https?:\/\/www\.google\.com\/$/,
      /^https?:\/\/www\.google\.com\/_/,
    ],
  };

  // check for Chrome first, then "browser," which is the Web standards version
  const browser = chrome || browser;

  // space for HTML structure (buttons and iframe overlays)
  const structure = {};

  /*
    load contents of localStorage, promote correct messages, and then run a callback like init
  */

  function getLocalValues(callback) {
    browser.storage.local.get(null, (me) => {
      // anything in local storage under a key we specified is now available in global
      for (let i in me) {
        global[i] = me[i];
      }
      // run callback if specified
      if (typeof callback === "function") {
        callback();
      }
    });
  }

  /*
    log a message to console if global.debug is set
    message: anything you want to log
    level: [bool] or [number]
  */

  function debug(message, level = 0) {
    // do we have a message?
    if (message) {
      // is global.debug truthy?
      if (global.debug) {
        // are we filtering our debug messages?
        if (typeof global.debug === "number") {
          // debug is some number greater than zero, so:
          // is our level greater than or equal to the debug number?
          if (level >= global.debug) {
            console.log(message);
          }
        } else {
          // any other truthy value? log everything
          console.log(message);
        }
      }
    }
  }

  /*
    return true if we can show an overlay
  */

  // overlays should only show on top level window OR in iframes that are the same size as window.top
  function checkInjectOverlay() {
    let canInject = false;
    // are we in the top frame?
    if (window.self === window.top) {
      // we're good
      canInject = true;
    } else {
      // can we run inside this iframe?
      debug("We are inside an iframe.");
      // this is in a try/catch block because looking at the parent window's size may trigger a cross-origin frame access warning
      try {
        if (
          window.top.innerHeight === window.self.innerHeight &&
          window.top.innerWidth === window.self.innerWidth
        ) {
          debug(
            "This iframe is the same size as the top window; allowing the extension to run."
          );
          // are we on Naver or Daum?
          if (
            window.top.location.href.match(/^https?:\/\/blog\.naver\.com\//) ||
            window.top.location.href.match(/^https?:\/\/blog\.daum\.net\//)
          ) {
            canInject = true;
          }
        } else {
          debug(
            "This frame's dimensions: " +
              window.self.innerHeight +
              "x" +
              window.self.innerWidth
          );
          debug(
            "Top window dimensions: " +
              window.top.innerHeight +
              "x" +
              window.top.innerWidth
          );
        }
      } catch (err) {
        debug(
          "This error message was caught so it doesn't clutter up console.log."
        );
        debug(err);
      }
    }
    return canInject;
  }

  /*
    send a message
    {
      to: [a process name, like grid or create]
      act: [a function in the act object of the receiving process],
      data: [an object]
    }
    // TODO: fix this up so we're all using me.from or me.via
  */

  function send(me) {
    // set via to my config.me: grid, save, create, search, etc.
    me.via = config.me;
    me.from = config.me;
    if (!me.to) {
      me.to = "background";
    }
    debug("Sending message");
    debug(JSON.stringify(me));
    browser.runtime.sendMessage(me);
  }

  /*
    runs on tab change so we do this every time
    set global.nopin
    return nopin
  */

  function refreshContext() {
    // in case we switch between tabs we need to check this again
    if (!checkInjectOverlay()) {
      global.nopin = true;
    }
    send({
      to: "background",
      act: "refreshContextMenus",
      data: {
        nopin: global.nopin,
      },
    });
  }

  /*
    set a DOM property or data attribute:
    {
      el: [an element],
      att: [an attribute],
      string: [a string]
    }
  */

  function set(me) {
    if (typeof me.el[me.att] === "string") {
      // natural DOM attribute
      me.el[me.att] = me.string;
    } else {
      // data attribute
      me.el.dataset[me.att] = me.string;
    }
  }

  /* 
    create a DOM element with attributes; apply styles if requested
    {
      [a tag name]: {
        [an attribute name]: [a string],
        style: {
          [a valid rule name]: [a string]
        }
      }
    }
  */

  function make(me) {
    const tagName = Object.keys(me)[0],
      instructions = me[tagName],
      el = document.createElement(tagName);
    // iterate through keys
    for (let key in instructions) {
      const value = instructions[key];
      // shall we build a text attribute?
      if (typeof value === "string") {
        // set will do the right thing for html and data attributes
        set({
          el: el,
          att: key,
          string: value,
        });
      }
      // shall we build an inline style object?
      if (typeof value === "object" && key === "style") {
        Object.assign(el.style, value);
      }
    }
    return el;
  }

  /*
    open an iframe overlay
    me: {
      id: [save, grid, create, etc],
      act: [function to run after render],
      data: [data to pass to me.act]
      callback: [callback to run after render],
    }
  */

  function openOverlay(me) {
    let path, witnessMe, writeStyles;

    debug(`Overlay Open ${me.id}`);
    // be sure there's an ID; don't open more than one copy of any overlay
    if (me.id && !structure[me.id]) {
      // save scroll position
      global.pageX = window.pageXOffset;
      global.pageY = window.pageYOffset;
      path = "/html/" + me.id + ".html";

      // id will be grid, create, save or search
      structure[me.id] = make({
        IFRAME: {
          src: browser.runtime.getURL(path),
        },
      });

      // watch our iframe for attribute changes
      witnessMe = () => {
        // set global.observer.grid for the grid, global.observer.create for create, etc.
        // IMPORTANT: observer callback function must not use arrow notation, because we need local "this" to disconnect
        global.observer[me.id] = new MutationObserver(function (obs) {
          // keep an eye on our styles
          if (
            obs[0].attributeName === "style" ||
            obs[0].attributeName === "class"
          ) {
            debug("overlay styles have changed; rewriting");
            // disconnect the current observer so we don't trigger it again when we rewrite styles
            this.disconnect();
            // rewrite the proper styles back into the iframe
            writeStyles(obs[0].target);
          }
        });
        global.observer[me.id].observe(structure[me.id], { attributes: true });
      };

      // style our iframe and make sure nobody has tried to attach a className
      writeStyles = (el) => {
        // our iframes should never have class names
        el.removeAttribute("class");
        // brute force our styles because we want !important on each item
        el.setAttribute("style", config.overlay.style.join("!important;"));
        // connect a mutation observer to watch for changes in iframe styling
        witnessMe();
      };

      // write the original style set
      writeStyles(structure[me.id]);

      // after we load, request data
      structure[me.id].onload = () => {
        // optional background thing to do after loading
        if (me.act) {
          send({ to: "background", act: me.act });
        }
        // populate the overlay with whatever we're showing
        if (me.data) {
          me.data.meta = global.meta;
          // give the overlay a chance to render before sending populate request
          window.setTimeout(function () {
            send({
              to: "background",
              act: "populate" + me.id.charAt(0).toUpperCase() + me.id.slice(1),
              data: me.data,
            });
          }, 20);
        }
        // we may have an instruction to run immediately after the overlay
        if (me.callback) {
          me.callback();
        }
        // always steal focus
        structure[me.id].focus();
      };
      // append to DOM
      document.body.appendChild(structure[me.id]);
    }
  }

  /*
    open the search overlay
    me: {
      data: [an image to search]
    }
  */

  function openSearch(me) {
    if (me.data) {
      // we'll log this in AuxData with the VIEW of VISUAL_SEARCH
      me.data.pageUrl = document.URL;
      console.log("Open Search tracker");
      openOverlay({
        id: "save",
        data: me.data,
        callback: () => {
          // give search UI a chance to render before sending back the initial image we're going to search
          window.setTimeout(() => {
            send({
              to: "background",
              act: "populateSearch",
              data: me.data,
              tabId: me.tabId,
            });
            // important: this timeout must be greater than the timeout in openOverlay
          }, 40);
        },
      });
    }
  }

  /*
    should this image show a hoverbutton?
    me: {
      img: [an IMG tag]
    }
    TODO:
      Post pinning-without-crawling we can save data URIs if we are logged in; maybe fix this?
      Simplify hover logic to match what we have on the Save overlay, which is: images must be 200px wide to show?
  */

  function checkImage(me) {
    // all images can have hoverbuttons until one of our functions says otherwise
    let blockButton = false;
    // if any of these functions return true, the image should not show a hoverbutton
    [
      // be sure we have an image
      () => {
        if (!me.img) {
          return true;
        }
      },
      // be sure our image has a source
      () => {
        if (!me.img.currentSrc) {
          return true;
        }
      },
      // be sure our current source came from a server so we can verify - see TODO above
      () => {
        if (
          !me.img.currentSrc.match(/^http/) &&
          !me.img.currentSrc.match(/^data/)
        ) {
          return true;
        }
      },
      // be sure the displayed height AND width are both greater than 90px
      () => {
        if (me.img.naturalHeight < 90 || me.img.naturalWidth < 90) {
          return true;
        }
      },
      // if natural size is at least 90x90, check that displayed height OR width > 119
      () => {
        if (me.img.naturalHeight > 119 || me.img.naturalWidth > 119) {
          return false;
        } else {
          return true;
        }
      },
      // some images are resized using img.height and img.width; don't hover over these if the actual source sizes are too small
      () => {
        if (me.img.height < 90 || me.img.width < 90) {
          return true;
        }
      },
      // if we're at least 90x90, check that height OR width > 119
      () => {
        if (me.img.height > 119 || me.img.width > 119) {
          return false;
        } else {
          return true;
        }
      },
      // don't offer to save images that are more than 3x wider than they are tall
      () => {
        if (me.img.naturalHeight < me.img.naturalWidth / 3) {
          return true;
        }
      },
      // don't offer to save if our image has nopin or data-pin-nopin
      () => {
        if (
          me.img.getAttribute("nopin") ||
          me.img.getAttribute("data-pin-nopin")
        ) {
          return true;
        }
      },
    ].filter((it) => {
      if (it(me)) {
        blockButton = true;
      }
    });
    return blockButton;
  }

  /* 
    get a DOM property or data attribute
    { 
      el: [an element],
      att: [an attribute]
    }
  */

  function get(me) {
    let found = null;
    if (typeof me.el[me.att] === "string") {
      // found a natural DOM attribute like src, height, or width
      found = me.el[me.att];
    } else {
      // found a data attribute
      found = me.el.dataset[me.att];
    }
    return found;
  }

  /*
    get image data for save or search
    img: [an IMG tag]
  */

  function getImageData(img) {
    const found = {};
    const dataPinId = get({ el: img, att: "data-pin-id" });
    found.media = get({ el: img, att: "data-pin-media" }) || img.currentSrc;
    found.description =
      get({ el: img, att: "data-pin-description" }) ||
      img.title ||
      document.title;
    // don't use document.title as the description for naked URLs
    if (found.media === document.URL) {
      found.description = "";
    }
    if (dataPinId) {
      found.id = dataPinId;
    } else {
      found.url = get({ el: img, att: "data-pin-url" }) || document.URL;
    }
    return found;
  }

  /*
    return the rectangle describing the top, left, bottom, and right positions of a DOM element
    me: {
      el: [a DOM element]
    }
  */

  function getPos(me) {
    const rect = me.el.getBoundingClientRect();
    return {
      top: Math.round(rect.top + window.scrollY),
      left: Math.round(rect.left + window.scrollX),
      bottom: Math.round(rect.bottom + window.scrollY),
      right: Math.round(rect.right + window.scrollX),
    };
  }

  /* 
    alert a warning that we can't pin
  */

  function warn(me) {
    if (!me.msg) {
      me.msg = browser.i18n.getMessage("errorPin");
    }
    window.alert(me.msg);
  }

  /*
    return the hexadecimal reprentation of an RFC4122-compliant UUID
  */

  function makeUUID() {
    return [1e7, 1e3, 4e3, 8e3, 1e11]
      .join("")
      .replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
  }

  /*
    open the thumbnail grid
  */

  function openImagePicker() {
    // Display an alert telling the user that there the user can't pin
    function warnCannotPin() {
      warn({
        msg: global.customNoPinDomain || global.msg.noPinDomain,
      });
      send({
        to: "background",
        act: "contextLog",
        data: {
          eventType: "SAVE_BROWSER_PIN_IMAGES_NOT_FOUND",
          auxData: {
            url: document.URL,
            funnel_uuid: makeUUID(),
          },
        },
      });
    }
    // if we can't save this page, pop a warning
    if (global.nopin) {
      warnCannotPin();
    } else {
      debug("Open Pinmarklet");
      openOverlay({
        id: "save",
        callback: () => {
          send({
            to: "background",
            act: "injectPinmarklet",
          });
        },
      });
    }
  }

  /*
    when we use the Save or context menu to select a single image,
    set data-pin-me-only and then open the image picker, which injects pinmarklet, 
    which will only return the image with data-pin-me-only = true

    me: [an IMG tag]
  */

  function pinMeOnly(me) {
    // tell pinmarklet to rank this image infinitely high so it's the only one in the grid
    me.setAttribute("data-pin-me-only", "true");
    // open the grid
    openImagePicker();
    // wait one second and remove the attribute we just added
    window.setTimeout(() => {
      me.removeAttribute("data-pin-me-only");
    }, 1000);
  }

  /*
    find an event's target element
    {
      target: [an event]
    }
  */

  function seek(me) {
    const found = me.target;
    // if our target is a text node return its parent
    if (found.targetNodeType === 3) {
      found = found.parentNode;
    }
    return found;
  }

  /*
    has the user clicked our hovering Save or Search button?
    me: [event]
  */

  function click(me) {
    if (global.hoverImage) {
      const el = seek(me);
      if (el === structure.buttonSave) {
        pinMeOnly(global.hoverImage);
      }
      if (el === structure.buttonSearch) {
        openSearch({
          data: {
            method: "h",
            searchMe: getImageData(global.hoverImage).media,
            height: global.hoverImage.naturalHeight,
            width: global.hoverImage.naturalWidth,
          },
        });
      }
    }
  }

  /*
    has the user moused out of our hovering Save or Search button?
    me: [event]
  */

  function out(me) {
    // are we showing a hoverbutton?
    if (global.hazButton) {
      // what element did we  just mouse out of?
      const el = seek(me);
      // hide if we did not just exit one of our hoverbuttons
      if (el !== structure.buttonSave && el !== structure.buttonSearch) {
        // hide is also called on blur, see below
        hide();
      }
    }
  }

  /*
    hide hoverbuttons if the window is blurred
    - this function is named "hide" and not "blur" because it is also called on mouseout, see above
  */

  function hide() {
    // this timeout is global, so we can cancel it when we're over the image and we move over the button
    window.clearTimeout(global.hazFade);
    global.hazFade = window.setTimeout(() => {
      structure.buttonSave.style.display = "none";
      structure.buttonSearch.style.display = "none";
      global.hazButton = false;
    }, 100);
  }

  /*
    check for right-click on mouse down; if we're right-clicking an image, store it for later use
  */

  function down(me) {
    if (me.button === 2) {
      // if we have a target with a tagName of IMG, set the global context element
      if (((me.target || {}).tagName || "") === "IMG") {
        global.contextEl = me.target;
      }
    }
  }

  /*
    has the user hovered over our hovering Save or Search button?
    me: [event]
  */

  function over(me) {
    // do we have a no-pin or no-hover directive
    if (!global.nopin && !global.nohover) {
      // what are we hovering over?
      const el = seek(me);
      // are we over the Save button?
      if (el === structure.buttonSave) {
        // cancel the timeout that may be trying to hide the button
        window.clearTimeout(global.hazFade);
        // should we swap the button for the hoverboard picker?
        if (
          // we are signed in
          global.hazLogin &&
          // natural width: the actual width of the image
          global.hoverImage.naturalWidth >=
            config.hoverBoardPicker.minImageSize &&
          // width: the rendered width of the image
          global.hoverImage.width >= config.hoverBoardPicker.minImageSize
        ) {
          // are we in the process of wheeling?
          if (global.lastWheel < Date.now() - 10) {
            // get URL, media, description, and pin ID from the image under the button
            const data = getImageData(global.hoverImage);
            const pos = el.getBoundingClientRect();
            // add position
            data.top = pos.top;
            data.left = pos.left;
            // if we don't have boards, we should not render hoverboard opener
            if (global.boards.length) {
              // data now contains our image and position; use directAct to send it straight in to the Save overlay
              openOverlay({ id: "save", directAct: "renderStructure", data });
            }
            // help Firefox hide the Search button
            structure.buttonSearch.style.display = "none";
          }
        }
        return;
      }
      // are we over the Search button?
      if (el === structure.buttonSearch) {
        window.clearTimeout(global.hazFade);
        return;
      }
      // are we over an image that might need to show some buttons?
      if (el.tagName === "IMG") {
        // should we hide the Save button on a data: URI?
        if (!global.hazLogin && !el.currentSrc.match(/^((http|https):\/\/)/)) {
          structure.buttonSave.style.display = "none";
        } else {
          const p = getPos({ el: el });
          // is the image big enough?
          if (!checkImage({ img: el })) {
            // append to body on first hover over eligible image
            if (!global.bodyHazButtonSave) {
              document.body.appendChild(structure.buttonSave);
              global.bodyHazButtonSave = true;
            }
            structure.buttonSave.style.top =
              p.top + config.save.offset.top + "px";
            structure.buttonSave.style.left =
              p.left + config.save.offset.left + "px";
            structure.buttonSave.style.display = "block";
            // don't show search if global.nosearch is set
            if (!global.nosearch) {
              // append to body on first hover over eligible image
              if (!global.bodyHazButtonSearch) {
                document.body.appendChild(structure.buttonSearch);
                global.bodyHazButtonSearch = true;
              }
              structure.buttonSearch.style.display = "block";
              structure.buttonSearch.style.top =
                p.top + config.save.offset.top + "px";
              structure.buttonSearch.style.left =
                p.right - config.save.offset.right + "px";
            }
            // global so we know what image we're over
            global.hoverImage = el;
            // global so we know a hoverbutton is present
            global.hazButton = true;
          }
          // clear timeout if any because we just moved onto a new image
          window.clearTimeout(global.hazFade);
        }
        return;
      }
    }
  }

  /*
    when a wheel event appears, set lastWheel
    (used to prevent flapping hoverboard picker)
  */

  function wheel() {
    // set the SAME global as set by the scroll event
    // to keep mac, windows, firefox, chrome, and safari all happy
    global.lastWheel = Date.now();
  }

  /*
    when a scroll event appears, set the SAME global as set by the wheel event above
    (used to prevent flapping hoverboard picker)
    For compatibility over mac, windows, chrome, firefox, edge, and safari
  */

  function scroll() {
    wheel();
  }

  /*
    check page for reasons we might not want to pin or show hoverbuttons
    TODO: move some of these into utils to share with pinmarklet?
  */

  function checkPage() {
    [
      // init global.nopin and global.nohover
      () => {
        for (let i in config.seek) {
          global[config.seek[i]] = false;
        }
        // do we have hoverbuttons hidden in preferences?
        if (global.hideHoverButtons) {
          global.nohover = true;
        }
      },
      // no pinning from Pinterest
      () => {
        /*
        ^ = only look at the beginning of the string
        https? = http or https
        \/\/ = escaped //
        (([a-z]{1,3})\.)? = one to three characters of lowercase letters followed by a dot, OR nothing
        pinterest\. = pinterest followed by an escaped dot
        ([a-z]{0,2}\.)? = zero to two lowercase letters followed by a dot, OR nothing (the co. in co.uk)
        ([a-z]{2,3}) = two or three lower-case characters (br, de, com)
        \/ = trailing forward-slash after top-level domain (so we don't get caught by pinterest.completelybogus.org)
        */
        // pinterestMatch needs prettier-ignore or Rollup will insist on breaking it and then arc diff will insist on patching it right back together
        // prettier-ignore
        let pinterestMatch = /^https?:\/\/(([a-z]{1,3}|latest)\.)?pinterest\.([a-z]{0,2}\.)?([a-z]{1,3})\//;
        // be nice to pinterdevs
        let pinterdevMatch = /^https?:\/\/(.*\.)?pinterdev\.com\//;
        // important: test document.URL, not document.domain, which won't have the http/https protocol
        if (
          document.URL.match(pinterestMatch) ||
          document.URL.match(pinterdevMatch)
        ) {
          debug("Nopin: Pinterest app");
          global.nopin = true;
        }
      },
      // check our onboard nopin / nohover lists
      () => {
        config.nopeList.filter((it) => {
          if (document.URL.match(it)) {
            debug("nopeList: " + document.URL + " matches " + it);
            global.nopeList = true;
            global.nopin = true;
          }
        });
        config.noHoverList.filter((it) => {
          if (document.URL.match(it)) {
            debug("Nohover: " + document.URL + " matches " + it);
            global.nohover = true;
          }
        });
      },
      // gather metadata and set special flags for nopin, hover, and nosearch
      () => {
        let patch,
          arr = [],
          obj = {},
          meta = document.getElementsByTagName("META"),
          key,
          value,
          i,
          j,
          k,
          q,
          z;
        // TODO: use same logic as pinmarklet
        // scrape our META tags, looking for keys and values
        // need to use a loop here since METAs are a collection, not an array
        for (i = 0; i < meta.length; i = i + 1) {
          value = (meta[i].getAttribute("content") || "").toLowerCase();
          if (value) {
            // get the property or name
            key = (
              meta[i].getAttribute("property") ||
              meta[i].getAttribute("name") ||
              ""
            ).toLowerCase();
            if (key) {
              // push into an array so we can sort it later
              arr.push({ k: key, v: value });
              // if a key is one of the ones we're looking for (nopin, nohover, nosearch) set it
              if (key === "pinterest") {
                // does the value correspond to nopin, nohover, or nosearch?
                if (config.seek[value]) {
                  // nopin, nohover, or nosearch = true
                  global[value] = true;
                }
                // shall we add the custom error description?
                if (value === "nopin") {
                  if (meta[i].getAttribute("description")) {
                    global.customNoPinDomain =
                      meta[i].getAttribute("description");
                  }
                }
              }
            }
          }
        }
        // sort our array so we don't wind up overwriting things as we split on colons
        arr.sort(function (a, b) {
          var r = 0;
          if (a.k > b.k) {
            r = 1;
          } else {
            if (a.k < b.k) {
              r = -1;
            }
          }
          return r;
        });
        // our array now contains objects with keys and values, sorted by key
        for (i = 0; i < arr.length; i = i + 1) {
          // split each key on the colon
          k = arr[i].k.split(":");
          // start at the root of the object we're working on
          z = obj;
          for (j = 0; j < k.length; j = j + 1) {
            if (typeof z[k[j]] === "undefined") {
              // make a new sub-object
              z[k[j]] = {};
            }
            // go again
            z = z[k[j]];
          }
          // see if we've seen this one before
          q = typeof z["~"];
          if (q === "undefined") {
            // key does not exist, so add it
            z["~"] = arr[i].v;
          } else {
            // turn existing duplicate strings into arrays
            if (q === "string") {
              // convert the existing string into the first element of an array
              z["~"] = [z["~"]];
            }
            // push the next value onto the array
            z["~"].push(arr[i].v);
          }
        }
        // recursively fix up the naive object so strings show as strings
        // but objects that have both strings and sub-objects aren't lost
        patch = function (o, parentObj, parentKey) {
          for (let k in o) {
            if (typeof o[k] === "object") {
              // is this member zero of an array?
              if (typeof o[k][0] === "string") {
                parentObj[parentKey] = o[k];
              } else {
                patch(o[k], o, k);
              }
            } else {
              // if we have only one key, it's the ~, so we can set object[key] equal to its string value
              if (Object.keys(o).length === 1) {
                parentObj[parentKey] = o[k];
              }
              // YOLO ALERT: this will deliver misleading results for situations like this:
              //
              //   <meta name="foo" content="woo">
              //   <meta name="foo" content="yay">
              //   <meta name="foo:bar" content="baz">
              //
              // ... where we will get:
              //
              //     foo:["woo","yay"]
              //
              // ... instead of:
              //
              //     foo:{"~":["woo", "yay"],"bar":"baz"}
              //
              // As of right now this is good enough for what we need
            }
          }
          return o;
        };
        // Now that we have global.meta, send it with all new pins
        global.meta = patch(obj, null, null);
      },
      // don't overwrite hoverbuttons made by pinit.js, which may be customized
      () => {
        if (document.body && document.body.getAttribute("data-pin-hover")) {
          debug("data-pin-hover found!");
          global.nohover = true;
        }
      },
      // check for feature block (sets global.hover, global.search, and global.pin)
      () => {
        send({
          act: "checkFeatureBlock",
          domain: document.domain,
        });
      },
    ].filter((it) => {
      it();
    });
  }

  /*
    close an iframe overlay
    me {
      id: [grid, create, save, etc]
    }
  */

  function closeOverlay(me) {
    if (me.id && structure[me.id]) {
      debug("Overlay closing " + me.id);
      // shut down iframe style observers
      if (global.observer[me.id]) {
        global.observer[me.id].disconnect();
        delete global.observer[me.id];
      }
      // remove the element from the DOM
      structure[me.id].parentNode.removeChild(structure[me.id]);
      // remove its reference from the global structure object (in case we remake later)
      delete structure[me.id];
      // reset scrolling to where we were before we opened the overlay
      window.scrollTo(global.pageX, global.pageY);
    }
  }

  /*
    ask closeOverlay to close the save overlay 
    me: {
      id: "save",
    }
  */

  function closeSave() {
    closeOverlay({ id: "save" });
  }

  /*
    run when the background process says we've right-clicked and chosen Save
  */

  function contextSave() {
    if (global.contextEl) {
      if (global.nopin || checkImage({ img: global.contextEl })) {
        // if we have a global nopin flag or checkImage fails, warn that we can't save
        warn({});
      } else {
        // set pinMeOnly flag on the image and run pinmarklet
        pinMeOnly(global.contextEl);
      }
    } else {
      debug("No context element");
    }
  }

  /*
    ask openOverlay to open the inline board picker with all data needed to save the image
    me: {
      id: "save",
      data: {
        url: [URL],
        media: [URL],
        id: [pin ID if found; 0 if not],
        description: [string]
      }
    }
  */

  function openSave(me) {
    if (me.data) {
      openOverlay({ id: "save", data: me.data });
    }
  }

  /*
    digest the results of login cookie check
    me: {
      data: [auth object, API reply]
    }
  */

  function pongLogin(me) {
    debug("Login check has returned!");
    global.hazLogin = me.data.auth;
  }

  /*
    the background process has told us whether or not we should block features for this domain
    me: {
      data: 
        nopin: [bool],
        nohover: [bool],
      }
    }
    TODO: check if we really need to refresh context at the end
  */

  function renderFeatureBlock(me) {
    if (me.data) {
      debug("Shall we block features by domain hash?");
      debug(me.data);
      if (me.data.nopin === true) {
        global.nopin = true;
      }
      if (me.data.nohover === true) {
        global.nohover = true;
      }
    }
    // refresh the browser button and context menus, just as if the background had requested it
    refreshContext();
  }

  /*
    functions listed under act are called remotely by the background process
  */

  const act = {
    closeSave,
    contextSave,
    openImagePicker,
    openSave,
    openSearch,
    pongLogin,
    refreshContext,
    renderFeatureBlock,
  };

  /* 
    listen for messages from outside our process
    { 
      to: [should match config.me],
      act: [may match something we're watching for in our act object],
      request: [pass to act[me.act]]
    }
  */

  function handleRemoteActions() {
    browser.runtime.onMessage.addListener((request, sender) => {
      // is it for us?
      if (request.to === config.me) {
        debug("Message received");
        debug(request);
        // do we have a handler?
        if (request.act && typeof act[request.act] === "function") {
          // see if we can tell what tab the message came from
          if (((sender || {}).tab || {}).id) {
            // add the tabId to the request so we can specify it if needed
            request.tabId = sender.tab.id;
          }
          // run it, passing the entire object in
          act[request.act](request);
        } else {
          // someone is sending us a message asking for a handler that doesn't exist
          debug("No handler found for " + request.act, 1);
        }
      }
    });
  }

  /*
    return a random base-60 number of length n
  */

  function random60(myLength = 12) {
    let me = "";
    myLength = myLength - 0;
    for (let i = 0; i < myLength; i = i + 1) {
      me = me + config.digits.substr(Math.floor(Math.random() * 60), 1);
    }
    return me;
  }

  /*
    housekeeping is complete; start listeners; initialize experiments; build presentation and structure
  */

  function init() {
    // if we can't show an iframe overlay on this page, hide all functionality
    if (!checkInjectOverlay()) {
      global.nopin = true;
      global.nosearch = true;
      // tell the background process to hide context menus
      refreshContext();
    } else {
      // start listening for messages that trigger act.functionName
      handleRemoteActions();
      // check for logins
      send({ to: "background", act: "login" });
      // identity changes with each page load so we avoid weird conditions such as delayed messages from background
      global.me = random60();
      // check if we're right-clicking on something that will show one of our context menus
      document.addEventListener("mousedown", down);
      // check for nopin / nohover metas;
      if (document.domain) {
        // go look for reasons why we might not want to show hoverbuttons or allow pinning
        checkPage();
      }
      // make Save button
      structure.buttonSave = make({
        SPAN: {
          innerText: global.msg.saveAction,
        },
      });
      structure.buttonSave.setAttribute(
        "style",
        config.save.style.lego.join("!important;")
      );
      // make Search button
      structure.buttonSearch = document.createElement("SPAN");
      structure.buttonSearch.setAttribute(
        "style",
        config.search.style.join("!important;")
      );
      // handle events
      // if we click, check if we need to pin
      document.body.addEventListener("click", click);
      // if we mouse over an element, check if we need to show hoverbuttons
      document.body.addEventListener("mouseover", over);
      // if we mouse out of an element, check if we need to hide hoverbuttons
      document.body.addEventListener("mouseout", out);
      // if the tab changes, hide hoverbuttons
      window.addEventListener("blur", hide);
      // if we're wheeling, take note
      document.addEventListener("wheel", wheel, { passive: false });
      // if we're scrolling, take note
      window.addEventListener("scroll", scroll, { passive: false });
    }
  }

  /*
    housekeeping:
    load contents of localStorage, promote correct messages, and then initialize
  */

  getLocalValues(init);
})();
