/* eslint-disable consistent-return */
/* eslint-disable no-process-env */
const {
	Client,
	Collection,
	Intents
} = require('discord.js');
const klaw = require('klaw');
const path = require('path');
const {
	promisify
} = require('util');
const readdir = promisify(require('fs').readdir);
const Files = require('./utils/Files');
const color = require('colors');

class BotTutorial extends Client {

	constructor(options) {
		super(options);
		this.commands = new Collection();
		this.aliases = new Collection();
		this.database = new Collection();
		this.subcommands = new Collection();
	}

	async login(token) {
		token = process.env.TOKEN;
		await super.login(token);
		return [await this.initLoaders()];
	}

	load(commandPath, commandName) {
		const props = new (require(`${commandPath}/${commandName}`))(this);

		if (props.isSub) {
			if (!this.subcommands.get(props.reference)) {
				this.subcommands.set(props.reference, new Collection());
			}

			this.subcommands.get(props.reference).set(props.name, props);
		}

		if (props.isSub) return;

		props.location = commandPath;

		if (props.init) {
			props.init(this);
		}

		this.commands.set(props.name, props);

		props.aliases.forEach((aliases) => {
			this.aliases.set(aliases, props.name);
		});

		return false;
	}

	async initLoaders() {
		return Files.requireDirectory('./src/loaders', (Loader) => {
			Loader.load(this).then(console.log(color.green('[LOADERS] - Loaders carregados com sucesso.')));
		});
	}

}

const dbIndex = require('./database/index.js');
dbIndex.start();

const client = new BotTutorial({
	intents: new Intents(32767),
	partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER']
});

// process.on('warning', (warning) => {
//   console.warn('Nome Aviso:', warning.name);
//   console.warn('Mensagem Aviso:', warning.message);
//   console.warn('Sack Aviso:', warning.stack);
// });

// process.on('multipleResolves', (type, reason, promise) => {
//     console.log('🚫 Erro Detectado 1:\n\n' + type, promise, reason);
// });

// process.on('unhandRejection', (reason, promise) => {
//     console.log('🚫 Erro Detectado 2:\n\n' + reason, promise);
// });

// process.on('uncaughtException', (error, origin) => {
//     console.log('🚫 Erro Detectado 3:\n\n' + error, origin);
// });

// process.on('uncaughtExceptionMonitor', (error, origin) => {
//     console.log('🚫 Erro Detectado 4:\n\n' + error, origin);
// });

const onLoad = async () => {
	klaw('src/commands').on('data', (item) => {
		const cmdFile = path.parse(item.path);
		if (!cmdFile.ext || cmdFile.ext !== '.js') return;
		const response = client.load(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`);
		if (response) return;
	});

	const eventFiles = await readdir(`./src/client/listeningIn/`);
	eventFiles.forEach((file) => {
		const eventName = file.split('.')[0];
		const event = new (require(`./client/listeningIn/${file}`))(client);
		client.on(eventName, (...args) => event.run(...args));
		delete require.cache[require.resolve(`./client/listeningIn/${file}`)];
	});

	client.login();
};

onLoad();
