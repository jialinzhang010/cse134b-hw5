function getProjects() {
    const raw = localStorage.getItem("projects");
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error("Failed to parse projects from localStorage:", e);
        return [];
    }
}

function saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function renderProjectList() {
    const list = document.getElementById("project-list");
    const projects = getProjects();
    list.innerHTML = "";

    projects.forEach((p, index) => {
        const li = document.createElement("li");
        li.textContent = `${p.title}`;
        list.appendChild(li);
    });
}

function getFormData() {
    return {
        title: document.getElementById("title").value.trim(),
        caption: document.getElementById("caption").value.trim(),
        image: document.getElementById("image").value.trim(),
        alt: document.getElementById("alt").value.trim(),
        description: document.getElementById("description").value.trim(),
        link: document.getElementById("link").value.trim()
    };
}

function setStatus(msg) {
    document.getElementById("status-message").textContent = msg;
}

window.addEventListener("DOMContentLoaded", () => {
    renderProjectList();

    // Create
    document.getElementById("create-btn").addEventListener("click", () => {
        const data = getFormData();
        if (!data.title) {
            setStatus("Title is required for create.");
            return;
        }

        const projects = getProjects();
        projects.push(data);
        saveProjects(projects);
        renderProjectList();
        setStatus(`Created project "${data.title}".`);
    });

    // Update
    document.getElementById("update-btn").addEventListener("click", () => {
        const data = getFormData();
        if (!data.title) {
            setStatus("Title is required for update.");
            return;
        }

        const projects = getProjects();
        const idx = projects.findIndex(p => p.title === data.title);
        if (idx === -1) {
            setStatus(`No project found with title "${data.title}".`);
            return;
        }

        projects[idx] = data;
        saveProjects(projects);
        renderProjectList();
        setStatus(`Updated project "${data.title}".`);
    });

    // Delete
    document.getElementById("delete-btn").addEventListener("click", () => {
        const title = document.getElementById("title").value.trim();
        if (!title) {
            setStatus("Title is required for delete.");
            return;
        }

        const projects = getProjects();
        const filtered = projects.filter(p => p.title !== title);

        if (filtered.length === projects.length) {
            setStatus(`No project found with title "${title}".`);
            return;
        }

        saveProjects(filtered);
        renderProjectList();
        setStatus(`Deleted project(s) with title "${title}".`);
    });
});
