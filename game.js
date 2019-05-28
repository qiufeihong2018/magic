// 创建画布
const canvas = wx.createCanvas()
const context = canvas.getContext('2d')

// 创建矩形
context.fillStyle = 'red'
context.fillRect(canvas.width / 2 - 50, 0, 100, 100)

function drawRect(x, y) {
  context.clearRect(x, y - 1, 100, 100)
  context.fillRect(x, y, 100, 100)
}

const rectX = canvas.width / 2 - 50
let rectY = 0

// 10毫秒定时器
setInterval(function() {
  drawRect(rectX, rectY++)
}, 10)


// 创建飞机
const image = wx.createImage()

const imgX = canvas.width / 2 - 100
const imgY = 500
image.src = 'img/plane.png'
image.onload = function() {
  context.drawImage(image, imgX, imgY)
}

// 触摸移动
let touchX = imgX
let touchY = imgY

wx.onTouchMove(function(res) {
  // 清楚上一个飞机
  context.clearRect(touchX, touchY, 186, 130)
  // 重新获取x和y
  touchX = res.changedTouches[0].clientX
  touchY = res.changedTouches[0].clientY
  // 画飞机
  context.drawImage(image, touchX, touchY)
  // 判断飞机是否碰撞下落的矩形
  if (touchX >= rectX - 100 && touchX <= rectX + 100 && touchY >= rectY - 100 && touchY <= rectY + 100) {
    wx.showModal({
      title: 'fail',
      content: '发生碰撞',
    })
  }
})
