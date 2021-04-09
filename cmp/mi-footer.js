class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
       Osvaldo cruz De La Cruz
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
