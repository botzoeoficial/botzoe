/* eslint-disable consistent-return */
/* eslint-disable func-names */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');
const {
	create,
	all
} = require('mathjs');

module.exports = class Calcular extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'calcular';
		this.category = 'Economia';
		this.description = 'Faça uma conta aritmética!';
		this.usage = 'calcular';
		this.aliases = ['calc'];

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
		args
	}) {
		const math = create(all);
		const limitedEvaluate = math.evaluate;

		math.import({
			import: function () {
				throw new Error('A função **import** está desativada!');
			},
			createUnit: function () {
				throw new Error('A função **createUnit** está desativada!');
			},
			evaluate: function () {
				throw new Error('A função **evaluate** está desativada!');
			},
			parse: function () {
				throw new Error('A função **parse** está desativada!');
			},
			simplify: function () {
				throw new Error('A função **simplify** está desativada!');
			},
			derivative: function () {
				throw new Error('A função **derivative** está desativada!');
			},
			format: function () {
				throw new Error('A função **format** está desativada!');
			}
		}, {
			override: true
		});

		const expr = args.join(' ').replace(/π/g, 'pi').replace(/÷|:/g, '/').replace(/×/g, '*').replace(/\*\*/g, '^').replace(/"|'|\[|\]|\{|\}/g, '')
			.toLowerCase();

		let result;

		if (!expr.length) return message.reply(`❌ | Expressão inválida!`);

		try {
			result = limitedEvaluate && limitedEvaluate(expr);
		} catch (err) {
			return message.reply(`❌ | Expressão inválida!`);
		}

		if (result === undefined || result === null || typeof result === 'function') return message.reply(`❌ | Expressão inválida!`);

		if (result === Infinity || result === -Infinity || result.toString() === 'NaN') result = 'Impossível Determinar!';

		const embed = new ClientEmbed(author)
			.setAuthor(`${this.client.user.username}'s Calculadora`, this.client.user.displayAvatarURL())
			.setTitle(`Calculadora - ${this.client.user.username}`)
			.addField('Expressão', `\`\`\`js\n${args.join(' ')}\`\`\``)
			.addField('Resultado', `\`\`\`js\n${result}\`\`\``);

		message.channel.send(author, embed);
	}

};
