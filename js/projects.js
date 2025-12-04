const LOCAL_PROJECTS = [
    {
        title: "Train Ticketing System (Local)",
        caption: "Train Ticketing System",
        image: "images/train.jpg",
        alt: "Train Ticketing System",
        description:
            "A distributed train ticketing platform built with Spring Boot, Redis, and message queues. Supports real-time seat locking and rollback for high concurrency scenarios.",
        link: "https://github.com/jialinzhang010/train"
    },
    {
        title: "Basketball Player Tracking Platform (Local)",
        caption: "Basketball Player Tracking Platform",
        image: "images/bball-tracking.png",
        alt: "Node.js + MongoDB basketball tracking platform",
        description:
            "A full-stack basketball player tracking web app built with Node.js, Express, and MongoDB. Supports CRUD operations on player stats.",
        link: "https://github.com/jialinzhang010/4-final-project-bball-player-track"
    }
];


if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify(LOCAL_PROJECTS));
}

const grid = document.getElementById("project-grid");

function renderProjects(array) {
    grid.innerHTML = "";
    array.forEach(p => {
        const card = document.createElement("project-card");
        card.setAttribute("title", p.title);
        card.setAttribute("caption", p.caption);
        card.setAttribute("image", p.image);
        card.setAttribute("alt", p.alt);
        card.setAttribute("description", p.description);
        card.setAttribute("link", p.link);
        grid.appendChild(card);
    });
}

document.getElementById("load-local").addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("projects"));
    renderProjects(data);
});

document.getElementById("load-remote").addEventListener("click", () => {
    fetch("https://api.jsonbin.io/v3/b/692d3b1f43b1c97be9cfdaae")
        .then(res => res.json())
        .then(data => {
            renderProjects(data.record.projects);
        })
        .catch(err => console.error("Remote fetch failed:", err));
});
