class PlayerStatus {
    constructor() {
        this.pizzas = {
            "p1": {
                //something we may not need here(the video refer to pokemon fight system so it may be some other thing for fight directly)
                hp: 50,
                maxHp: 50,
                xp: 0,
                maxXp:100,
                level: 1,
                status: null,
            },
            "p2": {
                //something we may not need here(the video refer to pokemon fight system so it may be some other thing for fight directly)
                team: "player",
                hp: 50,
                maxHp: 50,
                xp: 75,
                maxXp:100,
                level: 1,
                status: null,
            }
        }
        this.lineup = ["p1","p2"];
        this.items = [
            {actionId: "item_recoverHp", instanceId: "item1"},
            {actionId: "item_recoverHp", instanceId: "item2"},
            {actionId: "item_recoverHp", instanceId: "item3"},
        ]
    }
}

window.playerStatus = new PlayerStatus