window.Actions = {
   damage1: {
      name: "whomp",
      success: [
         { type: "textMessage", text: '{attackerName} uses whomp!'}, //the attacker call caster in the video
         { type: "animation", text: "spin"},
         { type: "statChange", damage: 10},
      ]
   }
}