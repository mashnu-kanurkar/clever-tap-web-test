export let clevertap =  Clevertap{
    constructor(){}
    sendEventToCT(e,o){
    console.log("event", e)
        console.log("props", o)
            clevertap.event.push(e, o);
    }
}
