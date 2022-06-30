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
    }
}