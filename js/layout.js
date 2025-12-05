async function injectContent(selector, url) {
    const host = document.querySelector(selector);
    if (!host) return;
    try {
        const response = await fetch(url);
        host.innerHTML = await response.text();
    } catch (error) {
        console.error('Failed to load', url, error);
    }
}

injectContent('header#site-header', 'header.html');
injectContent('footer#site-footer', 'footer.html');
