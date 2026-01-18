class BackgroundVideo extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
          filter: brightness(0.7) contrast(1.3) saturate(1.2) hue-rotate(-5deg);
transition: opacity 0.8s ease;
        }
        
        :host(:hover) video {
          opacity: 0.3;
        }
</style>
      <video autoplay loop muted>
        <source src="tramplevid.mp4" type="video/mp4">
      </video>
    `;
  }
}


customElements.define('background-video', BackgroundVideo);
