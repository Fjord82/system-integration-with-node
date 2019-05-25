//stubs for demo
"use strict";
const Message_listener = require("./Message_listener");

module.exports = function() {
  // receive events
  const qname = "orderQ";
  const msgKey = "orderKey";
  const ex = "Orderexc";
  Message_listener.consume(ex, qname, msgKey, doProcess);

  function doProcess() {}
};
