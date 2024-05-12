;(function(){

    const telaOpening = document.createElement('div')
    telaOpening.classList.add('telaPlay')

    const p = document.createElement('p')
    p.innerText ='Jogo da velha'
    telaOpening.append(p)

    document.body.append(telaOpening)

    setTimeout(() => {
        telaOpening.style.opacity = '0'
        setTimeout(() => {
            telaOpening.remove()
        }, 500)
    }, 800)

})()