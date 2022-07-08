let playerHp = 250;

let Level = "MAX";

let actualHp = String(playerHp) + "px"

document.querySelector(".maxHP").innerHTML += `
<div class="HP"></div>
`
document.querySelector(".HP").style.background = "green" 
document.querySelector(".HP").style.width = actualHp
document.querySelector(".HP").style.height = "30px" 
document.querySelector(".HP").style.height = "20px" 

document.querySelector(".status").innerHTML += `
<div class="attack">ATK: 1000</div>
`

document.querySelector(".attack").style.position = "relative"
document.querySelector(".attack").style.top = "30px"
document.querySelector(".attack").style.left = "10px"

document.querySelector(".status").innerHTML += `
<div class="level">Lv.${Level}</div>
`
document.querySelector(".level").style.position = "relative"
document.querySelector(".level").style.top = "30px"
document.querySelector(".level").style.left = "10px"

