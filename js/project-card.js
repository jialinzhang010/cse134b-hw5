class ProjectCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .card {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          font-family: Inter, sans-serif;
        }

        picture {
          flex: 0 0 35%;
          display: block;
        }

        img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          object-fit: cover;
        }

        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: .5rem;
        }

        h2 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .desc {
          margin: 0;
          opacity: .9;
          line-height: 1.5;
        }

        a.link {
          color: #5ea0f5;
          font-weight: 600;
          text-decoration: none;
        }

        a.link:hover {
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .card {
            flex-direction: column;
          }

          picture {
            flex-basis: auto;
          }
        }

      </style>

      <article class="card">
        <picture><img /></picture>

        <div class="content">
          <h2></h2>
          <p class="desc"></p>
          <a class="link" target="_blank">Link</a>
        </div>
      </article>
    `;

    this.titleEl = shadow.querySelector("h2");
    this.imgEl = shadow.querySelector("img");
    this.descEl = shadow.querySelector(".desc");
    this.linkEl = shadow.querySelector(".link");
  }

  connectedCallback() {
    this.titleEl.textContent = this.getAttribute("title");
    this.imgEl.src = this.getAttribute("image");
    this.imgEl.alt = this.getAttribute("alt");
    this.descEl.textContent = this.getAttribute("description");
    this.linkEl.href = this.getAttribute("link");
  }
}

customElements.define("project-card", ProjectCard);
