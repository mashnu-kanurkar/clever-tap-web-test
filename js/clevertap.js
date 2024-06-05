export class clevertap{
    constructor(){}
    sendEventToCT(e,o){
          console.log("event", e)
  console.log("props", o)
clevertap.event.push(e, o);
    }
}
