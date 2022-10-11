const TelegramBot = require('node-telegram-bot-api')
const {gameOptions,againOptions} = require('./options')
const token = "5620163192:AAEGMWm1tE4aHCuQePgo8demOUHJ5hoty8w";

const bot = new TelegramBot(token, { polling: true })

const chats = [];





const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "Сейчас я загадаю цифру от 0 до 9,а ты должен ее угадать!")
    const random = Math.floor(Math.random() * 10)
    chats[chatId] = random
    await bot.sendMessage(chatId, `Отгадывай`, gameOptions);
}



bot.setMyCommands([
    { command: "/start", description: 'Started telegram bot' },
    { command: "/game", description: 'Find number' },
    { command: "/again", description: 'start again game' },
])

bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text == '/start') {
        return bot.sendMessage(chatId, 'You started bot')
    }
    if (text == '/game') {
        return startGame(chatId);
    }
    return bot.sendMessage(chatId, "I don't understand you start again")
})

bot.on('callback_query', async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id;

    if (data == '/again') {
        return startGame(chatId)
    }
    if (data == chats[chatId]) {
        return bot.sendMessage(chatId, `Поздравляю,ты отгадал цифру ${chats[chatId]}`, againOptions)
    } else {
        return bot.sendMessage(chatId, `К сожалению ты не угадал цифру,бот загадал цифру ${chats[chatId]}`, againOptions)
    }
})
