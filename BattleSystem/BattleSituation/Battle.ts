import { TurnCycle } from "./turnCycle";
import { BattleEvent } from "./BattleEvent";
import { Combatant } from "./combatant"
import { isWhileStatement } from "typescript";
export class Battle {
    element: HTMLDivElement;
    combatants: { player1: Combatant, player2: Combatant, enemy1: Combatant, enemy2: Combatant };
    activeCombatants: { player: string; enemy: string; };
    turnCycle: TurnCycle;
    items: { actionId: string; instanceId: string; team: string; }[];
    constructor({ enemy, onComplete }) {
        this.enemy = enemy;
        this.onComplete = onComplete;
        this.combatants = {
            // "player1": new Combatant({
            //     //something we may not need here(the video refer to pokemon fight system so it may be some other thing for fight directly)
            //     team: "player",
            //     hp: 50,
            //     maxHp: 50,
            //     xp: 0,
            //     maxXp:100,
            //     level: 1,
            //     status: null,
            //     isPlayerControlled: true
            // }, this),
            // "player2": new Combatant({
            //     //something we may not need here(the video refer to pokemon fight system so it may be some other thing for fight directly)
            //     team: "player",
            //     hp: 50,
            //     maxHp: 50,
            //     xp: 0,
            //     maxXp:100,
            //     level: 1,
            //     status: null,
            //     isPlayerControlled: true
            // }, this),
            // "enemy1": new Combatant({
            //     //something we may not need here(the video refer to pokemon fight system so it may be some other thing for fight directly)
            //     team: "enemy",
            //     hp: 50,
            //     maxHp: 50,
            //     xp: 30,
            //     level: 1,
            //     //status: null
            // }, this),
            // "enemy2": new Combatant({
            //     //something we may not need here(the video refer to pokemon fight system so it may be some other thing for fight directly)
            //     team: "enemy",
            //     hp: 50,
            //     maxHp: 50,
            //     xp: 20,
            //     level: 1,
            //     //status: null
            // }, this),
        }

        this.activeCombatants = {
            player: null,//"player1",
            enemy: null,//"enemy1,"
        }

        //Dynamically add the Player team
        window.playerStatus.lineup.forEach(id => {
            this.addCombatant(id, 'player', window.playerStatus.pizzas[id])
        })

        //Now the enemy team
        Object.keys(this.enemy.pizzas).forEach(key => {
            this.addCombatant("e_" + key, 'enemy', this.enemy.pizzas[key])
        })

        //Start empty
        this.items = []

        //Add in player items
        window.playerState.items.forEach(item => {
            this.items.push({
                ...item,
                team: "player"
            })
        })

        this.usedInstanceIds = {};

    }

    addCombatant(id: string | number, team: string, config: {}) {
        this.combatants[id] = new Combatant({
            ...Pizzas[config, pizzaId],
            ...config,
            team,
            isPlayerControlled: team === "player"
        }, this)
        //Populate first active pizza
        this.activeCombatants[team] = this.activeCombatants[team] || id
    }

    createElement() {
        this.element = document.createElement('div')
        this.element.classList.add('Battle')
        this.element.innerHTML = (`
                <div class='BattlePlayer1'>
                    <img scr="https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png" alt="battle-Player1">
                </div>
                
                <div class='battleEnemy1'>
                    <img scr="${this.enemy.src}" alt="${this.enemy.name}">
                </div>  
                `)
    }

    init(container: any) {
        this.createElement();
        container.appendChild(this.element)

        this.playerTeam = new Team("player", "Hero");
        this.enemyTeam = new Team("enemt", "Bully")

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key]
            combatant.id = key;
            combatant.init(this.element)

            //Add to correct team
            if (combatant.team === "player") {
                this.playerTeam.combatants.push(combatant)
            } else if (combatant.team === "enemy") {
                this.enemyTeam.combatants.push(combatant)
            }
        })

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: (event: any) => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this)
                    battleEvent.init(resolve)
                })
            },
            onWinner: winner => {
                if (winner === "player") {
                    const playerStatus = window.playerStatus;
                    Object.keys(playerStatus).forEach(id => {
                        const playerStatusPizza = playerStatus.pizzas[id];
                        const combatant = this.combatants[id];
                        if (combatant) {
                            playerStatusPizza.hp = combatant.hp;
                            playerStatusPizza.xp = combatant.xp;
                            playerStatusPizza.MaxXp = combatant.maxXp;
                            playerStatusPizza.level = combatant.level;
                        }
                    })

                    //Get rid of player used item
                    playerStatus.items = playerStatus.items.filter(item=>{
                        return !this.usedInstancedIds[item.instanceId]
                    })

                }
                this.element.remove();
                this.onComplete();
            }
        })

        // this.playerTeam.init(this.element)
        // this.enemyTeam.init(this.element)

        this.turnCycle.init();
    }
}
