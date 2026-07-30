/**
 * RWA.io "verified project" verification seal.
 *
 * SEAL_HTML is RWA.io's snippet with its src, size and attributes untouched,
 * plus a trailing `sandbox`. That sandbox is load-bearing — do not remove it:
 *
 * Their embed server-renders the seal correctly (light chip, dark text), then
 * hydrates. Its client JS re-reads the visitor's prefers-color-scheme and
 * repaints the badge: on a dark-mode browser it swaps in a dark background but
 * keeps light-theme text, so the seal looks right for about a second and then
 * turns washed-out grey. A sandbox without allow-scripts blocks that JS, so the
 * correct server-rendered seal is what stays on screen.
 *
 * Nothing else fixes it. The iframe is cross-origin so we cannot script it, and
 * `color-scheme` on the iframe or any ancestor does not propagate into their
 * document (verified). With scripts blocked the ?theme= param has no effect
 * either — it is applied client-side, so light and dark both render the light
 * chip; theme=light is kept because that is the snippet RWA.io issued.
 *
 * allow-popups (+ escape-sandbox) keeps the seal clickable: its content is an
 * <a href="https://app.rwa.io/project/veil" target="_blank">, which a bare
 * sandbox="" would block.
 *
 * Do not change the src, scrolling="yes", frameborder="0" or the 160x40 size.
 */
const SEAL_HTML =
  '<iframe src="https://app.rwa.io/embed/verification-project-badge/veil?theme=light" width="160" height="40" frameborder="0" scrolling="yes" sandbox="allow-popups allow-popups-to-escape-sandbox"></iframe>';

export default function RwaBadge({ className = "" }: { className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: SEAL_HTML }} />;
}
