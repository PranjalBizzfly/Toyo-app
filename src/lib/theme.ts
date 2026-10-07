/** Theme persistence key and the pre-paint script shared by layout and toggle. */
export const THEME_STORAGE_KEY = "toyo-theme";
export type Theme = "light" | "dark";

/**
 * Runs inline in <head> before first paint: uses the saved choice, otherwise
 * the system preference, and sets `data-theme` on <html> so the first frame is
 * already correct (no flash, no hydration mismatch — React never renders it).
 */
export const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}",t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})();`;
