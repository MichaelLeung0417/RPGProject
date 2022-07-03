import { updateCommaList } from "typescript";

export class Combatant {
    battle: any;
    hubElement: HTMLDivElement;
    container: HTMLDivElement;
    hpFills: NodeListOf<Element>;
    xpFills: NodeListOf<Element>;
    hp: number;
    maxHp: number;
    xp:number;
    maxXp: number;
    team: string;
    id: string;
    name:string;
    scr: string;
    icon: string;
    type: string;
    status: {};
    constructor(config:{},battle:any){
        Object.keys(config).forEach(key =>{
            this[key] = config[key];
        })
        this.hp = typeof(this.hp) === "undefined"? this.maxHp : this.hp
        this.battle = battle;
    }

    get hpPercent(): number{
        const percent = this.hp / this.maxHp *100
        return percent > 0 ? percent: 0;
     }

     get xpPercent(): number{
        return this.xp / this.maxXp *100
     }

     get isActive(): boolean{
        return this.battle.activeCombatants[this.team] === this.id
     }
     get giveXp() {
        return this.level *20
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

        //it may be pokemon, weapon, skill, etc again(i don't know) but copy some as example belows
        //this.pokemon.classList.add('pokemon1'); for css tidy up?
        // this.pokemon.setAttribute("src", this.scr); weaspon image?
        //this.pokemon.setAttribute("alt", this.name); occur when pervious image disappear?
        //this.pokemon.setAttribute("data-team", this.team); tell weaspon belong to which team and its position

        this.hpFills = this.hubElement.querySelectorAll(".Combatant_life-container > rect")
        this.xpFills = this.hubElement.querySelectorAll(".Combatant_xp-container > rect")
    }

    update(change={}){
        //Update anything change(similar to draw() of P5)
        Object.keys(change).forEach(key =>{
            this[key] = change[key]
        });

        //show correct hub & weaspon according to updated active
        this.hubElement.setAttribute("data-active", this.isActive);
        //this.weasponElement.setAttribute("data-active", this.isActive);

        //update hp & xp precent fills (or what the bar look like)
        this.hpFills.forEach(rect=>rect.style,width= `${this.hpPercent}%`)
        this.xpFills.forEach(rect=>rect.style,width= `${this.xpPercent}%`)

        this.hubElement.querySelector("Combatant_level").innerHTML = this.level; //show the level of both side during the battle

        //Update status
        const statusElement = this.hubElement.querySelector(".Combatant_status");
        if(this.status){
            statusElement.innerText = this.status.type;
            statusElement.style.display = 'block';
        }else{
            statusElement.innerText = '';
            statusElement.style.display = 'none';
        }

    }

    getReplacedEvent(originalEvent:string){
        if(this.status?.type === 'clumsy' && utils.randomFromArray([true,false,false])){
            return [
                {text: "textMessage", text: `${this.name} flops over!`},
            ]
        }
    }

    getPostEvent() {
        if(this.status?.type === "saucy"){
            return [
                {type: "textMessage", text: "Feeling' saucy"},
                {type: "stateChange", recover: 5, onCaster: true}
            ]
        }

        return []
    }

    decrementStatus(){
        if(this.status?.expiresIn > 0){
            this.status.expiresIn === 0){
                this.update({
                    status: null
                })
                return {
                    type: "textMessage",
                    text: "Status expired"
                }
            }
        }
    }


    init(container: HTMLDivElement){
        this.createElement();
        container.appendChild(this.hubElement)
        //it may be pokemon, weapon, skill, etc again(i don't know) but copy some as example belows
        //container.appendChild(this.pokemonElement)
        this.update();
    }
}