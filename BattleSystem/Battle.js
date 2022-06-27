// image status (trying)
const scale = 2
const width = 16
const height = 18
const scaled_width = scale * width
const scaled_height = scale * height

const frame_limit = 12
const movement_speed = 2

//battle info (may send to the conbatant.js)
class Battle {
    constructor() {
        this.conbatant = {
            "player1": new Conbatant({
                hp:50,
                maxHp: 50,
                xp:0,
                level:1,
                status:null
            },this)
        }
    }

    //create battle charactor in html screen
    createElement() {
        this.element = document.createElement('div')
        this.element.classList.add('Battle')
        this.element.innerHTML = (`
        <div class='BattlePlayer1'>
            <img scr="https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png" alt="battle-Player1">
        </div>
        
        <div class='battleEnemy1'>
            <img scr="https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png" alt="battle-Enemy1">
        </div>  
        `)
    }
    

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}







