const axios = require("axios");
const selectionData = {};

module.exports = {
    config: {
      name: "bot",
      aliases: ["sim"],
      permission: 0,
      prefix: "both",
      categorie: "AI Chat",
      cooldowns: 5,
      credit: "Developed by Mohammad Nayan",
      usages: [
        `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,
        `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,
      ],
      description: "Engage in conversations with an AI-powered bot!",
    },

  event: async ({ event, api, body }) => {
    const { threadId, senderId, replyMessage, message} = event;

  
    if (!selectionData[threadId]) return;
    const { n, userId } = selectionData[threadId];

    
    if (userId !== senderId || !n) return;

    

    const quotedMessage =
      n.message?.extendedTextMessage?.text || null;

    if (!quotedMessage || replyMessage !== quotedMessage) return;
    

    try {

        const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiss = apis.data.api;
      
      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}`
      );

      const replyText = response.data.data?.msg || "I'm not sure how to respond to that.";

      
      const botReply = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: botReply,
      };
    } catch (error) {
      console.error("Error while contacting the API:", error);
      await api.sendMessage(threadId, {
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
  },

  start: async ({ event, api, args }) => {
    const usermsg = args.join(" ");
    const { threadId, senderId, message} = event;

    
    if (!usermsg) {
      const greetings = [
        "𝗕𝗮𝗯𝘆 𝗮𝘀𝗼 𝘁𝗺𝗮𝗸𝗲 𝗮𝗸𝘁𝗮 𝗽𝗮𝗽𝗽𝗶 𝗱𝗲𝗶😇😘",
        "𝗛𝘂𝗺𝗺 𝗷𝗮𝗻𝘂 𝗯𝗼𝗹𝗼 𝗮𝗺𝗶 𝗮𝘀𝗶 𝗴𝗼 😚😚",
        "𝗕𝗮𝗿 𝗯𝗮𝗿 𝗱𝗮𝗸𝗼𝘀 𝗸𝗻 𝗸𝗶 𝗽𝗿𝗼𝗯𝗹𝗲𝗺 𝗯𝗼𝗹𝗹 😾😾",
        "𝗕𝗮𝗯𝘆 𝗸𝗶𝘀𝘀 𝗱𝗲𝘄 𝘁𝗼𝗸𝗸𝗲𝘁 𝗸𝗶𝗻𝗮 𝗱𝗶𝗺𝘂😜🥱",
        "𝗔𝗺𝗮𝗿 𝗯𝗼𝘀𝘀 𝗔𝗻𝘁𝗵𝗼𝗻𝘆 𝘀𝗶𝗻𝗴𝗹𝗲 𝗮𝗸𝘁𝗮 𝗴𝗳 𝗱𝗲 😷😘",
        "🍒𝗔𝘀𝘀𝗮𝗹𝗮𝗺𝘂 𝗢𝗮𝗹𝗮𝗶𝗸𝘂𝗺🍒",
        "𝗕𝗵𝗮𝗶 𝗺𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 𝗮 𝗯𝗼𝘁 𝗯𝗼𝘁 𝗸𝗼𝗿𝘀𝗮 𝗺𝗮𝗻𝘀𝗶 𝗮𝘁𝗮 𝘄𝘁𝗽 𝗮𝗸𝗵𝗼𝗻 𝘁𝗼 𝘀𝗼𝗺𝗺𝗮𝗻 𝗱𝗲 😩😩",
        "𝗛𝗲𝗮𝗺𝗺𝗺 𝗯𝗼𝗹𝗲𝗻 𝘀𝗶𝗿 𝗮𝗽𝗻𝗮𝗿 𝗷𝗼𝗻𝗻𝗼 𝗸𝗶 𝗸𝗼𝗿𝘁𝗲 𝗽𝗮𝗿𝗶 🧐🧐",
        "𝗛𝗲𝗹𝗹𝗼 𝗯𝗮𝗯𝘆 𝗵𝗼𝘄 𝗮𝗿𝗲 𝘆𝗼𝘂? ☺️🌼",
      ];

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      const userToMention = senderId;

      const greetingMessage = await api.sendMessage(threadId, {
        text: `@${userToMention.split('@')[0]}, ${randomGreeting}`,
        mentions: [userToMention],
      }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: greetingMessage,
      };
      return;
    }

    try {
        const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiss = apis.data.api;
      
      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}`
      );

      const replyText = response.data.data?.msg || "I'm not sure how to respond to that.";

      
      const botReply = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: botReply,
      };
    } catch (error) {
      console.error("Error while contacting the API:", error);
      await api.sendMessage(threadId, {
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
  },
};
