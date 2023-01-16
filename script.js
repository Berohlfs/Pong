const canvas = document.querySelector('canvas')
const canvasCtx = canvas.getContext('2d')

function setUp(){
    canvas.width = canvasCtx.width = 330
    canvas.height = canvasCtx.height = 230
}
setUp()

function draw(){
    //Desenhando o campo
    canvasCtx.fillStyle = 'green'
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
    //Desenhando a linha
    canvasCtx.fillStyle = 'white'
    canvasCtx.fillRect(canvas.width/2 - 1, 0, 2, canvas.height)
    //Desenhando as raquetes
    canvasCtx.fillRect(10, 130, 6, 60)
    canvasCtx.fillRect(canvas.width - 16, 70, 6, 60)
    //Desenhando a bolinha
    canvasCtx.beginPath()
    canvasCtx.arc(60, 100, 5, 0, 2*Math.PI, false)
    canvasCtx.fill()
    //Desenhando o placar
    canvasCtx.fillStyle = 'darkgreen'
    canvasCtx.textAlign = 'center'
    canvasCtx.font = 'bold 60px Arial'
    canvasCtx.textBaseline = 'top'
    canvasCtx.fillText('3', canvas.width/4, 30)
    canvasCtx.fillText('1', canvas.width/4 + canvas.width/2, 30)
}
draw()