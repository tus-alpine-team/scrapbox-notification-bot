import { ScrapboxNotifyData } from './scrapboxNotifyData';
import { sendToLine } from './sendToLine';
import { cacheURLs, flushURLs } from './cacheURL';

// 更新情報をLINEに投げる
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function postMessage(): void {
    const urls = flushURLs();
    if (urls.length == 0) return;
    const hr = '\n------------';
    const result = [
        hr,
        '本日は以下の記事が更新されました。',
        ...urls.map((url) => ` ･ ${url}`),
        '詳細は https://scrapbox.io/stream/tus-alpine/ を御覧ください',
    ];
    sendToLine(result.join('\n'));
}

// 20:00に更新情報を投げるように設定する
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setTrigger(): void {
    //作成済みのtriggerがあったら全て消す
    ScriptApp.getProjectTriggers()
        .filter((trigger) => trigger.getHandlerFunction() == 'postMessage')
        .forEach((trigger) => ScriptApp.deleteTrigger(trigger));

    const now = new Date();
    now.setHours(20);
    now.setMinutes(0);
    ScriptApp.newTrigger('postMessage').timeBased().at(now).create();
}
