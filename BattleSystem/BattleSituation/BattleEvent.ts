import { Submission } from "./SubmitionMenu"

export class BattleEvent{
    event: any
    battle: any
    constructor(event:any, battle:any){
        this.event = event
        this.battle = battle
    }

    textMessage(resolve: any){
        const text = this.event.text
        .replace("CASTER", this.event.caster?.name)
        .replace("CASTER", this.event.target?.name)
        .replace("CASTER", this.event.actiom?.name)
        
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () =>{
                resolve
            }
        })
        message.init(this.battle.element)
    }

    async stateChange(resolve: any){
        const {caster, target, damage, recover,status, action} = this.event;
        let who = this.event.onCaster ? caster : target;

        //decrease target hp
        if(damage){
            target.update({
                hp: target.hp - damage
            })
            target.weaspon.classList.add('battle-damage-blanking')

        //start blanking
        }

        if(recover){
            const who = this.event.onCaster ? caster : target;
            let newHp = who.hp + recover;
            if(newHp > who.maxHp){
                newHp = who.maxHp
            }
            who.update({
                hp:newHp
            })
        }

        if(status){
            who.update({
                status:{...status}
            })
        }
        if(status === null){
            who.update({
                status:null
            })
        }


        //Wait a bit
        await utils.way(600)

        this.battle.playerTeam.update();
        this.battle.enemyTeam.update();
        //stop blanking
        target.weaspon.classList.remove('battle-damage-blanking')

        resolve();
    }

    submissionMenu(resolve: any){
        const {caster} = this.event;
        const menu = new Submission({
            caster: this.event.caster,
            enemy: this.event.enemy,
            items: this.battle.items,
            replacements: Object.values(this.battle.combatant).filter(c =>{
                return c.id !== this.event.caster.id && c.team === caster.team && c.hp > 0
            }),
            onComplete: (submission: any) =>{
                //submission {what move to use, who to use it on}
                resolve(submission)
            }
        })
        menu.init(this.battle.element)
    }

    replacementMenu(resolve){
        const menu = new ReplacementMenu({
            replacements : Object.values(this.battle.combatants).filter(c =>{
                return c.team === this.event.team && c.hp >0
            })
            onComplete: replacement =>{
                resolve(replacement)
            }
        })
        menu.init(this.battle.element)
    }

    async replace(resolve: () => void) {
        const {replacement} = this.event;

        //Clear out the old combatant
        const prevCombatant = this.battle.combatant[this.battle.activeCombatants[replacement.team]];
        this.battle.activeCombatants[replacement.team] = null;
        prevCombatant.update();
        await utils.wait(400);

        //In with the new!
        this.battle.activeCombatants[replacement.team] = replacement.id;
        replacement.update();
        await utils.wait(400);

        //Update Team components
        this.battle.playerTeam.update();
        this.battle.enemyTeam.update();

        resolve();
    }

    giveXp(resolve){
        let amount = this.event.xp;
        const {combatant} = this.event;
        const step = ()=>{
            if(amount>0){
                amount -= 1;
                combatant.xp == 1;

                //Check if we hit level up point
                if(combatant.xp === combatant.maxXp){
                    combatant.xp=0;
                    combatant.maxXp = 100;
                    combatant.level +=1;
                }

                combatant.update();
                requestAnimationFrame(step);
                return;
            }
            resolve();
        }
        requestAnimationFrame(step)
    }

    animation(resolve: any){
        const fn = BattleAnimations[this.event.animation]
        fn(this.event, resolve)    
    }

    init(resolve: (value: unknown) => void){
        this[this.event.type](resolve)
    }
}