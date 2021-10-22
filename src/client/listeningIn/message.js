/* eslint-disable max-len */
/* eslint-disable complexity */
/* eslint-disable no-process-env */
/* eslint-disable new-cap */
/* eslint-disable id-length */
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
			if (message.author.bot === true) return;
			if (message.guild.id !== '830972296176992296' && message.guild.id !== '885645282614861854') return;

			let server = await this.client.database.guilds.findOne({
				_id: message.guild.id
			});

			let user = await this.client.database.users.findOne({
				_id: message.author.id
			});

			const client = await this.client.database.clientUtils.findOne({
				_id: this.client.user.id
			});

			const shop = await this.client.database.shop.findOne({
				_id: message.guild.id
			});

			if (!server) {
				await this.client.database.guilds.create({
					_id: message.guild.id
				});
			}

			if (!user) {
				await this.client.database.users.create({
					_id: message.author.id
				});
			}

			if (!client) {
				await this.client.database.clientUtils.create({
					_id: this.client.user.id,
					reason: '',
					manutenção: false
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

			const {
				prefix
			} = server;

			if (message.content.match(GetMention(this.client.user.id))) {
				const embed = new ClientEmbed(message.author)
					.setTitle(`🦉 | ${this.client.user.username}`)
					.setThumbnail(this.client.user.displayAvatarURL())
					.addField('⁉️ Como me usar?', `Use o comando \`${server.prefix}ajuda\` para saber todos os meus comandos!`)
					.addField('⚙️ Meu Prefix:', `\`${server.prefix}\``)
					.addField('⚒️ Editores:', !server.editor.length ? 'Esse servidor não há Editores.' : server.editor.map(a => `<@${a.id}>`).join('\n'));

				message.channel.send(message.author, embed);
			}

			user = await this.client.database.users.findOne({
				_id: message.author.id
			});

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
				if (server.canal.map(a => a.id).includes(message.channel.id) && cmd.name !== 'channelcmd') {
					message.reply('os meus comandos estão **DESATIVADOS** nesse canal!');
					return;
				}

				if ((message.member.roles.cache.some(r => r.id === '831007436990971905') && comando._id !== 'cadastrar' && !cmd.aliases.includes('cadastrar-se') && comando._id !== 'cadastro') && !message.member.roles.cache.some(r => r.id === '830972296260485192')) {
					message.reply('você não pode usar meus comandos!');
					return;
				}

				if (!user.cadastrado && cmd.name !== 'cadastrar' && !cmd.aliases.includes('cadastrar-se')) {
					message.reply(`você não está cadastrado no servidor **${message.guild.name}**! Registre-se usando o comando: \`${prefix}cadastrar\`.`);
					return;
				}

				if (cmd.owner && !['463421520686088192', '707677540583735338'].includes(message.author.id)) {
					message.reply('este comando é apenas para pessoas **ESPECIAIS**!');
					return;
				}

				if (cmd.editor && cmd.adm && cmd.vip) {
					if ((!server.editor.map(a => a.id).includes(message.author.id) && !message.member.hasPermission('ADMINISTRATOR')) && !message.member.roles.cache.some(r => r.id === '830972296260485189')) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` ou ser \`VIP Doador\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (cmd.editor && cmd.adm && !cmd.vip) {
					if (!server.editor.map(a => a.id).includes(message.author.id) && !message.member.hasPermission('ADMINISTRATOR')) {
						message.reply(`você precisa ter permissão de \`Administrador\` ou ser \`Editor\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.editor && !cmd.adm && cmd.vip) {
					if (!message.member.roles.cache.some(r => r.id === '830972296260485189')) {
						message.reply(`você precisa ser \`VIP\` do servidor para usar esse comando!`);
						return;
					}
				}

				if (!cmd.editor && cmd.adm) {
					if (server.editor.map(a => a.id).includes(message.author.id) && !message.member.hasPermission('ADMINISTRATOR')) {
						message.reply(`você precisa ter permissão de \`Administrador\` para usar esse comando!`);
						return;
					}
				}

				if (coldoown.has(message.author.id)) {
					message.channel.send(`${message.author}, você precisa esperar \`3\` segundos para usar algum comando novamente!`).then((a) => a.delete({
						timeout: 3000
					}));
					return;
				}

				coldoown.add(message.author.id);
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

				console.log(
					c.cyan(`[COMANDO] - Comando ( ${cmd.name} ) teve o seu Documento criado com Sucesso.`)
				);

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
