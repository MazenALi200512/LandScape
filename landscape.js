const slide = document.querySelector('.slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

if (!slide || !next || !prev) {
    const missing = [
        !slide && '.slide',
        !next && '.next',
        !prev && '.prev',
    ].filter(Boolean).join(', ');
    throw new Error(`landscape.js: required element(s) not found: ${missing}`);
}

function rotate(direction) {
    const items = slide.querySelectorAll('.item');
    if (items.length < 2) {
        console.warn(`landscape.js: cannot rotate slider, found ${items.length} .item element(s)`);
        return;
    }
    if (direction === 'next') {
        slide.appendChild(items[0]);
    } else {
        slide.prepend(items[items.length - 1]);
    }
}

next.addEventListener('click', function () {
    rotate('next');
});

prev.addEventListener('click', function () {
    rotate('prev');
});
