/* eslint-disable id-length */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Editcadastrar extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'editcadastrar';
		this.category = 'Utilidades';
		this.description = 'Edite uma informação do seu cadastro!';
		this.usage = 'editcadastrar';
		this.aliases = ['edit-cadastrar'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = false;
		this.adm = false;

		this.vip = false;
		this.governador = false;
		this.delegado = false;
		this.diretorHP = false;
		this.donoFavela = false;
		this.donoArmas = false;
		this.donoDrogas = false;
		this.donoDesmanche = false;
		this.donoLavagem = false;

		this.ajudanteArma = false;
		this.ajudanteDroga = false;
		this.ajudanteDesmanche = false;
		this.ajudanteLavagem = false;
	}
	async run({
		message,
		author,
		prefix
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		if (!user.cadastrado) return message.reply(`você não está cadastrado ainda nesse servidor. Use o comando \`${prefix}cadastrar\`.`);

		const embed = new ClientEmbed(author)
			.setTitle('EDITAR CADASTRAR')
			.setThumbnail(author.displayAvatarURL({
				dynamic: true
			}))
			.setDescription('**O QUE VOCÊ DESEJA EDITAR NO SEU CADASTRO?**\n\nNome Verdadeiro\nIdade\nGênero');

		message.channel.send(author, embed).then((msg) => {
			const filter = (m) => m.author.id === author.id;
			const collector = msg.channel.createMessageCollector(filter, {
				time: 60000
			});

			collector.on('collect', async (msg1) => {
				if (msg1.content.toLowerCase() === 'nome verdadeiro') {
					collector.stop();

					message.channel.send(`${author}, por qual nome você deseja trocar?`).then(() => {
						const filter2 = (m) => m.author.id === author.id;
						const collector2 = msg1.channel.createMessageCollector(filter2, {
							time: 60000
						});

						collector2.on('collect', async (msg2) => {
							collector2.stop();
							msg.delete();

							message.channel.send(`${author}, seu nome no cadastro foi alterado para: \`${msg2.content}\``);

							return await this.client.database.users.findOneAndUpdate({
								userId: author.id,
								guildId: message.guild.id
							}, {
								$set: {
									nomeReal: msg2.content
								}
							});
						});
					});
				} else if (msg1.content.toLowerCase() === 'idade') {
					collector.stop();

					message.channel.send(`${author}, por qual idade você deseja trocar?`).then(() => {
						const filter2 = (m) => m.author.id === author.id;
						const collector2 = msg1.channel.createMessageCollector(filter2, {
							time: 60000
						});

						collector2.on('collect', async (msg2) => {
							if (!parseInt(msg2.content)) {
								message.channel.send(`${author}, sua idade precisa ser um número! Por favor, envie sua idade novamente no chat.`).then(ba => ba.delete({
									timeout: 5000
								}));
								msg2.delete();
							} else {
								collector2.stop();
								msg.delete();

								message.channel.send(`${author}, sua idade no cadastro foi alterado para: \`${msg2.content}\``);

								return await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										idade: Number(msg2.content)
									}
								});
							}
						});
					});
				} else if (msg1.content.toLowerCase() === 'gênero' || msg1.content.toLowerCase() === 'genero') {
					collector.stop();

					message.channel.send(`${author}, por qual gênero você deseja trocar?`).then(() => {
						const filter2 = (m) => m.author.id === author.id;
						const collector2 = msg1.channel.createMessageCollector(filter2, {
							time: 60000
						});

						collector2.on('collect', async (msg2) => {
							if (parseInt(msg2.content)) {
								message.channel.send(`${author}, seu gênero não pode ser um número! Por favor, envie seu gênero novamente no chat.`).then(ba => ba.delete({
									timeout: 5000
								}));
								msg2.delete();
							} else if (msg2.content.toLowerCase() !== 'masculino' && msg2.content.toLowerCase() !== 'feminino') {
								message.channel.send(`${author}, seu gênero precisa ser **Masculino** ou **Feminino**! Por favor, envie seu gênero novamente no chat.`).then(ba => ba.delete({
									timeout: 5000
								}));
								msg2.delete();
							} else {
								collector2.stop();
								msg.delete();

								message.channel.send(`${author}, seu gênero no cadastro foi alterado para: \`${msg2.content}\``);

								return await this.client.database.users.findOneAndUpdate({
									userId: author.id,
									guildId: message.guild.id
								}, {
									$set: {
										genero: await this.capitalize(msg2.content)
									}
								});
							}
						});
					});
				} else {
					message.channel.send(`${author}, informação não encontrada! Escolha novamente o que você deseja trocar no cadastro!`).then(ba => ba.delete({
						timeout: 5000
					}));
				}
			});
		});
	}

	async capitalize(str) {
		return str.charAt(0).toUpperCase() + str.substr(1);
	}

};
