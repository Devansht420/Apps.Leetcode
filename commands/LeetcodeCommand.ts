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
        const url  = `https://leetcode-stats-api.herokuapp.com/${username}`
        const response = await http.get(url);


        if(response.data.status === 'error'){
            await this.notifyMessage(room, read, user, `The user **${username}** does not exist \n Please provide a valid username`);
            return;
        }

        switch(subcommand.toLowerCase()){
            case 'ques':
                await this.notifyMessage(room, read, user, `Fetching questions for **${username}**`)
                await this.notifyMessage(room, read, user, `Total number of questions solved - **${response.data.totalSolved} / ${response.data.totalQuestions}** \n Number of easy questions solved - **${response.data.easySolved} / ${response.data.totalEasy}** \n Number of medium questions solved - **${response.data.mediumSolved} / ${response.data.totalMedium}** \n Number of hard questions solved - **${response.data.hardSolved} / ${response.data.totalHard}**`)
                break;
            case 'stats':
                await this.notifyMessage(room, read, user, `Fetching stats for  **${username}**`);
                await this.notifyMessage(room, read, user, `Acceptance rate - **${response.data.acceptanceRate}** \n Ranking - **${response.data.ranking}**`)
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
