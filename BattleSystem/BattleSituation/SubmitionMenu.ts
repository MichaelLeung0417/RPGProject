import { endianness } from "os";

export class Submission{
    caster: string;
    enemy: string;
    onComplete: any;
    keyboardMenu: any;
    constructor({caster, enemy, onComplete}:{caster:string, enemy:string,onComplete:any}){
        this.caster = caster,
        this.enemy = enemy
        this.onComplete = onComplete;
    }

    getPages(){
        return {
            root: [
                {
                    label: "Attack",
                    description: "Choose an attack",
                    handler: ()=>{
                        //Do something when chosen...
                        this.keyboardMenu.setOptions(this.getPages().attacks)
                    },
                },
                {
                    label: "Item",
                    description: "Choose an item",
                    disable: true,
                    handler: ()=>{
                        //Go to item page...
                        this.keyboardMenu.setOptions(this.getPages().item)
                    }
                },
                {
                    label: "Swap",
                    description: "Change another weapon",
                    handler: ()=>{
                        //See weaspon options...
                    }
                },
            ],
            attacks:[
                ...this.caster.actions.map(key => {
                    const action = Actions[key];
                    return {
                        label: action.name,
                        description: action.description,
                        hander: () =>{
                            this.menuSubmit(action)
                        }
                    }
                })
                backOption
            ],
            item: [
                //item will go here
                backOption
            ]
        }
    }

    meueSubmit(action, instanceId=null){
        this.keyboardMenu?.end();

        this.onComplete({
            action,
            target: action.targetType === "friendly" ? this.caster : this.enemy
        })
    }

    decide(){
        //TODO: Enemies should randomly decide what to do...
        this.meueSubmit(Action[this.caster.action[0]]);
    }

    showMenu(container: any){
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions(this.getPages().root)
    }

    init(container: any){
        if(this.caster.isPlayerControlled){
            //Show UI
            this.showMenu(container)
        }else{
            this.decide()
        }
    }
}