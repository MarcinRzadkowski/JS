let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const intervalTime = 3000;
let slideInterval;

document.getElementById('next').addEventListener('click', nextSlide);
document.getElementById('prev').addEventListener('click', prevSlide);
dots.forEach(dot => dot.addEventListener('click', function() {
    currentSlide = parseInt(this.getAttribute('data-slide'));
    updateSlider();
}));

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, intervalTime);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

slider.addEventListener('mouseover', stopSlideShow);
slider.addEventListener('mouseout', startSlideShow);

dots[0].classList.add('active');
startSlideShow();            
        