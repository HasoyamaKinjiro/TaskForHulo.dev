const sliderUl = document.querySelector('.slider-ul')
const btnRight = document.querySelector('.right')
const btnLeft = document.querySelector('.btn.left')

const btnClickFootLeft = () => {
    sliderUl.scrollLeft -= 200;
}

const btnClickFootRight = () => {
    sliderUl.scrollLeft += 200;
}

btnLeft.addEventListener('click', btnClickFootLeft)
btnRight.addEventListener('click', btnClickFootRight)
