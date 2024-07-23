echo 'const { IgApiClient } = require("instagram-private-api");
const axios = require("axios");

const ig = new IgApiClient();

async function login() {
  ig.state.generateDevice("vynaa_valerie");
  await ig.account.login("vynaa_valerie", "ulan136");
}

async function processMessage(thread, message) {
  const userMessage = message.text;

  try {
    const response = await axios.get(
      `https://api.agatz.xyz/api/simsimi?message=${encodeURIComponent(userMessage)}`
    );
    if (response.data && response.data.data) {
      await thread.broadcastText(response.data.data);
    }
  } catch (error) {
    console.error("Error fetching response from API:", error);
  }
}

async function monitorMessages() {
  const inboxFeed = ig.feed.directInbox();
  const threads = await inboxFeed.items();

  for (const thread of threads) {
    const messages = await thread.items();
    for (const message of messages) {
      if (message.item_type === "text" && !message.is_sent_by_viewer) {
        await processMessage(thread, message);
      }
    }
  }
}

async function runBot() {
  await login();
  setInterval(monitorMessages, 10000);
}

runBot().catch(console.error);' > bot.js
