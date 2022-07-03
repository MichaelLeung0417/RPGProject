//it will collaborate with keyPressListener and submitionMenue
export class KeyboardMenu{
    options: any;
    constructor(){
        this.options = []; // set by updater method
        this.up = null;
        this.down = null;
        this.preFocus = null;
    }

    setOption(options: any){
        this.options = options;
        this.createElement.innerHTML = this.options.map((option: { description: any; label: any; }, index: any)=>{
            const disabledAttr = option.disableed ? "disabled" : '';
           
            return (`
                <div class="option">
                    <button ${disabledAttr} data-button="${index}" data-description="${option.description}">
                        ${option.label}
                    </button>
                    <span class"right">${option.right ? option.right(): ""}</span>
                </div>
            `)
        }).join("");

        this.element.querySelectorAll("button").forEach(button=>{
            button.addEventListener("click", ()=>{
                const chosenOption = this.options[Number(button.dataset.button)];
                chosenOption.handler();
            })
            button.addEventListener("mouseenter", ()=>{
                button.focus();
            })
            button.addEventListener("focus", ()=>{
                this.preFocus = button;
                this.descriptionElementText.innerHTML = button.dataset.description;
            })
        })

        setTimeout(() => {
            this.element.querySelector("button[data-button]:not([disabled])").focus();
        }, 10);
    }

    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("KeyboardMenu")

        //Description box element
        this.descriptionElement = document.createElement("div");
        this.descriptionElement.classList.add("DescriptionBox");
        this.descriptionElement.innerHTML = (`<p></p>`)
        this.descriptionElemenText = this.descriptionElement.querySelector("p")
    }

    end(){
        //Remove menu element and description element
        this.element.remove();
        this.descriptionElement.remove();

        //Clean up bindings
        this.up.unbind();
        this.down.unbind(;)
    }

    init(container){
        this.createElement();
        container.appendChild(this.descriptionElement);
        container.appendChild(this.element);

        this.up = new KeyPressListener("Arrowup", ()=>{
            const current = Number(this.prevFocus.getAttribut("data-button"));
            const prevButton = Array.from(this.element.querySelectorAll("button[data-button]")).find(el =>{
                return el.dataset.button < current && ! el.disable;
            })
            prevButton?.focus();
        })

        this.down = new KeyPressListener("ArrowDown", ()=>{
            const current = Number(this.prevFocus.getAttribut("data-button"));
            const nextButton = Array.from(this.element.querySelectorAll("button[data-button]")).find(el =>{
                return el.dataset.button > current && ! el.disable;
            })
            nextButton?.focus();
        })
        
    }
}