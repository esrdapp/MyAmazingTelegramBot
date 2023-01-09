const Web3 = require('web3');
const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.BOT_TOKEN)

// Create a new connection to the Gnosis Chain
const w3 = new Web3(new Web3.providers.HttpProvider('wss://rpc.gnosischain.com/wss'));

const contractAddress = '0xd3226b12e6188133b19ac0419f34b0ed5b10f069';

bot.start(ctx => {
  console.log("Received /start command")
  try {
      ctx.reply("Congrats! You've connected to Netlify!")
  } catch (e) {
    console.error("error in start action:", e)
    ctx.reply("Error occured")
  }
})

bot.command('thumbsup', async (ctx) => {
    try {
        ctx.reply('Here you go 👍!')
    } catch (error) {
        console.log('error', error)
        ctx.reply('error sending image')
    }
})

bot.command('balance', async (ctx) => {
  // Get the chat ID and message ID of the message
  // const chatId = message.chat.id;
  // const messageId = message.message_id;

  // Get the balance of the contract
  w3.eth.getBalance(contractAddress, (error, result) => {
    if (error) {
      console.error(error);
      bot.sendMessage('Sorry, there was an error getting the balance of the contract.');
    } else {
      // Send a message with the contract balance
      bot.sendMessage(`The balance of the contract is ${result} wei.`);
    }
  } 
 );
});

exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body))
    return { statusCode: 200, body: "" }
  } catch (e) {
    console.error("error in handler:", e)
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
  }
}
