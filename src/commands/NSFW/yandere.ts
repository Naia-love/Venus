import { Message } from 'discord.js';
import Command from '../../interfaces/Command';
import CommandStrings from '../../interfaces/CommandStrings';
import { fetch, wrongSyntax, newEmbed } from '../../utils/Util';

const callback = async (message: Message, args: string[], strings: CommandStrings) => {
    const result = (await fetch('https://yande.re/post.json?limit=100&tags=' + args.join('%20')))?.filter(
        (item: { [key: string]: string }) => !item.tags.includes('loli') && !item.tags.includes('shota')
    );
    if (!result || !result.length) return wrongSyntax(message, strings.NO_RESULT);

    const url = result[Math.floor(Math.random() * result.length)].jpeg_url;
    if (!url) return wrongSyntax(message, strings.NO_RESULT);

    const output = newEmbed(true).setImage(url).setDescription(`[Click me if the image doesn't show.](${url})`);

    return message.channel.send(output);
};

export const command: Command = {
    name: 'yandere',
    category: 'NSFW',
    aliases: ['yande.re'],
    developerOnly: false,
    nsfw: true,
    guildOnly: false,
    dmOnly: false,
    requiresArgs: 1,
    userPermissions: '',
    botPermissions: '',
    callback: callback
};