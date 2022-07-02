import { endianness } from "os";

export class Submission{
    caster: string;
    enemy: string;
    onComplete: any;
    keyboardMenu: any;
    constructor({caster, enemy, onComplete, items}:{caster:string, enemy:string,onComplete:any, items:any}){
        this.caster = caster,
        this.enemy = enemy
        this.onComplete = onComplete;

        let quantityMap = {};
        items.forEach(item =>{
            if(item.team === caster.team){

                let existing = quantityMap[item.actionId];
                if(existing){
                    existing.quantity += 1
                }else{
                    quantityMap[item.actionId] = {
                        actionId: item.actionId,
                        quantity: 1
                        instanceId: item.instanceId,
                    }
                }
            }
        })
        this.items =Object.values(quantityMap);
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
                ...this.items.map(item => {
                    const action = Actions[item.actionId];
                    return {
                        label: action.name,
                        description: action.description,
                        right: ()=>{
                          return "x"+item.quantity,  
                        },
                        hander: () =>{
                            this.menuSubmit(action, item.instanceId)
                        }
                    }
                })
                backOption
            ]
        }
    }

    meueSubmit(action, instanceId=null){
        this.keyboardMenu?.end();

        this.onComplete({
            action,
            target: action.targetType === "friendly" ? this.caster : this.enemy,
            instanceId
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