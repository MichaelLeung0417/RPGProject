class Submission{
    caster: string;
    onComplete: any;
    constructor({caster, enemy, onComplete}:{caster:string, enemy:string,onComplete:any}){
        this.caster = caster,
        this.enemy = enemy
        this.onComplete = onComplete;
    }

    init(container){

    }
}