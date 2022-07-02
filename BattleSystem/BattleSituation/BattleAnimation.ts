import { updateCommaList } from "typescript";
import { isArrayBufferView } from "util/types";

window.BattleAnimations = {
    async spin(event: any, onComplete: any) {
        const element = event.caster.weasponElement;
        const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spinleft";
        element.classList.add(animationClassName);

        //Remove class when animation is fully complete
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, { once: true });

        //Continue battle cycle right around when the battle weaspon collide
        await utils.wait(100);
        onComplete()
    },

    async glob(event:any, onComplete: () => void){
        const {caster} = event;
        let div = document.createElement("div");
        div.classList.add(caster.team === "player" ? "battle-glob-right" : "battle-glob-left");

        div.innerHTML = (`
            <svg viewBox="0 0 32 32" width="32" height="32">
                <circle cs="16" cy="16" r="16" fill="${event.color}"/>
            </svg>
        `);

        //Remove class when animation is full complete
        div.addEventListener("animationed", ()=>{
            div.remove();
        });

        document.querySelector(".Battle")?.appendChild(div);

        await utils.wait(820);
        onComplete();
    }
}