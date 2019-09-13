const { Client, RichEmbed } = require('discord.js');
const client = new Client();
const config = require("./config.json");


client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
  client.user.setPresence(`Estou em ${client.guilds.size} servidores`);
});


client.on('guildMemberAdd', member => {
  // Envie a mensagem para um canal designado em um servidor
  const channel = member.guild.channels.find(ch => ch.name === 'geral');

  // Não faça nada se o canal não foi encontrado neste servidor
  if (!channel) return;

  // Envia a mensagem, mencionando o membro
  channel.send(`O ${member} chegou!!! Corram!!!!`);
});

client.on("message", async message => {
  const msg = message;
  if (message.author.bot) { return };
  if (message.channel.type === "dm") { return };
  if (!message.content.startsWith(config.prefix)) { return };

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();

  if (comando === "help") {
    let help = "!help - Aparece a lista de comandos disponivel \n!about - Descrição do bot \n!event - discrição do evento";
    style(msg, "Comandos", help, 0xf5f5f5, "https://cdn.discordapp.com/attachments/621492858192527385/621503502530641951/IMG_20190911_213252298.jpg");
  }

  if (comando === "about") {
    style(msg, "I`am Groot", "Sou um bot em desenvolvimentos", 0xf51f07);

  }

  if (comando === "event") {
    style(msg, "Open Hack Shawee", "Um hackathon online aonde o desafio atual é criar um hackaton online", 0xf5f5f5);

  }

});


const style = async (msg, titulo, texto, cor, img) => {
  const embed = new RichEmbed()
    // Define imagem
    .setImage(img)
    // Define o título do campo
    .setTitle(titulo)
    // Define a cor da incorporação
    .setColor(cor)
    // Define o conteúdo principal da incorporação
    .setDescription(texto)
    // Define o roda pé
    .setFooter("boot desenvolvido por PotG")
  await msg.channel.send(embed)
}


client.login(config.token);