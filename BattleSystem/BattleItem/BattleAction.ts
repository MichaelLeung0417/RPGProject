window.Actions = {
   damage1: {
      name: "whomp",
      success: [
         { type: "textMessage", text: '{attackerName} uses whomp!'}, //the attacker call caster in the video
         { type: "animation", text: "spin"},
         { type: "statChange", damage: 10},
      ]
   },

   saucyStatus: {
      name: "Tomato Squeeze",
      success: [
         { type: "textMessage", text: '{attackerName} uses {Action}!'}, //the attacker call caster in the video
         { type: "statusChange", status: {type:"saucy", exporesIn:3} },
      ]
   },

   clumsyStatus: {
      name: "Olivem Oil",
      success: [
         { type: "textMessage", text: '{attackerName} uses {Action}!'}, //the attacker call caster in the video
         {type: "animation", animation:'glob', color: "#dafd2a"},
         {type: "animation", animation:'glob', color: "red"},
         {type: "animation", animation:'glob', color: "#dafd2a"},
         { type: "statusChange", status: {type:"clumsy", exporesIn:3} },
         { type: "textMessage", text: "{Target} is slipping all around!"}
      ]
   },
   //Items
   item_recoverStatus:{
      name: "Heating Lamp",
      description: "Freeling fresh an dwarm",
      targetType: "friendly"
   }
}

