import { ScrapboxNotifyData } from './scrapboxNotifyData';
import { sendToLine } from './sendToLine';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(e: any): void {
    const data = JSON.parse(e.postData.getDataAsString()) as ScrapboxNotifyData;
    const hr = '------------';

    // dataを整形する

    // 各更新通知を合体する
    const result = data.attachments
        .map(
            (notice) =>
                notice.text.replace(
                    /<(https?:\/\/[\w\/:%#\$&\?\(\)~\.=\+\-)]*)\|(.*?)>/g,
                    '$2'
                ) + `\n${hr}\nby ${notice.author_name}\n${notice.title_link}`
        )
        .reduce((sum, message) => `${sum}\n${hr}\n${message}`);

    sendToLine(`\n${hr}\n${result}`);
}
