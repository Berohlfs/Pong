//Acessa o <canvas> pelo DOM
const canvas = document.querySelector('canvas')
//Define o contexto dimensional do canvas
const canvasCtx = canvas.getContext('2d')
//Estabelece o comprimento e a largura do canvas e do contexto
function setUp() {
    canvas.width = canvasCtx.width = window.innerWidth
    canvas.height = canvasCtx.height = window.innerHeight
}
//Objetos
const campo = {
    draw: function(){
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
    }
}
const linha = {
    draw: function(){
        canvasCtx.fillRect(canvasCtx.width/2-1,0,2,canvasCtx.height)
    }
}
const raquete1 = {
    draw: function(){
        canvasCtx.fillRect(10,canvasCtx.height/2-50,8,100)
    }
}
const raquete2 = {
    draw: function(){
        canvasCtx.fillRect(canvasCtx.width-18,canvasCtx.height/2-50,8,100)
    }
}
const bolinha = {
    draw: function(){
        canvasCtx.beginPath()
        canvasCtx.arc(100,150,5,0,2*Math.PI,false)
        canvasCtx.fill()
    }
}
const placar1 = {
    draw: function(){
        canvasCtx.fillText('3',canvasCtx.width/4,30)
    }
}
const placar2 = {
    draw: function(){
        canvasCtx.fillText('1',canvasCtx.width/4+canvas.width/2,30)
    }
}
//Desenha os elementos gráficos estáticos
function draw() {
    //Desenha o campo
    canvasCtx.fillStyle = 'green'
    campo.draw()
    //Desenha a linha divisória
    canvasCtx.fillStyle = 'white'
    linha.draw()
    //Desenha as raquetes
    raquete1.draw()
    raquete2.draw()
    //Desenha a bolinha
    bolinha.draw()
    //Desenha o placar
    canvasCtx.font = "bold 60px Arial"
    canvasCtx.textAlign = "center"
    canvasCtx.textBaseline = "top"
    canvasCtx.fillStyle = "darkgreen"
    placar1.draw()
    placar2.draw()
}
//Chamada das funções
setUp()
draw()