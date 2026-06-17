export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/sw.js").then(async (registration) => {
      const sync = (registration as ServiceWorkerRegistration & {
        sync?: { register: (tag: string) => Promise<void> };
      }).sync;
      if (sync) {
        try {
          await sync.register("sync-timer");
        } catch (err) {
          console.warn("Background sync not available yet:", err);
        }
      }
    });
  });
}
