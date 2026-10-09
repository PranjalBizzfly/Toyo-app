/**
 * Inline script (runs before first paint and on every DOM change): marks text
 * blocks that are real sentences (12+ words) with data-long so title-case.css leaves them in
 * sentence case, and marks URLs / email addresses with data-tc-off.
 */
export const titleCaseScript = `(function(){
  var BLOCK = "p,li,dd,blockquote,figcaption,td,[class*=desc],[class*=__text],[class*=lead],[class*=summary],[class*=__sub],[class*=__body]";
  var URLISH = /(https?:\\/\\/|www\\.|[\\w.-]+@[\\w-]+\\.|\\b[\\w-]+\\.(com|in|io|app|ai|org|net|co)\\b)/i;
  function words(t){ return (t.trim().match(/\\S+/g) || []).length; }
  function scan(root){
    if (!root || !root.querySelectorAll) return;
    var els = root.matches && root.matches(BLOCK) ? [root] : [];
    els = els.concat([].slice.call(root.querySelectorAll(BLOCK)));
    for (var i = 0; i < els.length; i++) {
      var el = els[i], t = el.textContent || "";
      // Only real text blocks: a container holding headings or titled cards is not a paragraph.
      var holdsHeading = el.querySelector("h1,h2,h3,h4,h5,h6,[class*=title],[class*=name],button");
      if (words(t) >= 12 && !holdsHeading) el.setAttribute("data-long", "");
      else el.removeAttribute("data-long");
    }
    var leaves = root.querySelectorAll("a, span, small, p, li, strong, b, em");
    for (var j = 0; j < leaves.length; j++) {
      var l = leaves[j];
      if (l.children.length === 0 && URLISH.test(l.textContent || "")) l.setAttribute("data-tc-off", "");
    }
  }
  function run(){ scan(document.body); }
  if (document.body) run(); else document.addEventListener("DOMContentLoaded", run);
  var pending = false;
  new MutationObserver(function(){
    if (pending) return; pending = true;
    requestAnimationFrame(function(){ pending = false; run(); });
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
})();`;
