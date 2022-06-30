export class Submission{
    caster: string;
    enemy: string;
    onComplete: any;
    constructor({caster, enemy, onComplete}:{caster:string, enemy:string,onComplete:any}){
        this.caster = caster,
        this.enemy = enemy
        this.onComplete = onComplete;
    }

    decide(){
        this.onComplete({
            action: Actions[this.caster[0]],
            target: this.enemy
        })
    }

    init(container: any){

    }
}