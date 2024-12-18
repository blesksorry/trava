"use strict";

// отслеживание движений  мыши
class MouseTracker {
    constructor() {
        this.body = document.body;
        this.init();
    }

    init() {
        // обработчик события для текущего класса
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleMouseMove(e) {
        // установка переменных в css для мыши
        this.body.style.cssText = `--move-x: ${e.clientX}px; --move-y: ${e.clientY}px;`;
    }
}

// скролл
class ScrollTracker {
    constructor() {
        this.init();
    }

    init() {
        // обработчик события для текущего класса
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        // установка переменных для текущей позиции прокрутки
        document.documentElement.style.setProperty('--scrollTop', `${window.scrollY}px`);
    }
}

const mouseTracker = new MouseTracker();
const scrollTracker = new ScrollTracker();