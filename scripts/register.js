const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const prompt = require("prompt-sync")();
try {
	var { token, application_id } = require("../config.json");
}
catch {
	let confignew = {
		token: prompt("token: ")
		, application_id: prompt("application_id: ")
	}
	const data = JSON.stringify(confignew);
	fs.writeFileSync('../config.json', data, 'utf8');
	var token = confignew.token;
	var application_id = confignew.application_id;
}


const guild = process.argv[2];

const commands = [
	{
		name: "snipe",
		description: "Shows the last deleted message from a specified channel!",
		options: [
			{
				type: 7, // text channel
				name: "channel",
				description: "The channel to snipe",
			},
		],
	},
	{
		name: "editsnipe",
		description: "Shows the last edited message from a specified channel!",
		options: [
			{
				type: 7, // text channel
				name: "channel",
				description: "The channel to snipe",
			},
		],
	},
	{
		name: "reactionsnipe",
		description:
			"Shows the last removed reaction from a specified channel!",
		options: [
			{
				type: 7, // text channel
				name: "channel",
				description: "The channel to snipe",
			},
		],
	},
];

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
	try {
		console.log("[sniper] :: Started refreshing application (/) commands.");

		await rest.put(
			guild
				? Routes.applicationGuildCommands(application_id, guild)
				: Routes.applicationCommands(application_id),
			{
				body: commands,
			}
		);

		console.log(
			"[sniper] :: Successfully reloaded application (/) commands."
		);
	} catch (error) {
		console.error(error);
	}
})();
