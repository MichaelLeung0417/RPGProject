import { Submission } from "./SubmitionMenu"

export class BattleEvent{
    event: any
    battle: any
    constructor(event:any, battle:any){
        this.event = event
        this.battle = battle
    }

    textMessage(resolve: any){
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () =>{
                resolve
            }
        })
        message.init(this.battle.element)
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

    init(resolve: (value: unknown) => void){
        this[this.event.type](resolve)
    }
}