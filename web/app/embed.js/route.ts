import { publicUrl } from "@/lib/session";

/**
 * V39: the website widget. A firm pastes
 *   <script src="https://cofile.app/embed.js" data-account="…" data-firm="…" data-service="…" async></script>
 * where the form should appear; this puts the form there in a frame that grows with it.
 */
export function GET() {
  const origin = publicUrl();
  const js = `(function () {
  var s = document.currentScript; if (!s) return;
  var a = s.getAttribute("data-account"), f = s.getAttribute("data-firm"), v = s.getAttribute("data-service");
  if (!a || !f || !v) { console.error("CoFile widget: data-account, data-firm and data-service are required"); return; }
  var ok = /^[a-z0-9][a-z0-9-]{0,62}$/;
  if (!ok.test(a) || !ok.test(f) || !ok.test(v)) return;
  var frame = document.createElement("iframe");
  frame.src = ${JSON.stringify(origin)} + "/embed/" + a + "/" + f + "/" + v;
  frame.title = "Filing form";
  frame.loading = "lazy";
  frame.style.cssText = "width:100%;border:0;min-height:600px;display:block";
  frame.setAttribute("allow", "clipboard-write");
  s.parentNode.insertBefore(frame, s.nextSibling);
  window.addEventListener("message", function (e) {
    if (e.origin !== ${JSON.stringify(origin)} || e.source !== frame.contentWindow || !e.data || e.data.type !== "cofile:height") return;
    var h = Number(e.data.height); if (h > 0 && h < 20000) frame.style.height = h + "px";
  });
})();`;
  return new Response(js, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "public, max-age=300", "access-control-allow-origin": "*" } });
}
