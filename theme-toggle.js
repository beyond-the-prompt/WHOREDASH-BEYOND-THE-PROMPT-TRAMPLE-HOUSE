class ThemeToggle extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
      this.render();
    });
  }

  render() {
    const isDark = document.documentElement.classList.contains('dark');
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        button:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .icon {
          width: 24px;
          height: 24px;
          color: #e2e8f0;
        }
      </style>
      <button aria-label="Toggle dark mode">
        <i data-feather="${isDark ? 'sun' : 'moon'}" class="icon"></i>
      </button>
    `;
    feather.replace();
  }
}

customElements.define('theme-toggle', ThemeToggle);