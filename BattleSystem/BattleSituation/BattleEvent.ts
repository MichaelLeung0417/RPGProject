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
        const {caster, target, damage} = this.event;

        //decrease target hp
        if(damage){
            target.update({
                hp: target.hp - damage
            })
            target.weaspon.classList.add('battle-damage-blanking')

        //start blanking
        }


        //Wait a bit
        //stop blanking

        await utils.way(600)
        target.weaspon.classList.remove('battle-damage-blanking')

        resolve();
    }

    submissionMenu(resolve: any){
        const menu = new Submission({
            caster: this.event.caster,
            enemy: this.event.enemy,
            onComplete: (submission: any) =>{
                //submission {what move to use, who to use it on}
                resolve(submission)
            }
        })
        menu.init(this.battle.element)
    }

    animation(resolve: any){
        const fn = BattleAnimations[this.event.animation]
        fn(this.event, resolve)    
    }

    init(resolve: (value: unknown) => void){
        this[this.event.type](resolve)
    }
}