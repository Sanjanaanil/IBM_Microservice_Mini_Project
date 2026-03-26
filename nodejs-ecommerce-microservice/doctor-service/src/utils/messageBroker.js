class MessageBroker {
  async connect() {
    console.log("RabbitMQ disabled for this project");
  }

  async publishMessage() {
    return;
  }

  async consumeMessage() {
    return;
  }
}

module.exports = new MessageBroker();