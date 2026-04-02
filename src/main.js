const player1 = {
    Nome: "Mario",
    Velocidade: 4,
    Manobrabilidade: 3,
    Poder: 3, 
    Pontos: 0,
}

const player2 = {
    Nome: "Luigi",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 4, 
    Pontos: 0,
}

async function rollDice(){
    let randomm = Math.random()*6
    let result = Math.ceil(randomm)
    // apenas usado para comparar os usos de floor(), ceel() ou round() console.log(randomm)
    return result
}

async function getRandomBlock(){
    let random = Math.random()
    let result

    switch(true){
        case random < 0.33:
            result = "RETA"
            break
        case random <0.6:
            result = "CURVA"
            break
        default:
            result = "CONFRONTO"
            break
    }
    return result
}

async function PlayRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`)

        //Sortear Bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // Rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()
        
        //Teste de habilidade
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0
    
    async function logRollResult(){
        console.log(`${character1.Nome} 🎲 rolou um dado de velocidade ${diceResult1} + ${character1.Velocidade} = ${totalTestSkill1}`)
        console.log(`${character2.Nome} 🎲 rolou um dado de velocidade ${diceResult2} + ${character2.Velocidade} = ${totalTestSkill2}`)

        //define pontos e anuncia vencedor
        if (totalTestSkill1>totalTestSkill2){
            character1.Pontos+=1
            console.log(`${character1.Nome} vendeu a partida! ${character1.Nome} ganhou 1 ponto`)

        } else if (totalTestSkill2>totalTestSkill1){
            character2.Pontos+=1
            console.log(`${character2.Nome} vendeu a partida! ${character2.Nome} ganhou 1 ponto`)

        } else{
            console.log("EMPATE! Ninguém ganhou ou perdeu ponto!")
        }
    }

    if (block==="RETA"){
        totalTestSkill1 = diceResult1 + character1.Velocidade
        totalTestSkill2 = diceResult2 + character2.Velocidade

        await logRollResult()
    }
    if (block==="CURVA"){
        totalTestSkill1 = diceResult1 + character1.Manobrabilidade
        totalTestSkill2 = diceResult2 + character2.Manobrabilidade

        await logRollResult()
    }   
    if (block==="CONFRONTO"){
        totalTestSkill1 = diceResult1 + character1.Poder
        totalTestSkill2 = diceResult2 + character2.Poder

        console.log(`${character1.Nome} 🎲 rolou um dado de poder ${diceResult1} + ${character1.Poder} = ${totalTestSkill1}`)
        console.log(`${character2.Nome} 🎲 rolou um dado de poder ${diceResult2} + ${character2.Poder} = ${totalTestSkill2}`)

        //define pontos e anuncia vencedor
        if ((totalTestSkill1>totalTestSkill2) && (character2.Pontos!=0)){ // Poderia ser reescrito com o if ternário como: character2.Pontos -= totalTestSkill1>totalTestSkill2 && character2.Pontos!=0 ? 1 : 0 
            character2.Pontos-=1
            console.log(`${character2.Nome} perdeu a partida! ${character2.Nome} perdeu 1 ponto`)

        } else if ((totalTestSkill2>totalTestSkill1) && (character1.Pontos!=0)){
            character1.Pontos-=1
            console.log(`${character2.Nome} vendeu a partida! ${character1.Nome} perdeu 1 ponto`)
        
        }  else{
            console.log("EMPATE! Ninguém ganhou ou perdeu ponto!")
        }
    }
    console.log('----------------------')
    }
}

(async function main(){
    console.log(
        `🏁🚨 Corrida entre ${player1.Nome} e ${player2.Nome} começando... \n 
        `)

    await PlayRaceEngine(player1, player2)
    console.log("||||||||||||||||||||||")
    console.log("Resultado Final:")
    console.log(`${player1.Nome} obteve ${player1.Pontos} pontos`)
    console.log(`${player2.Nome} obteve ${player2.Pontos} pontos`) 
    console.log("||||||||||||||||||||||")
    if (player1.Pontos > player2.Pontos){
        console.log(`🏁 ${player1.Nome} VENCEU 🏁`)
    } else if (player2.Pontos > player1.Pontos){
        console.log(`🏁 ${player2.Nome} VENCEU 🏁`)
    } else{
        console.log(`🏁 EMPATE! NÃO HÁ VENCEDORES 🏁`)
    }
    console.log("||||||||||||||||||||||||||||||||")
})();