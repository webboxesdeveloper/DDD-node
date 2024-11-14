const {EventEmitter} = require('events');

class EventBus extends EventEmitter {
  publish(event) {
    this.emit(event.constructor.name, event);
  }
}

module.exports = new EventBus();
