import amqplib from 'amqplib/callback_api.js';



async function sendMessage(group,text){
    const queue = group;
amqplib.connect('amqp://localhost', (err, conn) => {
    
  conn.createChannel((err, ch1) => {
  ch1.assertQueue(queue);
  ch1.sendToQueue(queue, Buffer.from(text));
   let data={message:"Send Message",successful:true};
   return data;
  });
});
}

async function reciveMessage(group){
    const queue = group;
amqplib.connect('amqp://localhost', (err, conn) => {
let message=""; 
let successful="";
  conn.createChannel((err, ch2) => {
  ch2.assertQueue(queue);
    ch2.consume(queue, (msg) => {
      if (msg !== null) {
        message=msg.content.toString();
        successful=true;
        ch2.ack(msg);
      } else {
        message="Consumer cancelled by server";
        successful=false;
      }
    });
  });
});

let data={message:message,successful:successful};
return data;
}
export {
    sendMessage,
    reciveMessage
  }