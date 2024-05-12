;(function(){

    function insertSymbol(index) {
        // Inserir o elemento X ou O nos blocos
        const i = document.createElement('i')
        if ( players[0].playerBlue ) i.classList.add('fa-regular', 'fa-circle')
        if ( players[1].playerRed ) i.classList.add('fa-solid', 'fa-x')
        arrBlocks[index].append(i)
    }

    function alternatePlayer() {
        // Alterna entre os Players
        players.forEach( (player, i) => {
            for (let prop in player) {
                if (prop === 'playerBlue' || prop === 'playerRed') {
                    players[i][prop] = (players[i][prop]) ? false : true
                } 
            }
        })
    }

    function stylePlayer() {
        // Alterna entre os estilos do player que está jogando
        const playerBlue = document.querySelector('.playerBlue')
        const playerRed = document.querySelector('.playerRed')

        if (players[0].playerBlue) {
            playerBlue.classList.add('playNowBlue')
            document.querySelector('.game').style.background = 'radial-gradient(var(--blue) 15%, transparent)'
            if (playerRed.classList.contains('playNowRed')) playerRed.classList.remove('playNowRed')
            
            arrBlocks.forEach( block => {
                block.style.boxShadow = '0px 0px 10px var(--blue)' 
            })
        } else {
            playerRed.classList.add('playNowRed')
            document.querySelector('.game').style.background = 'radial-gradient(var(--red) 10%, transparent)'
            if (playerBlue.classList.contains('playNowBlue')) playerBlue.classList.remove('playNowBlue')
            
            arrBlocks.forEach( block => {
                block.style.boxShadow = '0px 0px 10px var(--red)' 
            })
        }
    }

    function addPoint(namePlay) {
        // Adiciona um ponto no objeto do player
        if (namePlay === 'Blue') players[0].pointBlue += 1  
        if (namePlay === 'Red') players[1].pointRed += 1  
        showPoint()
    }

    function showPoint() {
        // Imprimi ponto na tela
        document.getElementById('pointBlue').innerText = `${players[0].pointBlue}`
        document.getElementById('pointRed').innerText = `${players[1].pointRed}`
    }

    function randomFirthPlay() {
        // Um player aleatório
        const random = Math.floor( Math.random() * 2 )
        if (random) {
            players[0].playerBlue = false 
            players[1].playerRed = true
        } else {
            players[0].playerBlue = true 
            players[1].playerRed = false
        }
    }

    function play(x, y) {
        // Modifica a matriz binária do player que está jogando
        if (players[0].playerBlue) players[0].bitMapBlue[x][y] = 1
        if (players[1].playerRed) players[1].bitMapRed[x][y] = 1
        
        countPlay++
        resultPlay()
    }

    function resultPlay() {
        // Caso o resultado da matriz do player for igual ao padrãoWin, ele ganha o jogo.
        const defaultWin = [448, 56, 7, 292, 146, 73, 273, 84]

        function compareteWin(bitPlayer, name) {
            for (let i = 0; i < defaultWin.length; i++) {
                if ( defaultWin.includes(bitPlayer & defaultWin[i]) ) {
                    addPoint(name)
                    displayResult(name)
                    break
                }
            }
        }

        if (players[0].playerBlue) {
            const bitPlayer = conversionBitMapToDecimal(players[0].bitMapBlue)
            compareteWin(bitPlayer, 'Blue')
        } 

        if (players[1].playerRed) {
            const bitPlayer = conversionBitMapToDecimal(players[1].bitMapRed)
            compareteWin(bitPlayer, 'Red')
        }

        if (countPlay === 9) {
            displayResult('Velha')
        }    
    }

    function displayResult(name) {
        // Imprime na tela quem ganhou
        const p = document.createElement('p')
        p.textContent = `${name}${name !== 'Velha' ? ' ganhou!' : '!'}`

        if (name === 'Blue') {
            p.style.background = '#2222ff'
        } else if (name === 'Red') {
            p.style.background = '#ff2222'
        } else {
            p.style.background = '#888'
        } 

        const display = document.createElement('div')
        display.classList.add('resultPlay')
        display.append(p)

        document.body.insertAdjacentElement('afterbegin', display)

        setTimeout( () => {
            display.remove()
            reset()
        }, 1000)
    }

    function conversionBitMapToDecimal(bitMap) {
        // Converte a matriz do player em decimal
        let bitMapString = bitMap.join(',')
        while (bitMapString.includes(',')) {
            bitMapString = bitMapString.replace(',', '')
        }

        const bit = bitMapString.split('')
        let decimal = 0
        for (let i = 0; i < bit.length; i++) {
            const inverse = Number(bit[(bit.length - 1) - i])
                if ( inverse === 1 ) {
                    decimal += 2 ** i
                }
        }
        return decimal
    }

    function reset() {
        // Reseta tudo
        arrBlocks.forEach( block => {
            if (block.hasChildNodes()) block.firstElementChild.remove() 
        })
        players[0].bitMapBlue = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        players[1].bitMapRed = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        countPlay = 0
        randomFirthPlay()
        stylePlayer()
    }



    const players = [
        {
            playerBlue: false, 
            pointBlue: 0, 
            bitMapBlue: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        },
        {
            playerRed: false, 
            pointRed: 0, 
            bitMapRed: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        }
    ]

    let countPlay = 0 // Contagem das Jogadas

    const arrBlocks = Array.from(document.querySelectorAll('.block')) // Blocos do jogo

    document.querySelector('.game').addEventListener('click', (e) => {
        if ( !(e.target.classList.contains('block')) ) return // Garantir que seja um elemento com class block

        const [x, y] = [e.target.getAttribute('x') - 1, e.target.getAttribute('y') - 1]
        const indexBlock = arrBlocks.indexOf(e.target)

        if (arrBlocks[indexBlock].hasChildNodes()) return // Garantir que não seja colocando mais de um elemento no block

        insertSymbol(indexBlock)
        play(x, y)
        alternatePlayer()
        stylePlayer()
    })

    randomFirthPlay()
    stylePlayer()
    showPoint()
})()