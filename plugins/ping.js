// plugins/ping.js

export default {
  name: 'ping',
  description: 'Replies with Pong! and the ping time',
  async execute(message) {
    const start = Date.now();
    const msg = await message.reply('Pong...');
    const ping = Date.now() - start;
    await msg.edit(`Pong! ${ping}ms`);
  },
};
