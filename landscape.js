function getItems(root) {
    return Array.from(root.querySelectorAll('.item'));
}

function nextSlide(root) {
    const slide = root.querySelector('.slide');
    const items = getItems(root);
    if (!slide || items.length === 0) return;
    slide.appendChild(items[0]);
}

function prevSlide(root) {
    const slide = root.querySelector('.slide');
    const items = getItems(root);
    if (!slide || items.length === 0) return;
    slide.prepend(items[items.length - 1]);
}

function initSlider(root) {
    const next = root.querySelector('.next');
    const prev = root.querySelector('.prev');
    if (next) next.addEventListener('click', () => nextSlide(root));
    if (prev) prev.addEventListener('click', () => prevSlide(root));
}

if (typeof document !== 'undefined') {
    initSlider(document);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getItems, nextSlide, prevSlide, initSlider };
}
