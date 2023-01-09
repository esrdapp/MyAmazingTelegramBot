const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
  console.log("Received /start command")
  try {
    return ctx.reply("Congrats! You've connected to Netlify!")
  } catch (e) {
    console.error("error in start action:", e)
    return ctx.reply("Error occured")
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

exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body))
    return { statusCode: 200, body: "" }
  } catch (e) {
    console.error("error in handler:", e)
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
  }
}
