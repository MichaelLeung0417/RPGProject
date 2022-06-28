class Combatant {
    battle: any;
    hubElement: HTMLDivElement;
    constructor(config:{},battle:any){
        Object.keys(config).forEach(key =>{
            this[key] = config[key];
        })
        this.battle = battle;
    }
    createElement(){
        //draw battle sence I guess
        this.hubElement = document.createElement('div');
        this.hubElement.classList.add("Combatant");
        this.hubElement.setAttribute('data-combatant', this.id); //id is eg,"player1" in Battle.ts(!understand at this monment)
        this.hubElement.setAttribute('data-team', this.team); //team is eg,"player" in Battle.ts(!understand at this monment)
        this.hubElement.innerHTML = (`
            <p class="Combatant_name">${this.name}</p>
            <p class="Combatant_level"></p>
            <div class="Combatant_charactor_crop">
                <img class="Combatant_character" alt="${this.name}" scr="${this.scr}" />
            </div>
            <img class="Combatant_type" src="${this.icon}" alt="${this.type}" />
            <svg viewBox="0 0 26 3" class="Combatant_life-container">
                <rec x=0 y=0 width"0%" height=1 fill="#82ff71" />
                <rec x=0 y=1 width"0%" height=2 fill="#3ef126" />
            </svg>
            <svg viewBox="0 0 26 2" class="Combatant_xp-container">
                <rec x=0 y=0 width"0%" height=1 fill="#ffd76a" />
                <rec x=0 y=1 width"0%" height=2 fill="#ffc934" />
            </svg>
            <p class="Combatant_status"></p>
        `);
    }

    init(){
        
    }
}