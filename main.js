const imgs = [
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-1026-22-P13-MVM-Wk1-en.jpeg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220801-summer-en.jpg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220801-LG-TV-en1.jpg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220801-backyard-oasis-en.jpg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220801-ipads-en.jpg`
]

const descriptions = [
    `Savings`,
    `Summer`,
    `TV`,
    `Backyard`,
    `iPads`
]

const data = {
    imgs,
    descriptions,
    index: 0,
    timerID: null,
    arrButtons: []
}

const objs = {
    img: document.querySelector('.carousel img'),
    btnBar: document.querySelector('.carousel .btnBar'),
    navPrev: document.querySelector('.btnNav.prev'),
    navNext: document.querySelector('.btnNav.next')
}

const cbClick = evt => {
    let {imgid} = evt.target.dataset
    console.log('type of imgid', typeof (imgid))
    imgid = Number(imgid)
    console.log('type of imgid', typeof (imgid))

    objs.img.src = data.imgs[imgid]
}

const timerHandler = () => {
    data.index++
    if (data.index === data.imgs.length) {
        data.index = 0
    }
    update(data.index)
}
const startAnimate = () => {
    data.timerID = setInterval(timerHandler, 3 * 1000)
}

const stopAnimate = () => {
    if (data.timerID) {
        clearInterval(data.timerID)
        data.timerID = null
    }
}

const updatedSelected = index => {
    data.arrButtons.forEach((ele, inx) => {
        ele.className = ''
        if (inx === index) {
            data.arrButtons[index].className = 'btnSelected'
        }
    })
}

const cbMouseEnter = evt => {
    stopAnimate()
}

const cbMouseLeave = evt => {
    startAnimate()
}

const update = index => {
    updatedSelected(index)
    objs.img.src = data.imgs[index]}

const cbPagePrev = evt => {
    if (data.index > 0) {
        data.index--
        update(data.index)
    }
}

const cbPageNext = evt => {
    if (data.index < data.imgs.length - 1) {
        data.index++
        update(data.index)
    }
}

// create carousel based on the array
const createCarousel = () => {
    objs.img.src = data.imgs[data.index]
    objs.img.addEventListener('mouseenter', cbMouseEnter)
    objs.img.addEventListener('mouseleave', cbMouseLeave)
    objs.navPrev.addEventListener('click', cbPagePrev)
    objs.navNext.addEventListener('click', cbPageNext)

    for (let i = 0; i < imgs.length; i++) {
        let eleBtn = document.createElement('button')
        eleBtn.innerText = data.descriptions[i]
        eleBtn.dataset.imgid = i
        eleBtn.addEventListener('click', cbClick)
        objs.btnBar.appendChild(eleBtn)
        data.arrButtons.push(eleBtn)
        if (i === data.index) {
            updatedSelected(i)
        }
    }
}

createCarousel()
startAnimate()
