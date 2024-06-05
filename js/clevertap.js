function sendEventToCT(e, o) {
  // event with properties
  console.log("event", e)
  console.log("props", o)
clevertap.event.push(e, o);
}
