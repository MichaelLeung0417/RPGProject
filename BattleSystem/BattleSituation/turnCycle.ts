export class TurnCycle {
    battle:any;
    onNewEvent:any;
    currentTeam: string;
    onWinner: any;
    constructor({battle, onNewEvent, onWinner}:{battle:any, onNewEvent:any, onWinner:any}){
        
        this.battle = battle;
        this.onNewEvent = onNewEvent
        this.onWinner = onWinnerr
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

        //stop here if we are replacing this weapon
        if(submission.replacement) {
            await this.onNewEvent({
                type: "replace",
                replacement: submission.replacement
            })
            await this.onNewEvent({
                type: "textMessage",
                text: `Go get 'em, ${submission.replacement.name}!`
            })
            this.nextTurn();
            return;
        }

        if(submission.instanceId){
            //add to list to presist to player state later
            this.battle.usedInstancedIds[submission.instanceId]= true;
            //Removing item from battle status
            this.battle.items = this.battle.item.filter(i=>i.instanceId!== submission.instanceId)
        }

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

        //Did target die
        const targetDead = submission.target.hp <=0;
        if(targetDead){
            await this.onNewEvent({
                type: "textMessage", text: `${submission.target.name} is ruined!`
            })
            if(submission.target.team === "enemy"){
                const playerActivePizzaId = this.battle.activeCombatants.player;
                const xp = submission.target.giveXp;

                await this.onNewEvent({
                    type: "textMessage",
                    text: `Gained ${xp} XP!`
                })

                await this.onNewEvent({
                    type: "giveXp",
                    xp,
                    combatant: this.battle.combatants[playerActivePizzaId]
                })
            }
        }

        //Did we have a winner team?
        const winner = this.getWinningTeam();
        if(winner){
            await this.onNewEvent({
                type: "textMessage",
                text: "Winner!"
            })
            //End the battle -> ToDo
            this.onWinner(winner);
            return;
        }

        //We have a dead target, but still no winnerm so bring in  replacement
        if(targetDead){
            const replacement = await this.onNewEvent({
                type: "replacementMenu",
                team: submission.target.team
            })
            await this.onNewEvent({
                type: "replace",
                replacement: replacement
            })
            await this.onNewEvent({
                type: 'textMessage',
                text: `${replacement.name} appears!`
            })
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

        this.nextTurn();
    }

    nextTurn(){
        this.currentTeam = this.currentTeam === "player"? "enemy" : "player";
        this.turn();
    }

    getWinningTeam(){
        let aliveTeams = {};
        Object.values(this.battle.combatants).forEach(c =>{
            if(c.hp > 0){
                aliveTeams[c.team] = true;
            }
        })
        if(!aliveTeams["player"]) {return "enemy"}
        if(!aliveTeams["enemy"]) {return "player"}
        return null;
    }


    async init(){
        await this.onNewEvent({
            type: 'textMessage',
            text: `${this.battle.enemy.name} want to throw down`
        })

        //Start the first turn
        this.turn();
    }
}