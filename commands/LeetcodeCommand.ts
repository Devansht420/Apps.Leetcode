import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import {
    ISlashCommand,
    SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

export class LeetcodeCommand implements ISlashCommand {
    public command = 'lc';
    public i18nParamsExample = '';
    public i18nDescription = '';
    public providesPreview = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const args = context.getArguments();
        const user = context.getSender();
        const room: IRoom = context.getRoom();

        const appUser = await read.getUserReader().getAppUser();
        if (!appUser) {
            throw new Error('App user not found');
        }

        if (args.length === 1 && args[0].toLowerCase() === 'help') {
            await this.notifyMessageHelp(room, read, user,
                "Hi, This is Leetcode Bot, Here are some tips to get started \n Use `/lc <leetcode-username> ques` to get the number of questions and type of questions of the user \n Use `/lc <leetcode-username> stats` to get the stats of the user \n Use `/lc help` to get help");
            return;
        }

        if (args.length < 2) {
            await this.notifyMessageHelp(room, read, user, "Please provide an appropriate slash command \n Use `/lc help` to know more");
            return;
        }

        const [username, subcommand] = args;

        switch(subcommand.toLowerCase()){
            case 'ques':
                await this.notifyMessage(room, read, user, `Fetching questions for ${username}`)
                break;
            case 'stats':
                await this.notifyMessage(room, read, user, `Fetching stats for ${username}`);
                break;
            default:
                throw new Error("Error! Unrecognized subcommand.");
        }
    }

    private async notifyMessage(room: IRoom, read: IRead, sender: IUser, message: string): Promise<void> {
        const notifier = read.getNotifier();
        const messageBuilder = notifier.getMessageBuilder();
        messageBuilder.setText(message);
        messageBuilder.setRoom(room);
        return notifier.notifyRoom(room, messageBuilder.getMessage());
    }

    private async notifyMessageHelp(room: IRoom, read: IRead, user: IUser, message: string): Promise<void> {
        const notifier = read.getNotifier();
        const messageBuilder = notifier.getMessageBuilder();
        messageBuilder.setText(message);
        messageBuilder.setRoom(room);
        return notifier.notifyUser(user, messageBuilder.getMessage());
    }
}
