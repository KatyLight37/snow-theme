function snowTheme() {
  let c = null
  let ctx
  let star = []
  let galaxy
  let miniMode = false
  let galaxyWidth, galaxyHeight

  function createStar() {
    for (let i = 0; i < 200; i++) {
      star.push({
        x: Math.floor(Math.random() * galaxyWidth),
        y: Math.floor(Math.random() * galaxyHeight),
        s: Math.random() * 6 + 2
      })
    }
  }

  function starS(star) {
    ctx.beginPath()
    ctx.arc(star.x, star.y, 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }

  function starMove() {
    for (let i = 0; i < star.length; i++) {
      star[i].y += star[i].s
      if (star[i].y > galaxyHeight) {
        star[i].y = 0
        star[i].x = Math.floor(Math.random() * galaxyWidth)
        if (miniMode) {
          star[i].s = Math.random() * 2 + .5
        } else {
          star[i].s = Math.random() * 3 + 2
        }
      }
      starS(star[i])
    }
  }

  function setScreen() {
    galaxy.height = document.documentElement.clientHeight
    galaxy.width = document.documentElement.clientWidth
    if (galaxy.height > 600) {
      if (miniMode) {
        for (let i = 0; i < star.length; i++) {
          star[i].s = Math.random() * 3 + 2
        }
        miniMode = false
      }
    } else {
      if (!miniMode) {
        for (let i = 0; i < star.length; i++) {
          star[i].s = Math.random() * 2 + .5
        }
        miniMode = true
      }
    }
    galaxyHeight = galaxy.height
    galaxyWidth = galaxy.width
    ctx.fillStyle = 'rgba(219,239,246,1)'
  }

  galaxy = document.getElementById('galaxy')
  ctx = galaxy.getContext('2d')
  miniMode = document.documentElement.clientHeight < 600
  setScreen()
  createStar()
  setInterval(() => {
    ctx.clearRect(0, 0, galaxy.width, galaxy.height)
    starMove()
  }, 10)
  window.onresize = () => {
    setScreen()
  }

}

var userData = {
  '100001': {
    avatar: 'https://img2.baidu.com/it/u=464736753,4100005328&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=519',
    userName: 'Katy Perry',
    sentence: '',
    email: '164@qq.com',
  },
  '100002': {
    avatar: 'https://img0.baidu.com/it/u=2664693041,1184290998&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
    userName: 'Lady Gaga',
    sentence: 'i\'m Lady Gaga',
    email: '164@qq.com',
  },
  '100003': {
    avatar: 'https://img0.baidu.com/it/u=3054808094,4164279218&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
    userName: 'Cascada',
    sentence: 'i\'m Cascada',
    email: '164@qq.com',
  },
  '100004': {
    avatar: 'https://img2.baidu.com/it/u=1090851470,2854588604&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=500',
    userName: 'Rihana',
    sentence: 'i\'m Rihana',
    email: '164@qq.com',
  },
  '100005': {
    avatar: 'https://img0.baidu.com/it/u=508817106,3971212385&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=281',
    userName: 'Taylor',
    sentence: 'i\'m Taylor',
    email: '164@qq.com',
  }
}

function jumpToSubject(e) {
  let text = e.target.innerText

}
function queryUserPage(e){
  e.stopPropagation();
}
function queryPost(e) {

}

function positionFormat(dom, target, maxWidth, maxHeight) {
  let rect = target.getBoundingClientRect()
  let safeBottom1 = document.documentElement.clientHeight - rect.bottom
  let safeBottom2 = document.documentElement.clientHeight - rect.bottom
  let safeLeft1 = document.documentElement.clientWidth - rect.left
  let safeLeft2 = document.documentElement.clientWidth - target.offsetLeft
  let safeWidth = document.documentElement.clientWidth
  dom.classList.add('visible')
  dom.style.position = 'absolute'
  if (maxWidth === 'auto') {
    maxWidth = dom.offsetWidth
  }
  if (maxHeight === 'auto') {
    maxHeight = dom.offsetHeight
  }
  if (safeWidth < maxWidth) {
    dom.style.width = (safeWidth - 20) + 'px'
    dom.style.left = '-' + (target.offsetLeft - 10) + 'px'
  } else {
    dom.style.width = ''
    console.log('jso')
    if (target.dataset.right !== undefined) {
      dom.style.right = 0
      dom.style.left = ''
    } else {
      if (safeLeft2 < maxWidth) {
        dom.style.left = '-' + (rect.left - 10) + 'px'
        dom.style.right = ''
      } else if (safeLeft1 < maxWidth) {
        dom.style.left = '-' + (target.offsetLeft - 10) + 'px'
        dom.style.right = ''
      }else{
        dom.style.left = 0 + 'px'
        dom.style.right = ''
      }
    }

  }
  if (safeBottom1 < maxHeight) {
    dom.style.bottom = (target.offsetHeight) + 'px'
    dom.style.top = ''
  } else {
    dom.style.top = (target.offsetHeight) + 'px'
    dom.style.bottom = ''
  }
  target.append(dom)

}

function queryAuthor(e) {
  let target = e.target
  let id = target.dataset.id
  let data = userData[id]

  authorDom.querySelector('.userName').innerText = data.userName
  if (data.sentence) {
    authorDom.querySelector('.sentence').innerText = data.sentence
   } else {
    authorDom.querySelector('.sentence').innerText = ''

  }
  let url = 'url("' + data.avatar + '")'
  authorDom.querySelector('.avatar').style.backgroundImage = url
  positionFormat(authorDom, target, 520, 220)
  // let left = e.target.offsetWidth + e.target.offsetLeft + 10
  // let top = e.target.offsetHeight + e.target.offsetTop
  /*计算剩余空间*/
}

function queryAuthorEnd() {
  authorDom.classList.remove('visible')
}

function querySubject(e) {
  //搜索
  let text = e.target.innerText

  positionFormat(subjectDom, e.target, 320, 120)
}

function querySubjectEnd() {
  subjectDom.classList.remove('visible')
}

function queryLink(e) {
  let text = e.target.href
  let left = 0
  let top = e.target.offsetHeight

  linkDom.querySelector('.link-info-inner').innerText = text
  positionFormat(linkDom, e.target, 'auto', 'auto')

}

function queryLinkEnd() {
  linkDom.classList.remove('visible')

}
