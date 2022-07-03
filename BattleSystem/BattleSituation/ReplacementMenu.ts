import { KeyboardMenu } from '../BattleDecision/keyBoardMenue'

class ReplacementMenu {
    replacements: any;
    onComplete: any;
    keyboardMenu: KeyboardMenu;
    constructor({replacements, onComplete}:{replacements:any, onComplete:any}){
        this.replacements = replacements;
        this.onComplete = onComplete;
    }

    decide(){
        this.menuSubmit(this.replacements[0])
    }

    menuSubmit(replacement: any){
        this.keyboardMenu.end();
        this.onComplete(replacement);
    }

    showMenu(container: any){
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOption(this.replacements.map(c =>{
            return {
                label: c.name,
                description: c.description,
                handler: () =>{
                    this,this.menuSubmit(c)
                }
            }
        }))
    }


    init(container: any){
        if(this.replacements[0].isPlayerControlled){
            this.showMenu(container)
        }else{
            this.decide();
        }
    }
}