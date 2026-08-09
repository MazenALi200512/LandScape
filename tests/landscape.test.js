import { beforeEach, describe, expect, it } from 'vitest';
import { getItems, initSlider, nextSlide, prevSlide } from '../landscape.js';

function buildSlider(names = ['a', 'b', 'c']) {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="slide">
            ${names.map((name) => `<div class="item" data-name="${name}"></div>`).join('')}
        </div>
        <div class="button">
            <button class="prev"></button>
            <button class="next"></button>
        </div>
    `;
    return root;
}

function order(root) {
    return getItems(root).map((item) => item.dataset.name);
}

describe('getItems', () => {
    it('returns the items in document order', () => {
        expect(order(buildSlider())).toEqual(['a', 'b', 'c']);
    });

    it('returns an empty array when there are no items', () => {
        const root = document.createElement('div');
        root.innerHTML = '<div class="slide"></div>';
        expect(getItems(root)).toEqual([]);
    });
});

describe('nextSlide', () => {
    let root;

    beforeEach(() => {
        root = buildSlider();
    });

    it('moves the first item to the end', () => {
        nextSlide(root);
        expect(order(root)).toEqual(['b', 'c', 'a']);
    });

    it('cycles back to the original order after a full rotation', () => {
        nextSlide(root);
        nextSlide(root);
        nextSlide(root);
        expect(order(root)).toEqual(['a', 'b', 'c']);
    });

    it('keeps the item count stable', () => {
        nextSlide(root);
        expect(getItems(root)).toHaveLength(3);
    });

    it('does nothing when there are no items', () => {
        const empty = document.createElement('div');
        empty.innerHTML = '<div class="slide"></div>';
        expect(() => nextSlide(empty)).not.toThrow();
        expect(getItems(empty)).toEqual([]);
    });

    it('does nothing when there is no slide container', () => {
        const noSlide = document.createElement('div');
        noSlide.innerHTML = '<div class="item" data-name="a"></div>';
        expect(() => nextSlide(noSlide)).not.toThrow();
        expect(order(noSlide)).toEqual(['a']);
    });
});

describe('prevSlide', () => {
    let root;

    beforeEach(() => {
        root = buildSlider();
    });

    it('moves the last item to the front', () => {
        prevSlide(root);
        expect(order(root)).toEqual(['c', 'a', 'b']);
    });

    it('undoes a nextSlide call', () => {
        nextSlide(root);
        prevSlide(root);
        expect(order(root)).toEqual(['a', 'b', 'c']);
    });

    it('does nothing when there are no items', () => {
        const empty = document.createElement('div');
        empty.innerHTML = '<div class="slide"></div>';
        expect(() => prevSlide(empty)).not.toThrow();
        expect(getItems(empty)).toEqual([]);
    });

    it('does nothing when there is no slide container', () => {
        const noSlide = document.createElement('div');
        noSlide.innerHTML = '<div class="item" data-name="a"></div>';
        expect(() => prevSlide(noSlide)).not.toThrow();
        expect(order(noSlide)).toEqual(['a']);
    });
});

describe('initSlider', () => {
    it('advances the slider when the next button is clicked', () => {
        const root = buildSlider();
        initSlider(root);
        root.querySelector('.next').click();
        expect(order(root)).toEqual(['b', 'c', 'a']);
    });

    it('rewinds the slider when the prev button is clicked', () => {
        const root = buildSlider();
        initSlider(root);
        root.querySelector('.prev').click();
        expect(order(root)).toEqual(['c', 'a', 'b']);
    });

    it('handles repeated clicks on both buttons', () => {
        const root = buildSlider(['a', 'b', 'c', 'd']);
        initSlider(root);
        root.querySelector('.next').click();
        root.querySelector('.next').click();
        root.querySelector('.prev').click();
        expect(order(root)).toEqual(['b', 'c', 'd', 'a']);
    });

    it('does not throw when the navigation buttons are missing', () => {
        const root = document.createElement('div');
        root.innerHTML = '<div class="slide"><div class="item" data-name="a"></div></div>';
        expect(() => initSlider(root)).not.toThrow();
    });
});
