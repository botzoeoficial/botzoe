/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Addmissao extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'addmissao';
		this.category = 'Editor';
		this.description = 'Adicione uma missão para os usuários cumprirem!';
		this.usage = 'addmissao <nome da missão> <descrição da missão>';
		this.aliases = ['add-missao'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = false;
		this.editor = true;
		this.adm = true;

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
		author
	}) {
		const server = await this.client.database.guilds.findOne({
			_id: message.guild.id
		});

		if (server.missoes.length >= 12) return message.reply('este servidor já possui o máximo de missões cadastradas.');

		const missao = args[0];

		if (!missao) return message.reply(`você precisa colocar o nome da missão.\n**OBS: Caso o nome seja grande, separe ele por \`_\`.**`);

		const descricao = args.slice(1).join(' ');

		if (!descricao) return message.reply('você precisa por a descrição da missão logo após o nome da missão.');

		if (descricao.length > 4096) return message.reply('a descrição da missão só pode ter no máximo **4096** letras.');

		const embed = new ClientEmbed(author)
			.setTitle('🔰 | MISSÃO ADICIONADA')
			.addField('Nome da Missão:', missao.replace(/_/g, ' '));

		message.channel.send(author, embed);

		await this.client.database.guilds.findOneAndUpdate({
			_id: message.guild.id
		}, {
			$push: {
				missoes: {
					nome: missao.replace(/_/g, ' '),
					desc: descricao
				}
			}
		});
	}

};
