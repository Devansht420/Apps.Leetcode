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
        const [username, subcommand] = context.getArguments();
        const user = context.getSender();
        const room: IRoom = context.getRoom();


        if(!username || !subcommand){
            throw new Error('Error! Please enter the username and subcommand');
        }

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

    // private async sendMessage(context: SlashCommandContext, modify: IModify, message: string): Promise<void>{
    //     const messageStructure = modify.getCreator().startMessage();
    //     const sender = context.getSender();
    //     const room = context.getRoom();

    //     messageStructure
    //         .setSender(sender)
    //         .setRoom(room)
    //         .setText(message);

    //     await modify.getCreator().finish(messageStructure);
    // }

    private async notifyMessage(room: IRoom, read: IRead, sender: IUser, message: string): Promise<void> {
        const notifier = read.getNotifier();
        const messageBuilder = notifier.getMessageBuilder();
        messageBuilder.setText(message);
        messageBuilder.setRoom(room);
        return notifier.notifyRoom(room, messageBuilder.getMessage());
    }
}
