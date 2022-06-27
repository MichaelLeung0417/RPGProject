class combatant{
    constructor(config, battle){
        {
            Object.keys(config).forEach(key=>{
                this.key = config[key];
            })
        }
        this.battle = battle;
    }

    creatElement(){
        this.hubElement = document.createElement('div');
        this.hubElement.classList.add("Combatant");
        this.hubElement.setAttribute('data-combatant', this.id);
        this.hubElement.setAttribute('data-team', this.team);
    }

    init(){

    }
}