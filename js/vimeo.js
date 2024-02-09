const iframe = document.querySelector('.iframe')
const player = new Vimeo.Player(iframe)

const videoIds = ['824804225','889793639','824804225','889793639','824804225','889793639','824804225','889793639'] // ID вашего видео на Vimeo

const apiUrls = videoIds.map(videoId => `https://vimeo.com/api/v2/video/${videoId}.json`)


Promise.all(apiUrls.map(url =>
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
))
    .then(data => {
        const dataFlat = data.flat()
        generateImgsVideo(dataFlat)
        return dataFlat
    })
    .then(data => {
        openModal(data)
        return data
    })
    .then(data => pagination(data))
    .catch(error => {
        console.error('Ошибка при получении данных:', error);
    })

function generateImgsVideo(data) {
    const imgs = document.querySelectorAll('.slider-li__img')
    imgs.forEach((img, id) => {
        img.src = data[id].thumbnail_large
    })
}

function openModal(data) {
    const imgs = document.querySelectorAll('.slider-li__img')

    imgs.forEach((img, id) => {
        img.addEventListener('click', (ev) => {
            const videoId = data[id].id
            const modalBackground = document.querySelector('.modal__background')

            modalBackground.style.display = 'flex'

            player.loadVideo(videoId).then(() => {
                player.play()
            })
        })
    })
}

function closeModal() {
    const modalBackground = document.querySelector('.modal__background')
    modalBackground.style.display = 'none'

    player.pause()
}

function pagination(data) {
    const paginationLi = document.querySelectorAll('.pagination-li')
    paginationLi.forEach((el, id) => {
        el.addEventListener('click', () => {
            const videoId = data[id].id

            player.loadVideo(videoId).then(() => {
                player.play()
            })
        })
    })
}

const modalClose = document.querySelector('.modal__close')
modalClose.addEventListener('click', closeModal)
















