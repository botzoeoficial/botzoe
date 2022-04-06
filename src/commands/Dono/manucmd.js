const Command = require('../../structures/Command');

module.exports = class Manucmd extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'manucmd';
		this.category = 'Dono';
		this.description = 'Coloque um comando em manutenção ou não!';
		this.usage = 'manucmd <comando> <ativar/desativar>';
		this.aliases = ['manutencao-cmd'];

		this.enabled = true;
		this.guildOnly = true;

		this.owner = true;
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
		author
	}) {
		if (!['463421520686088192', '707677540583735338'].includes(author.id)) {
			return message.reply({
				content: 'Este comando é apenas para pessoas **ESPECIAIS**!'
			});
		}

		const command = args[0];

		if (!command) {
			return message.reply({
				content: 'Coloque o nome de um comando corretamente!'
			});
		}

		const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
		if (!cmd) {
			return message.reply({
				content: 'Comando não encontrado!'
			});
		}

		const {
			name
		} = cmd;

		const comando = await this.client.database.commands.findOne({
			_id: name
		});

		if (!comando) {
			return message.reply({
				content: 'Não cadastrei esse comando ainda. Use o comando ao menos uma vez!'
			});
		}

		const reason = args.slice(1).join(' ');
		if (!reason) {
			return message.reply({
				content: 'Coloque um motivo!'
			});
		}

		if (comando.manutenção) {
			await this.client.database.commands.findOneAndUpdate({
				_id: name
			}, {
				$set: {
					manutenção: false,
					reason: ''
				}
			});

			return message.reply({
				content: 'Esse comando estava em manutenção, portanto ele foi retirado da manutenção com sucesso.'
			});
		} else {
			await this.client.database.commands.findOneAndUpdate({
				_id: name
			}, {
				$set: {
					manutenção: true,
					reason: reason
				}
			});

			return message.reply({
				content: `Coloquei o comando **\`${name}\`** em manutenção com sucesso.\nMotivo: \`${reason}\`.`
			});
		}
	}

};
