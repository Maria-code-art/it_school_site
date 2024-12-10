document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const successMessage = document.getElementById('success-message');
    const inputFields = form.querySelectorAll('input');
    const submitButton = form.querySelector('button');
    
    // Функция для анимации поля ввода
    function animateInput(input, valid) {
        input.style.transition = 'all 0.3s ease';
        if (valid) {
            input.style.borderColor = '#28a745';
            input.style.boxShadow = '0 0 5px rgba(40, 167, 69, 0.5)';
        } else {
            input.style.borderColor = '#dc3545';
            input.style.boxShadow = '0 0 5px rgba(220, 53, 69, 0.5)';
        }
    }

    // Проверка на валидность данных
    function validateForm() {
        let isValid = true;
        inputFields.forEach(input => {
            if (input.value.trim() === '') {
                animateInput(input, false);
                isValid = false;
            } else {
                animateInput(input, true);
            }
        });
        return isValid;
    }

    // Отправка формы с анимацией
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверка данных формы
        if (validateForm()) {
            // Делаем кнопку неактивной на время отправки
            submitButton.disabled = true;
            submitButton.style.backgroundColor = '#ccc';
            submitButton.innerHTML = 'Отправка...';

            // Симуляция отправки данных (например, запрос на сервер)
            setTimeout(() => {
                // Показать сообщение об успехе с анимацией
                successMessage.style.opacity = '0';
                successMessage.style.display = 'block';
                setTimeout(() => successMessage.style.opacity = '1', 100);

                // Очистить форму
                form.reset();
                inputFields.forEach(input => animateInput(input, false));

                // Вернуть кнопку в исходное состояние
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '#0055a5';
                submitButton.innerHTML = 'Записаться';
                
                // Скроллинг к сообщению
                window.scrollTo({
                    top: successMessage.offsetTop,
                    behavior: 'smooth'
                });
            }, 2000); // Имитация времени отправки
        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    });

    // Визуальная анимация элементов при прокрутке страницы
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    function onScroll() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add('fade-in');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Инициализация сразу после загрузки страницы
});