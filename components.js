// Add a GA4 measurement ID and consent-aware loader here when analytics is enabled.
// An empty ID keeps analytics inactive and makes no tracking requests.
const analyticsConfig = Object.freeze({
  googleAnalyticsMeasurementId: "",
});

// The site may be served from the domain root (custom domain) or from a
// sub-path (Live Server workspace folder, GitHub Pages project site), so
// derive the site root from this script's own URL instead of hardcoding "/".
const componentsScript = document.currentScript || document.querySelector('script[src$="components.js"]');
const siteRoot = new URL(".", componentsScript ? componentsScript.src : window.location.href).pathname;
const siteUrl = (path) => siteRoot + path.replace(/^\/+/, "");
const normalizePath = (path) => path.replace(/index\.html$/, "").replace(/\/+$/, "") || "/";

class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered === "true") return;

    const currentPath = normalizePath(window.location.pathname);
    const links = [
      [siteUrl("/"), "Home"],
      [siteUrl("/antonio/"), "About"],
      [siteUrl("/antonio/electronics/"), "Experience"],
      [siteUrl("/antonio/education/"), "Education"],
      [siteUrl("/antonio/projects/"), "Projects"],
      [siteUrl("/contact/"), "Contact"]
    ];

    this.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header__inner">
        <a class="site-brand" href="${siteUrl("/")}" aria-label="Kangastrada home">
          <span class="site-brand__mark" aria-hidden="true">K</span>
          <span>Kangastrada</span>
        </a>
        <button class="site-menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          Menu
        </button>
        <nav class="site-nav" id="site-nav" aria-label="Main navigation">
          ${links.map(([href, label]) => {
            const isCurrent = currentPath === normalizePath(href);
            return `<a href="${href}"${isCurrent ? ' aria-current="page"' : ""}>${label}</a>`;
          }).join("")}
        </nav>
      </header>
    `;

    const menuButton = this.querySelector(".site-menu-toggle");
    const header = this.querySelector(".site-header__inner");
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
      header.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      menuButton.textContent = isExpanded ? "Menu" : "Close";
      header.classList.toggle("is-open", !isExpanded);
    });
    this.querySelectorAll(".site-nav a").forEach((link) => link.addEventListener("click", closeMenu));

    this.dataset.rendered = "true";
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered === "true") return;

    this.innerHTML = `
      <footer class="site-footer__inner">
        <a class="site-brand site-brand--footer" href="${siteUrl("/")}" aria-label="Kangastrada home">
          <span class="site-brand__mark" aria-hidden="true">K</span>
          <span>Kangastrada</span>
        </a>
        <p>Based in Finland</p>
        <a href="${siteUrl("/contact/")}">Contact</a>
        <a href="https://github.com/AntonioTRT" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        <p class="site-footer__copyright">
          &copy; ${new Date().getFullYear()} Kangastrada
        </p>
      </footer>
    `;
    this.dataset.rendered = "true";
  }
}

if (!customElements.get("site-header")) {
  customElements.define("site-header", SiteHeader);
}

if (!customElements.get("site-footer")) {
  customElements.define("site-footer", SiteFooter);
}

document.addEventListener("submit", (event) => {
  if (event.target.matches("[data-unconnected-form]")) {
    event.preventDefault();
  }
});
