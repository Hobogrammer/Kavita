import {Page} from '@playwright/test';
import {SiteTheme} from "src/app/_models/preferences/site-theme";

export async function setRoute(page: Page, url: string, response: any, options?: any) {
  await page.route(url, async route => {
    await route.fulfill({
      contentType: options?.contentType || "application/json",
      status: options?.status || 200,
      body: JSON.stringify(response)
    });
  });
}

export async function setWebSocketRoute(page: Page, url: string, user: any) {
  await page.routeWebSocket('ws://'+ url, ws => {
    console.log("Serving on WebSocket");
    ws.onMessage(message => {
      switch (message) {
        case "{'protocol':'json','version':1}":
          ws.send(JSON.stringify({}));
          ws.send(JSON.stringify({"type":1,"target":"OnlineUsers","arguments":[[user.username]]}));
          break;
        default:
          ws.send("{}");
          break;
      }
    });
  });
}

export const defaultSiteTheme = {
  id:1,
  name: "Dark",
  normalizedName: "dark",
  fileName: "dark.scss",
  isDefault: true,
  provider: 1,
  previewUrls: [""],
  description:"Default theme shipped with Kavita",
  author: "",
  compatibleVersion: null,
  selector: "bg-dark",
  filePath: "assets/css/dark.scss",
} as SiteTheme;
