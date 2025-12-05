class ThemeToggle extends HTMLElement {
    connectedCallback() {
        if (this._mounted) return;
        this._mounted = true;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'theme-toggle';
        btn.textContent = this.getAttribute('label') || 'Toggle theme';
        btn.style.display = 'inline-block';
        this.appendChild(btn);

        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') {
            document.documentElement.setAttribute('data-theme', stored);
        }

        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }
}

customElements.define('theme-toggle', ThemeToggle);
