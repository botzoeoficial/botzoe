/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable handle-callback-err */
/* eslint-disable id-length */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const CommandC = require('../../database/Schemas/Command');

module.exports = class Ajuda extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'ajuda';
		this.category = 'Utilidades';
		this.description = 'Veja todos os comandos do bot!';
		this.usage = 'ajuda <comando>';
		this.aliases = ['help'];

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
		args,
		prefix,
		author
	}) {
		const {
			commands
		} = message.client;

		const AJUDA = new ClientEmbed(author)
			.setAuthor(`Central de Ajuda - ${this.client.user.username}`, this.client.user.displayAvatarURL())
			.setThumbnail(this.client.user.displayAvatarURL());

		if (args[0]) {
			CommandC.findOne({
				_id: args[0].toLowerCase()
			}, async (err, cmd) => {
				const name = args[0].toLowerCase();
				const comando = commands.get(name) || commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name));

				if (!comando) {
					return message.reply(`não achei nenhum comando com o nome/alternativo: \`${name}\``);
				}

				AJUDA.setDescription(!comando.description.length ? `\`Comando Sem Descrição.\`` : `**\`${comando.description}\`**`);
				AJUDA.addField('Comando:', `\`${comando.name}\``);
				AJUDA.addField('Alternativos:', !comando.aliases.length ? `\`Comando Sem Alternativos.\`` : comando.aliases.map(a => `**\`${a}\`**`).join(', '));
				AJUDA.addField('Modo de Uso:', `\`${prefix}${comando.usage}\``);
				AJUDA.addField('Em Manutenção:', !cmd.manutenção ? `\`Não.\`` : `\`Sim.\`\nMotivo: **${cmd.reason}**`);

				return message.channel.send(author, AJUDA);
			});
		} else {
			const HELP = new ClientEmbed(author)
				.setAuthor(`Central de Ajuda - ${this.client.user.username}`, this.client.user.displayAvatarURL())
				.setDescription(`${message.author.username}, menu de ajuda da **${this.client.user.tag}**.\n\nOBS: Caso queira saber mais sobre algum comando, use: **\`${prefix}ajuda <comando/aliases>\`**.`)
				.addField(`🙎 Carcereiro [${comandos('Carcereiro').size}]`, comandos('Carcereiro').map((comando) => `\`${comando.name}\``).join(', '))
				.addField(`🌆 Cidade [${comandos('Cidade').size}]`, comandos('Cidade').map((comando) => `\`${comando.name}\``).join(', '))
				.addField(`<:preso:899431985980796959> Crime [${comandos('Crime').size}]`, comandos('Crime').map((comando) => `\`${comando.name}\``).join(', '))
				.addField(`👨‍✈ Delegado [${comandos('Delegado').size}]`, comandos('Delegado').map((comando) => `\`${comando.name}\``).join(', '))
				.addField(`👑 Dono / Servidor de Suporte [${comandos('Dono').size}]`, comandos('Dono').map((comando) => `\`${comando.name}\``).join(', '))
				.addField(`💸 Economia [${comandos('Economia').size}]`, comandos('Economia').map((comando) => `\`${comando.name}\``).join(', '))
				.addField(`⚙️ Editor [${comandos('Editor').size}]`, comandos('Editor').map((comando) => `\`${comando.name}\``).join(', '))
				.addField(`🧑‍🔧 Mecânico [${comandos('Mecanico').size}]`, comandos('Mecanico').map((comando) => `\`${comando.name}\``).join(', '))
				.addField(`👮‍♂️ Policial [${comandos('Policial').size}]`, comandos('Policial').map((comando) => `\`${comando.name}\``).join(', '))
				.addField(`🗣️ Social [${comandos('Social').size}]`, comandos('Social').map((comando) => `\`${comando.name}\``).join(', '))
				.addField(`🔔 Utilidades [${comandos('Utilidades').size}]`, comandos('Utilidades').map((comando) => `\`${comando.name}\``).join(', '))
				.addField(`💎 Premium [${comandos('Vip').size}]`, comandos('Vip').map((comando) => `\`${comando.name}\``).join(', '));

			return message.channel.send(author, HELP);
		}

		function comandos(categoria) {
			return commands.filter((ce) => ce.category === categoria);
		}
	}

};
