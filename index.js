require('dotenv').config();
const mineflayer = require('mineflayer');

const BOT_USERNAME = process.env.BOT_USERNAME || "Bot_01";
const BOT_PASSWORD = process.env.BOT_PASSWORD || "thisara";
const SERVER_IP = process.env.SERVER_IP || "onlifesmp.falixsrv.me";
const SERVER_PORT = parseInt(process.env.SERVER_PORT || "25565");

function startBot() {
  const bot = mineflayer.createBot({
    host: SERVER_IP,
    port: SERVER_PORT,
    username: BOT_USERNAME,
    password: BOT_PASSWORD,
    version: "1.21.1"
  });

  bot.once("spawn", () => {
    console.log(`${BOT_USERNAME} joined the server`);
    
    // Set Creative mode if OP
    setTimeout(() => {
      bot.chat("/gamemode creative");
      console.log("Bot set to Creative mode");
    }, 3000);

    // Simple AFK movements
    setInterval(() => {
      const dirs = ["forward", "back", "left", "right"];
      const dir = dirs[Math.floor(Math.random() * dirs.length)];
      bot.setControlState(dir, true);
      setTimeout(() => bot.setControlState(dir, false), 500);
    }, 30000);

    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = Math.random() * 0.5 - 0.25;
      bot.look(yaw, pitch, true);
    }, 15000);

    setInterval(() => {
      if (bot.entity && bot.entity.onGround) {
        bot.setControlState("jump", true);
        setTimeout(() => bot.setControlState("jump", false), 200);
      }
    }, 45000);
  });

  bot.on("message", (message) => {
    const msg = message.toString();
    if (msg.includes("not registered") || msg.includes("Register")) {
      bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
      console.log("Register command sent");
    }
    if (msg.includes("login") || msg.includes("Password")) {
      bot.chat(`/login ${BOT_PASSWORD}`);
      console.log("Login command sent");
    }
  });

  bot.on("end", () => {
    console.log("Bot disconnected. Reconnecting in 5 seconds...");
    setTimeout(startBot, 5000);
  });

  bot.on("error", (err) => {
    console.log("Error: ", err.message);
  });
}

startBot();
