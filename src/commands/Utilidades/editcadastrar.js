/* eslint-disable arrow-body-style */
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

		if (!user.cadastrado) {
			return message.reply({
				content: `Você não está cadastrado ainda nesse servidor. Use o comando \`${prefix}cadastrar\`.`
			});
		}

		const embed = new ClientEmbed(author)
			.setTitle('EDITAR CADASTRAR')
			.setThumbnail(author.displayAvatarURL({
				dynamic: true
			}))
			.setDescription('**O QUE VOCÊ DESEJA EDITAR NO SEU CADASTRO?**\n\nNome Verdadeiro\nIdade\nGênero');

		message.reply({
			content: author.toString(),
			embeds: [embed]
		}).then((msg) => {
			const filter = (m) => {
				return m.author.id === author.id;
			};

			const collector = msg.channel.createMessageCollector({
				filter,
				time: 60000
			});

			collector.on('collect', async (msg1) => {
				if (msg1.content.toLowerCase() === 'nome verdadeiro') {
					collector.stop();

					message.reply({
						content: 'Por qual nome você deseja trocar?'
					}).then(() => {
						const filter2 = (m) => m.author.id === author.id;
						const collector2 = msg1.channel.createMessageCollector(filter2, {
							time: 60000
						});

						collector2.on('collect', async (msg2) => {
							collector2.stop();
							msg.delete();

							message.reply({
								content: `Seu nome no cadastro foi alterado para: \`${msg2.content}\``
							});

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

					message.reply({
						content: 'Por qual idade você deseja trocar?'
					}).then(() => {
						const filter2 = (m) => {
							return m.author.id === author.id;
						};

						const collector2 = msg1.channel.createMessageCollector({
							filter: filter2,
							time: 60000
						});

						collector2.on('collect', async (msg2) => {
							if (!parseInt(msg2.content)) {
								message.reply({
									content: 'Sua idade precisa ser um número! Por favor, envie sua idade novamente no chat.'
								}).then((a) => setTimeout(() => a.delete(), 6000));
								msg2.delete();
							} else {
								collector2.stop();
								msg.delete();

								message.reply({
									content: `Sua idade no cadastro foi alterado para: \`${msg2.content}\``
								});

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

					message.reply({
						content: 'Por qual gênero você deseja trocar?'
					}).then(() => {
						const filter2 = (m) => {
							return m.author.id === author.id;
						};

						const collector2 = msg1.channel.createMessageCollector({
							filter: filter2,
							time: 60000
						});

						collector2.on('collect', async (msg2) => {
							if (parseInt(msg2.content)) {
								message.reply({
									content: 'Seu gênero não pode ser um número! Por favor, envie seu gênero novamente no chat.'
								}).then((a) => setTimeout(() => a.delete(), 6000));
								msg2.delete();
							} else if (msg2.content.toLowerCase() !== 'masculino' && msg2.content.toLowerCase() !== 'feminino') {
								message.reply({
									content: 'Seu gênero precisa ser **Masculino** ou **Feminino**! Por favor, envie seu gênero novamente no chat.'
								}).then((a) => setTimeout(() => a.delete(), 6000));
								msg2.delete();
							} else {
								collector2.stop();
								msg.delete();

								message.reply({
									content: `Seu gênero no cadastro foi alterado para: \`${msg2.content}\``
								});

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
					message.reply({
						content: 'Informação não encontrada! Escolha novamente o que você deseja trocar no cadastro!'
					}).then((a) => setTimeout(() => a.delete(), 6000));
				}
			});
		});
	}

	async capitalize(str) {
		return str.charAt(0).toUpperCase() + str.substr(1);
	}

};
