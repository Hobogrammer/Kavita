import {Page} from '@playwright/test';

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
