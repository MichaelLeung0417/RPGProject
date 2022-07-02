export class TurnCycle {
    battle: string;
    onNewEvent:any;
    currentTeam: string;
    constructor({battle, onNewEvent}:{battle:any, onNewEvent:any}){
        
        this.battle = battle;
        this.onNewEvent = onNewEvent
        this.currentTeam = "player" //or enemy turn
    }

    async turn(){
        //Gete the attacker who name caster in video
        const casterId = this.battle.activeCombatants[this.currentTeam];
        const caster = this.battle.combatants[casterId];
        const enemyId = this.battle.activeCombatants[caster.team === "player"?"enemy":"player"]
        const enemy = this.battle.combatants[enemyId]

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            enemy
        })

        const resultingEvent = caster.getReplaceedEvents(submission.action.success);
        for(let i=0; i<resultingEvent.length; i++){
            const event = {
                ...resultingEvent[i],
                submission,
                actiom: submission.action,
                caster,
                target: submission.target
            }
            await this.onNewEvent(event);
        }

        //Check for status expire
        const expireEvent = caster.decrementStatus();
        if(expireEvent){
            await this.onNewEvent(expireEvent)
        }


        //Check for post events
        //(Do thing after your original turn submission)
        const postEvent = caster.getPostEvent();
        for(let i=0; i < postEvent.length; i++ ){
            const event = {
                ...postEvent[i]
                submission,
                actiom: submission.action,
                caster,
                target: submission.target
            }
            await this.onNewEvent(event);
        }

        this.currentTeam = this.currentTeam === "player"? "enemy" : "player";
        this.turn();
    }
    async init(){
        await this.onNewEvent({
            type: 'textMessage',
            text: 'The battle is began'
        })

        //Start turn
        this.turn();
    }
}