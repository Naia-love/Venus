import { VenusCommand, VenusMessage } from '../../interfaces/Client';
import { sendHentai } from '../../utils/nekos';

const callback = async (message: VenusMessage, _args: string[]) => {
    return sendHentai(message, 'feetGif');
};

export const command: VenusCommand = {
    name: 'feetgif',
    category: 'NSFW',
    aliases: ['feetg'],
    developerOnly: false,
    nsfw: true,
    guildOnly: false,
    dmOnly: false,
    requiresArgs: 0,
    userPermissions: '',
    botPermissions: '',
    callback: callback
};
