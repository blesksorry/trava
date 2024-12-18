// модальное окно
class Modal {
    constructor(modalId, openBtnId, closeBtnClass) {
        this.modal = document.getElementById(modalId);
        this.openBtn = document.getElementById(openBtnId);
        this.closeBtns = document.getElementsByClassName(closeBtnClass);

        this.init();
    }

    init() {
        // обработчик
        this.openBtn.addEventListener('click', () => {
            this.open();
        });

        // закрытие модалки по кнопке
        Array.from(this.closeBtns).forEach(btn => {
            btn.addEventListener('click', () => {
                this.close();
            });
        });

        // закрытие модалки вне области
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.close();
            }
        });
    }

    open() {
        this.modal.style.display = 'block';
    }

    close() {
        this.modal.style.display = 'none';
    }
}

// Форма
class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.init();
    }

    init() {
        // обработчик для отправки
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        alert('Заявка отправлена!');
        document.getElementById('modal').style.display = 'none';
    }
}


const modal = new Modal('modal', 'openModalBtn', 'close');
const formHandler = new FormHandler('applicationForm');
