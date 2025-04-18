/*=============== ПОКАЗ/СКРЫТИЕ МОБИЛЬНОГО МЕНЮ ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'); // Нужна кнопка закрытия в HTML, если используете

/* Показ меню */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
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

/*=============== ДОПОЛНИТЕЛЬНО (если нужно) ===============*/
// Например, анимации при прокрутке (ScrollReveal библиотека)
// Валидация формы (хотя required атрибуты уже есть)
