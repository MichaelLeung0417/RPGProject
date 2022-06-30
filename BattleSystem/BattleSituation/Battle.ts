import { TurnCycle } from "./turnCycle";
import { BattleEvent } from "./BattleEvent";
import {Combatant} from "./combatant"
export class Battle {
    element: HTMLDivElement;
    combatants: { player1: Combatant, enemy1: Combatant, enemy2: Combatant };
    activeCombatants: { player: string; enemy: string; };
    turnCycle: TurnCycle;
    constructor() {
        this.combatants = {
            "player1": new Combatant({
                //something we may not need here(the video refer to pokemon fight system so it may be some other thing for fight directly)
                team: "player",
                hp: 50,
                maxHp: 50,
                xp: 0,
                level: 1,
                status: null
            }, this),
            "enemy1": new Combatant({
                //something we may not need here(the video refer to pokemon fight system so it may be some other thing for fight directly)
                team: "enemy",
                hp: 50,
                maxHp: 50,
                xp: 30,
                level: 1,
                //status: null
            }, this),
            "enemy2": new Combatant({
                //something we may not need here(the video refer to pokemon fight system so it may be some other thing for fight directly)
                team: "enemy",
                hp: 50,
                maxHp: 50,
                xp: 20,
                level: 1,
                //status: null
            }, this),
        }
        this.activeCombatants={
            player: "player1",
            enemy: "enemy1,"
        }
    }

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

    init(container: any) {
        this.createElement();
        container.appendChild(this.element)
        Object.keys(this.combatants).forEach(key =>{
            let combatant = this.combatants[key]
            combatant.id = key;
            combatant.init(this.element)
        })
        
        this.turnCycle = new TurnCycle({
            battle:this,
            onNewEvent: (event: any) =>{
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this)
                    battleEvent.init(resolve)
                })
            }
        })
        this.turnCycle.init();
    }
}
