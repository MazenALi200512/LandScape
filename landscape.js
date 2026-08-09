const SLIDES = [
    { name: 'Switzerland', image: 'https://i.ibb.co/qCkd9jS/img1.jpg' },
    { name: 'Finland', image: 'https://i.ibb.co/jrRb11q/img2.jpg' },
    { name: 'Iceland', image: 'https://i.ibb.co/NSwVv8D/img3.jpg' },
    { name: 'Australia', image: 'https://i.ibb.co/Bq4Q0M8/img4.jpg' },
    { name: 'Netherland', image: 'https://i.ibb.co/jTQfmTq/img5.jpg' },
    { name: 'Ireland', image: 'https://i.ibb.co/RNkk6L0/img6.jpg' }
];

const DEFAULT_DESCRIPTION = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!';
const DEFAULT_BUTTON_LABEL = 'See More';

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

function createSlide({ name, image, description = DEFAULT_DESCRIPTION, buttonLabel = DEFAULT_BUTTON_LABEL }) {
    const item = createElement('div', 'item');
    item.style.backgroundImage = `url(${image})`;

    const content = createElement('div', 'content');
    content.append(
        createElement('div', 'name', name),
        createElement('div', 'des', description),
        createElement('button', undefined, buttonLabel)
    );

    item.append(content);
    return item;
}

function renderSlides(slide, slides) {
    slide.replaceChildren(...slides.map(createSlide));
}

function rotateSlides(slide, direction) {
    const items = slide.querySelectorAll('.item');
    if (items.length === 0) {
        return;
    }
    if (direction === 'next') {
        slide.appendChild(items[0]);
    } else {
        slide.prepend(items[items.length - 1]);
    }
}

const slide = document.querySelector('.slide');
renderSlides(slide, SLIDES);

document.querySelector('.next').addEventListener('click', () => rotateSlides(slide, 'next'));
document.querySelector('.prev').addEventListener('click', () => rotateSlides(slide, 'prev'));
