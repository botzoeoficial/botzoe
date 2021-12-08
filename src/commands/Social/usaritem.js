/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
const Command = require('../../structures/Command');
const ClientEmbed = require('../../structures/ClientEmbed');

module.exports = class Usaritem extends Command {

	constructor(client) {
		super(client);

		this.client = client;

		this.name = 'usaritem';
		this.category = 'Social';
		this.description = 'Use um item do seu inventário!';
		this.usage = 'usar <item>';
		this.aliases = ['comer', 'usar', 'beber', 'tomar'];

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
		prefix,
		args
	}) {
		const user = await this.client.database.users.findOne({
			userId: author.id,
			guildId: message.guild.id
		});

		const ope = args.join(' ');

		if (!ope) return message.reply('você precisa colocar o nome de um item do seu inventário!');

		const hasItem = user.inventory.find((xs) => xs.item.toLowerCase() === ope.toLowerCase());

		if (!hasItem) {
			return message.reply(`você não possui este item no seu inventário! Use \`${prefix}inv\` para ver os itens do seu inventário.`);
		}

		if (ope.toLowerCase() === 'água' || ope.toLowerCase() === 'agua') {
			const findWater = user.inventory.find((xs) => xs.item === 'Água');

			const embedWater = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🥤 | Você bebeu uma \`Água\` e conseguiu as seguintes melhorias:\n\n🥤 **Sede:** +50\n😰 **Cansado:** +30\n😡 **Bravo:** +20\n🥺 **Solitário:** +0`);

			message.channel.send(author, embedWater);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.sede': user.humores.sede += 50,
					'humores.cansado': user.humores.cansado += 30,
					'humores.bravo': user.humores.bravo += 20,
					'humores.solitario': user.humores.solitario += 0
				}
			});

			if (findWater.quantia <= 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findWater.item
						}
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findWater.item
				}, {
					$set: {
						'inventory.$.quantia': findWater.quantia - 1
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'suco') {
			const findSuco = user.inventory.find((xs) => xs.item === 'Suco');

			const embedSuco = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🧃 | Você bebeu um \`Suco\` e conseguiu as seguintes melhorias:\n\n🥤 **Sede:** +40\n😰 **Cansado:** +30\n😡 **Bravo:** +10\n🥺 **Solitário:** +0`);

			message.channel.send(author, embedSuco);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.sede': user.humores.sede += 40,
					'humores.cansado': user.humores.cansado += 30,
					'humores.bravo': user.humores.bravo += 10,
					'humores.solitario': user.humores.solitario += 0
				}
			});

			if (findSuco.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findSuco.item
				}, {
					$set: {
						'inventory.$.quantia': findSuco.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findSuco.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'refrigerante') {
			const findRefrigerante = user.inventory.find((xs) => xs.item === 'Refrigerante');

			const embedRefrigerante = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`<:pink_soda:891034945085120572> | Você bebeu um \`Refrigerante\` e conseguiu as seguintes melhorias:\n\n🥤 **Sede:** +30\n😰 **Cansado:** +20\n😡 **Bravo:** +0\n🥺 **Solitário:** +10`);

			message.channel.send(author, embedRefrigerante);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.sede': user.humores.sede += 30,
					'humores.cansado': user.humores.cansado += 20,
					'humores.bravo': user.humores.bravo += 0,
					'humores.solitario': user.humores.solitario += 10
				}
			});

			if (findRefrigerante.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findRefrigerante.item
				}, {
					$set: {
						'inventory.$.quantia': findRefrigerante.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findRefrigerante.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'café' || ope.toLowerCase() === 'cafe') {
			const findCafe = user.inventory.find((xs) => xs.item === 'Café');

			const embedCafe = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`☕ | Você bebeu um \`Café\` e conseguiu as seguintes melhorias:\n\n🥤 **Sede:** +0\n😰 **Cansado:** +60\n😡 **Bravo:** -20\n🥺 **Solitário:** +30`);

			message.channel.send(author, embedCafe);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.sede': user.humores.sede += 0,
					'humores.cansado': user.humores.cansado += 60,
					'humores.bravo': user.humores.bravo -= 20,
					'humores.solitario': user.humores.solitario += 30
				}
			});

			if (findCafe.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findCafe.item
				}, {
					$set: {
						'inventory.$.quantia': findCafe.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findCafe.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'energético' || ope.toLowerCase() === 'energetico') {
			const findEnergetico = user.inventory.find((xs) => xs.item === 'Energético');

			const embedEnergetico = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`<:MonsterEnergyDrink:891035343262990366> | Você bebeu um \`Energético\` e conseguiu as seguintes melhorias:\n\n🥤 **Sede:** +50\n😰 **Cansado:** +30\n😡 **Bravo:** +0\n🥺 **Solitário:** +0`);

			message.channel.send(author, embedEnergetico);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.sede': user.humores.sede += 50,
					'humores.cansado': user.humores.cansado += 30,
					'humores.bravo': user.humores.bravo += 0,
					'humores.solitario': user.humores.solitario += 0
				}
			});

			if (findEnergetico.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findEnergetico.item
				}, {
					$set: {
						'inventory.$.quantia': findEnergetico.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findEnergetico.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'cerveja') {
			const findCerveja = user.inventory.find((xs) => xs.item === 'Cerveja');

			const embedCerveja = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🍻 | Você bebeu uma \`Cerveja\` e conseguiu as seguintes melhorias:\n\n🥤 **Sede:** +50\n😰 **Cansado:** -20\n😡 **Bravo:** -10\n🥺 **Solitário:** +50`);

			message.channel.send(author, embedCerveja);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.sede': user.humores.sede += 50,
					'humores.cansado': user.humores.cansado -= 20,
					'humores.bravo': user.humores.bravo -= 10,
					'humores.solitario': user.humores.solitario += 50
				}
			});

			if (findCerveja.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findCerveja.item
				}, {
					$set: {
						'inventory.$.quantia': findCerveja.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findCerveja.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'sanduíche' || ope.toLowerCase() === 'sanduiche') {
			const findSanduiche = user.inventory.find((xs) => xs.item === 'Sanduíche');

			const embedSanduiche = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🍔 | Você comeu um \`Sanduíche\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** +90\n😰 **Cansado:** -10\n🥺 **Solitário:** +20`);

			message.channel.send(author, embedSanduiche);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome += 90,
					'humores.cansado': user.humores.cansado -= 10,
					'humores.solitario': user.humores.solitario += 20
				}
			});

			if (findSanduiche.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findSanduiche.item
				}, {
					$set: {
						'inventory.$.quantia': findSanduiche.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findSanduiche.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'pizza') {
			const findPizza = user.inventory.find((xs) => xs.item === 'Pizza');

			const embedPizza = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🍕 | Você comeu uma \`Pizza\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** +80\n😰 **Cansado:** -20\n🥺 **Solitário:** +60`);

			message.channel.send(author, embedPizza);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome += 80,
					'humores.cansado': user.humores.cansado -= 20,
					'humores.solitario': user.humores.solitario += 60
				}
			});

			if (findPizza.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findPizza.item
				}, {
					$set: {
						'inventory.$.quantia': findPizza.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findPizza.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'batata frita') {
			const findBatata = user.inventory.find((xs) => xs.item === 'Batata Frita');

			const embedBatata = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🍟 | Você comeu uma \`Batata Frita\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** +50\n😰 **Cansado:** +30\n🥺 **Solitário:** +20`);

			message.channel.send(author, embedBatata);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome += 50,
					'humores.cansado': user.humores.cansado += 30,
					'humores.solitario': user.humores.solitario += 20
				}
			});

			if (findBatata.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findBatata.item
				}, {
					$set: {
						'inventory.$.quantia': findBatata.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findBatata.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'misto quente') {
			const findMisto = user.inventory.find((xs) => xs.item === 'Misto Quente');

			const embedMisto = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🥪 | Você comeu um \`Misto Quente\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** +30\n😰 **Cansado:** -10\n🥺 **Solitário:** -20`);

			message.channel.send(author, embedMisto);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome += 30,
					'humores.cansado': user.humores.cansado -= 10,
					'humores.solitario': user.humores.solitario -= 20
				}
			});

			if (findMisto.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findMisto.item
				}, {
					$set: {
						'inventory.$.quantia': findMisto.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findMisto.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'carne') {
			const findCarne = user.inventory.find((xs) => xs.item === 'Carne');

			const embedCarne = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🥩 | Você comeu uma \`Carne\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** +50\n😰 **Cansado:** +40\n🥺 **Solitário:** +20`);

			message.channel.send(author, embedCarne);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome += 50,
					'humores.cansado': user.humores.cansado += 40,
					'humores.solitario': user.humores.solitario += 20
				}
			});

			if (findCarne.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findCarne.item
				}, {
					$set: {
						'inventory.$.quantia': findCarne.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findCarne.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'taco' || ope.toLowerCase() === 'tacos') {
			const findTaco = user.inventory.find((xs) => xs.item === 'Tacos');

			const embedTaco = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🌮 | Você comeu um \`Taco\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** +60\n😰 **Cansado:** -20\n🥺 **Solitário:** +40`);

			message.channel.send(author, embedTaco);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome += 60,
					'humores.cansado': user.humores.cansado -= 20,
					'humores.solitario': user.humores.solitario += 40
				}
			});

			if (findTaco.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findTaco.item
				}, {
					$set: {
						'inventory.$.quantia': findTaco.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findTaco.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'miojo') {
			const findMiojo = user.inventory.find((xs) => xs.item === 'Miojo');

			const embedMiojo = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🍜 | Você comeu um \`Miojo\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** +40\n😰 **Cansado:** -10\n🥺 **Solitário:** -30`);

			message.channel.send(author, embedMiojo);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome += 40,
					'humores.cansado': user.humores.cansado -= 10,
					'humores.solitario': user.humores.solitario -= 30
				}
			});

			if (findMiojo.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findMiojo.item
				}, {
					$set: {
						'inventory.$.quantia': findMiojo.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findMiojo.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'rosquinha') {
			const findRosquinha = user.inventory.find((xs) => xs.item === 'Rosquinha');

			const embedRosquinha = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🍩 | Você comeu uma \`Rosquinha\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** +10\n😭 **Triste:** +20\n😵‍💫 **Desanimado:** +30\n🥺 **Solitário:** +30\n🤯 **Estressado:** -20`);

			message.channel.send(author, embedRosquinha);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome += 10,
					'humores.triste': user.humores.triste += 20,
					'humores.desanimado': user.humores.desanimado += 30,
					'humores.solitario': user.humores.solitario += 30,
					'humores.estressado': user.humores.estressado -= 20
				}
			});

			if (findRosquinha.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findRosquinha.item
				}, {
					$set: {
						'inventory.$.quantia': findRosquinha.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findRosquinha.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'chocolate') {
			const findChocolate = user.inventory.find((xs) => xs.item === 'Chocolate');

			const embedChocolate = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🍫 | Você comeu um \`Chocolate\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** -30\n😭 **Triste:** +40\n😵‍💫 **Desanimado:** +40\n🥺 **Solitário:** +60\n🤯 **Estressado:** +40`);

			message.channel.send(author, embedChocolate);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome -= 30,
					'humores.triste': user.humores.triste += 40,
					'humores.desanimado': user.humores.desanimado += 40,
					'humores.solitario': user.humores.solitario += 60,
					'humores.estressado': user.humores.estressado += 40
				}
			});

			if (findChocolate.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findChocolate.item
				}, {
					$set: {
						'inventory.$.quantia': findChocolate.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findChocolate.item
						}
					}
				});
			}

			user.save();
		} else if (ope.toLowerCase() === 'pipoca') {
			const findPipoca = user.inventory.find((xs) => xs.item === 'Pipoca');

			const embedPipoca = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🍿 | Você comeu uma \`Pipoca\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** -10\n😭 **Triste:** +20\n😵‍💫 **Desanimado:** +40\n🥺 **Solitário:** +40\n🤯 **Estressado:** +30`);

			message.channel.send(author, embedPipoca);

			if (findPipoca.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findPipoca.item
				}, {
					$set: {
						'inventory.$.quantia': findPipoca.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findPipoca.item
						}
					}
				});
			}

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome -= 30,
					'humores.triste': user.humores.triste += 40,
					'humores.desanimado': user.humores.desanimado += 40,
					'humores.solitario': user.humores.solitario += 60,
					'humores.estressado': user.humores.estressado += 40
				}
			});

			user.save();
		} else if (ope.toLowerCase() === 'bolo') {
			const findBolo = user.inventory.find((xs) => xs.item === 'Bolo');

			const embedBolo = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🍰 | Você comeu um \`Bolo\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** +30\n😭 **Triste:** +30\n😵‍💫 **Desanimado:** +20\n🥺 **Solitário:** +20\n🤯 **Estressado:** +20`);

			message.channel.send(author, embedBolo);

			if (findBolo.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findBolo.item
				}, {
					$set: {
						'inventory.$.quantia': findBolo.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findBolo.item
						}
					}
				});
			}

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome += 30,
					'humores.triste': user.humores.triste += 30,
					'humores.desanimado': user.humores.desanimado += 20,
					'humores.solitario': user.humores.solitario += 20,
					'humores.estressado': user.humores.estressado += 20
				}
			});

			user.save();
		} else if (ope.toLowerCase() === 'cookie') {
			const findCookie = user.inventory.find((xs) => xs.item === ope);

			const embedCookie = new ClientEmbed(author)
				.setTitle('Item Usado')
				.setDescription(`🍪 | Você comeu um \`Cookie\` e conseguiu as seguintes melhorias:\n\n🍽️ **Fome:** +10\n😭 **Triste:** +20\n😵‍💫 **Desanimado:** +10\n🥺 **Solitário:** +10\n🤯 **Estressado:** -10`);

			message.channel.send(author, embedCookie);

			await this.client.database.users.findOneAndUpdate({
				userId: author.id,
				guildId: message.guild.id
			}, {
				$set: {
					'humores.fome': user.humores.fome += 10,
					'humores.triste': user.humores.triste += 20,
					'humores.desanimado': user.humores.desanimado += 10,
					'humores.solitario': user.humores.solitario += 10,
					'humores.estressado': user.humores.estressado -= 10
				}
			});

			if (findCookie.quantia > 1) {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id,
					'inventory.item': findCookie.item
				}, {
					$set: {
						'inventory.$.quantia': findCookie.quantia - 1
					}
				});
			} else {
				await this.client.database.users.findOneAndUpdate({
					userId: author.id,
					guildId: message.guild.id
				}, {
					$pull: {
						inventory: {
							item: findCookie.item
						}
					}
				});
			}

			user.save();
		}
	}

};
