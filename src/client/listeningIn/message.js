/* eslint-disable id-length */
/* eslint-disable max-len */
/* eslint-disable new-cap */
/* eslint-disable complexity */
const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);
const c = require('colors');
const moment = require('moment');
const ClientEmbed = require('../../structures/ClientEmbed');
moment.locale('pt-BR');
const coldoown = new Set();

module.exports = class {

	constructor(client) {
		this.client = client;
	}

	async run(message) {
		try {
			if (message.author.bot) return;

			let server = await this.client.database.guilds.findOne({
				_id: message.guild.id
			});

			let user = await this.client.database.users.findOne({
				userId: message.author.id,
				guildId: message.guild.id
			});

			let client = await this.client.database.clientUtils.findOne({
				_id: this.client.user.id
			});

			let shop = await this.client.database.shop.findOne({
				_id: message.guild.id
			});

			if (!server) {
				await this.client.database.guilds.create({
					_id: message.guild.id
				});
			}

			if (!user) {
				if (message.author.id === '463421520686088192' || message.author.id === '707677540583735338') {
					await await this.client.database.users.create({
						userId: message.author.id,
						guildId: message.guild.id,
						cadastrado: true
					});
				} else {
					await await this.client.database.users.create({
						userId: message.author.id,
						guildId: message.guild.id
					});
				}
			}

			if (!client) {
				await this.client.database.clientUtils.create({
					_id: this.client.user.id
				});
			}

			if (!shop) {
				await this.client.database.shop.create({
					_id: message.guild.id
				});
			}

			server = await this.client.database.guilds.findOne({
				_id: message.guild.id
			});

			user = await this.client.database.users.findOne({
				userId: message.author.id,
				guildId: message.guild.id
			});

			client = await this.client.database.clientUtils.findOne({
				_id: this.client.user.id
			});

			shop = await this.client.database.shop.findOne({
				_id: message.guild.id
			});

			const {
				prefix
			} = server;

			if (message.content.match(GetMention(this.client.user.id))) {
				const embed = new ClientEmbed(message.author)
					.setTitle(`🦉 | ${this.client.user.username}`)
					.setThumbnail(this.client.user.displayAvatarURL())
					.addField('⁉️ Como me usar?', `Use o comando \`${prefix}ajuda\` para saber todos os meus comandos!`)
					.addField('⚙️ Meu Prefix:', `\`${prefix}\``)
					.addField('⚒️ Editores:', !server.editor.length ? 'Esse servidor não há Editores.' : server.editor.map(a => `<@${a.id}>`).join('\n'));

				message.channel.send(message.author, embed);
			}

			if (message.content.indexOf(prefix) !== 0) return;

			const {
				author
			} = message;
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const command = args.shift().toLowerCase();
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

			if (!cmd) return;

			const comando = await this.client.database.commands.findOne({
				_id: cmd.name
			});

			if (comando) {
				if (client.usersBan.find((a) => a === message.author.id)) {
					message.reply('você está banido de usar minhas funções **GLOBALMENTE**!');
					return;
				}

				if (server.canal.map(a => a.id).includes(message.channel.id) && cmd.name !== 'channelcmd') {
					message.reply('os meus comandos estão **DESATIVADOS** nesse canal!');
					return;
				}

				if (!user.cadastrado && cmd.name !== 'cadastrar' && !cmd.aliases.includes('cadastrar-se') && cmd.name !== 'ajuda' && !cmd.aliases.includes('help')) {
					message.reply(`você não está cadastrado no servidor **${message.guild.name}**! Registre-se usando o comando: \`${prefix}cadastrar\`.`);
					return;
				}

				if (cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!['463421520686088192', '707677540583735338', '804677047959027714'].includes(message.author.id)) {
						message.reply('este comando é apenas para pessoas **ESPECIAIS**!');
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.vip.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ser \`VIP\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!message.member.hasPermission('ADMINISTRATOR')) {
						message.reply(`você precisa ter permissão \`Administrador\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find((a) => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR')) {
						message.reply(`você precisa ser \`Editor\` ou ter permissão \`Administrador\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && !server.vip.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`VIP\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.governador !== message.author.id) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Prefeito\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.delegado !== message.author.id) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Delegado\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && cmd.governador && cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.delegado !== message.author.id && server.cidade.governador !== message.author.id) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Delegado\` ou ser \`Prefeito\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.diretorHP !== message.author.id) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Diretor do Hospital\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && cmd.governador && !cmd.delegado && cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.diretorHP !== message.author.id && server.cidade.governador !== message.author.id) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Diretor do Hospital\` ou ser \`Prefeito\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id) {
						message.reply(`você precisa ser \`Dono da Favela\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.donoFavela !== message.author.id) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Dono da Favela\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.cidade.donoFabricadeArmas.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ser \`Fabricante das Armas\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id && !server.cidade.donoFabricadeArmas.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ser \`Dono da Favela\` ou ser \`Fabricante das Armas\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.donoFavela !== message.author.id && !server.cidade.donoFabricadeArmas.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Dono da Favela\` ou ser \`Fabricante das Armas\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.cidade.donoFabricadeDrogas.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ser \`Fabricante das Drogas\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id && !server.cidade.donoFabricadeDrogas.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ser \`Dono da Favela\` ou ser \`Fabricante das Drogas\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && cmd.donoDrogas && !cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.donoFavela !== message.author.id && !server.cidade.donoFabricadeDrogas.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Dono da Favela\` ou ser \`Fabricante das Drogas\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoDesmanche !== message.author.id) {
						message.reply(`você precisa ser \`Dono do Desmanche\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && cmd.donoDesmanche && !cmd.donoLavagem && cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoDesmanche !== message.author.id && !server.cidade.ajudanteDesmanche.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ser \`Dono do Desmanche\` ou ser \`Ajudante do Desmanche\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id && server.cidade.donoDesmanche !== message.author.id) {
						message.reply(`você precisa ser \`Dono da Favela\` ou ser \`Dono do Desmanche\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && cmd.donoDesmanche && !cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.donoFavela !== message.author.id && server.cidade.donoDesmanche !== message.author.id) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Dono da Favela\` ou ser \`Dono do Desmanche\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && cmd.donoDesmanche && !cmd.donoLavagem && cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.donoFavela !== message.author.id && server.cidade.donoDesmanche !== message.author.id && !server.cidade.ajudanteDesmanche.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Dono da Favela\` ou ser \`Dono do Desmanche\` ou ser \`Ajudante do Desmanche\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoLavagem !== message.author.id) {
						message.reply(`você precisa ser \`Dono da Lavagem de Dinheiro\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && !cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && cmd.donoLavagem && !cmd.ajudanteDesmanche && cmd.ajudanteLavagem) {
					if (server.cidade.donoLavagem !== message.author.id && !server.cidade.ajudanteLavagem.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ser \`Dono da Lavagem de Dinheiro\` ou ser \`Ajudante da Lavagem de Dinheiro\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && !cmd.editor && !cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (server.cidade.donoFavela !== message.author.id && server.cidade.donoLavagem !== message.author.id) {
						message.reply(`você precisa ser \`Dono da Favela\` ou ser \`Dono da Lavagem de Dinheiro\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && cmd.donoLavagem && !cmd.ajudanteDesmanche && !cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.donoFavela !== message.author.id && server.cidade.donoLavagem !== message.author.id) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Dono da Favela\` ou ser \`Dono da Lavagem de Dinheiro\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.owner && cmd.editor && cmd.adm && !cmd.vip && !cmd.governador && !cmd.delegado && !cmd.diretorHP && cmd.donoFavela && !cmd.donoArmas && !cmd.donoDrogas && !cmd.donoDesmanche && cmd.donoLavagem && !cmd.ajudanteDesmanche && cmd.ajudanteLavagem) {
					if (!server.editor.find(a => a.id === message.author.id) && !message.member.hasPermission('ADMINISTRATOR') && server.cidade.donoFavela !== message.author.id && server.cidade.donoLavagem !== message.author.id && !server.cidade.ajudanteLavagem.find((a) => a.id === message.author.id)) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`Dono da Favela\` ou ser \`Dono da Lavagem de Dinheiro\` ou ser \`Ajudante da Lavagem de Dinheiro\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (coldoown.has(message.author.id)) {
					message.channel.send(`${message.author}, você precisa esperar \`3\` segundos para usar algum comando novamente!`).then((a) => a.delete({
						timeout: 3000
					}));
					return;
				}

				if (message.author.id !== '463421520686088192' && message.author.id !== '707677540583735338') {
					coldoown.add(message.author.id);
				}

				setTimeout(() => {
					coldoown.delete(message.author.id);
				}, 3000);

				cmd.run({
					message,
					args,
					prefix,
					author
				});
				var num = comando.usages;
				num += 1;

				await this.client.database.commands.findOneAndUpdate({
					_id: cmd.name
				}, {
					$set: {
						usages: num
					}
				});
			} else {
				await this.client.database.commands.create({
					_id: cmd.name,
					usages: 1,
					manutenção: false
				});

				console.log(c.cyan(`[COMANDO] - Comando ( ${cmd.name} ) teve o seu Documento criado com Sucesso.`));

				cmd.run({
					message,
					args,
					prefix,
					author
				});
			}
		} catch (err) {
			if (err) console.error(err);
		}
	}

};
