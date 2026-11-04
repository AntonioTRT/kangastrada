class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered === "true") return;

    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
    const links = [
      ["/", "Home"],
      ["/antonio", "Antonio"],
      ["/trt", "TRT Project"],
      ["/#contact", "Contact"]
    ];

    this.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header__inner">
        <a class="site-brand" href="/" aria-label="Kangastrada home">
          <span class="site-brand__mark" aria-hidden="true">K</span>
          <span>Kangastrada</span>
        </a>
        <nav class="site-nav" aria-label="Main navigation">
          ${links.map(([href, label]) => {
            const isContact = href === "/#contact";
            const isCurrent = isContact
              ? currentPath === "/" && window.location.hash === "#contact"
              : currentPath === href.replace(/\/+$/, "") || (href === "/" && currentPath === "/");
            return `<a href="${href}"${isCurrent ? ' aria-current="page"' : ""}>${label}</a>`;
          }).join("")}
        </nav>
      </header>
    `;
    this.dataset.rendered = "true";
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered === "true") return;

    this.innerHTML = `
      <footer class="site-footer__inner">
        <a class="site-brand site-brand--footer" href="/" aria-label="Kangastrada home">
          <span class="site-brand__mark" aria-hidden="true">K</span>
          <span>Kangastrada</span>
        </a>
        <p>Helsinki, Finland</p>
        <a class="site-footer__email" href="mailto:hello@example.com">hello@example.com</a>
        <p class="site-footer__copyright">
          &copy; ${new Date().getFullYear()} Kangastrada
          <span class="site-footer__analytics" data-google-analytics-id="G-XXXXXXXXXX">Google Analytics: G-XXXXXXXXXX</span>
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
