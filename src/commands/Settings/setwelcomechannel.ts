import { VenusCommand, VenusCommandStrings, VenusMessage } from '../../interfaces/Client';
import { replace, wrongSyntax } from '../../utils/Util';

const callback = async (message: VenusMessage, args: string[], strings: VenusCommandStrings) => {
    const guildSettings = await message.client.getSettings(message);
    if (!guildSettings) return;

    if (!args.length) {
        guildSettings.channels.welcomeChannel = '';
        guildSettings.save();
        return message.channel.send(strings.RESET);
    }
    const channel = message.mentions.channels.first() || message.guild?.channels.cache.get(args[0]);
    if (!channel) return wrongSyntax(message, strings.NO_CHANNEL);
    if (channel.type !== 'text') return wrongSyntax(message, strings.VERY_FUNNY);

    guildSettings.channels.welcomeChannel = channel.id;
    await guildSettings.save();

    return message.channel.send(
        replace(strings.SUCCESS, {
            CHANNEL: channel.name
        })
    );
};

export const command: VenusCommand = {
    name: 'setwelcomechannel',
    category: 'SETTINGS',
    aliases: ['welcomechannel', 'wchannel'],
    developerOnly: false,
    nsfw: false,
    guildOnly: true,
    dmOnly: false,
    requiresArgs: 0,
    userPermissions: 'MANAGE_GUILD',
    botPermissions: '',
    callback: callback
};
