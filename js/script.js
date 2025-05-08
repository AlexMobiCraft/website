/*=============== ПОКАЗ/СКРЫТИЕ МОБИЛЬНОГО МЕНЮ ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'); // Нужна кнопка закрытия в HTML, если используете

/* Показ меню */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.toggle('show-menu');
    });
}

/* Скрытие меню (если есть кнопка закрытия) */
// if(navClose){
//     navClose.addEventListener('click', () =>{
//         navMenu.classList.remove('show-menu');
//     });
// }

/* Скрытие меню при клике на ссылку */
const navLink = document.querySelectorAll('.nav-link');

function linkAction(){
    // const navMenu = document.getElementById('nav-menu'); // Получаем снова, если область видимости
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));


/*=============== ПОДСВЕТКА АКТИВНОЙ ССЫЛКИ СЕКЦИИ ПРИ СКРОЛЛЕ ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50; // 50 - небольшой запас
        sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            // Используем querySelector для поиска ссылки с href, содержащим sectionId
            const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
            if (link) { // Проверяем, найдена ли ссылка
                link.classList.add('active-link');
            }
        } else {
            const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
             if (link) { // Проверяем, найдена ли ссылка
                link.classList.remove('active-link');
             }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== ИЗМЕНЕНИЕ ФОНА ХЕДЕРА ПРИ СКРОЛЛЕ (для меню вверху) ===============*/
function scrollHeader(){
    const nav = document.getElementById('header'); // Используем ID хедера
    // Когда прокрутка больше 80 viewport height, добавить класс scroll-header
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
// window.addEventListener('scroll', scrollHeader) // Раскомментируйте, если меню вверху и нужен эффект

/*=============== ПОКАЗ КНОПКИ "НАВЕРХ" ===============*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // Когда прокрутка выше 560 viewport height, добавить класс show-scroll
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);


/*=============== ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ (Альтернатива CSS scroll-behavior) ===============*/
// Можно оставить только CSS scroll-behavior: smooth; в html {}
// Или использовать JS для лучшей кроссбраузерности:
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Проверяем, есть ли у ссылки класс nav-link (чтобы не мешать другим якорям)
        // и что href не просто "#"
        if (this.getAttribute('href') !== '#' && (this.classList.contains('nav-link') || this.closest('.home-buttons'))) {
             e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                 targetElement.scrollIntoView({
                     behavior: 'smooth'
                 });
            }
        }
    });
});

/*=============== ДИНАМИЧЕСКОЕ ОБНОВЛЕНИЕ ГОДА В ФУТЕРЕ ===============*/
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

/*=============== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (ТЕМНАЯ/СВЕТЛАЯ) ===============*/
const themeButton = document.getElementById('theme-switch'); // ID кнопки переключения темы
const darkTheme = 'dark-theme'; // Класс темной темы (определите в CSS)
const iconTheme = 'uil-sun'; // Класс иконки для темной темы (солнце) - Unicons
// const iconTheme = 'fas-sun'; // Класс иконки для темной темы (солнце) - Font Awesome

// Предыдущая выбранная тема (из Local Storage)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Получаем текущую тему, проверяя класс dark-theme у body
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
// Получаем текущую иконку, проверяя класс iconTheme у кнопки
const getCurrentIcon = () => themeButton.querySelector('i').classList.contains(iconTheme) ? 'uil-sun' : 'uil-moon';
// const getCurrentIcon = () => themeButton.querySelector('i').classList.contains(iconTheme) ? 'fas-sun' : 'fas-moon';

// Если пользователь ранее выбрал тему
if (selectedTheme) {
    // Если валидация выполнена, мы спрашиваем, какая была проблема, чтобы знать, активировали ли мы dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.querySelector('i').classList[selectedIcon === iconTheme ? 'add' : 'remove'](iconTheme);
}

// Активация / деактивация темы вручную с помощью кнопки
if (themeButton) { // Проверяем, что кнопка существует на странице
    themeButton.addEventListener('click', () => {
        // Добавляем или удаляем класс dark-theme / iconTheme
        document.body.classList.toggle(darkTheme);
        themeButton.querySelector('i').classList.toggle(iconTheme);

        // Сохраняем выбранную тему и иконку в Local Storage
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}
/*=============== ДОПОЛНИТЕЛЬНО (если нужно) ===============*/
// Например, анимации при прокрутке (ScrollReveal библиотека)
// Валидация формы (хотя required атрибуты уже есть)
