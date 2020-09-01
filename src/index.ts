import { ScrapboxProjectResponse } from './scrapboxProjectResponse';
import { sendToLine } from './sendToLine';

const project_name = 'tus-alpine';

// 更新情報をLINEに投げる
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function postMessage(): void {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(20);
    yesterday.setMinutes(0);
    const urls = getModifiedURLs(yesterday);
    if (urls.length == 0) return;
    const hr = '\n------------';
    const result = [
        hr,
        '本日は以下の記事が更新されました。',
        ...urls.map((url) => ` ･ ${url}`),
        `詳細は https://scrapbox.io/stream/${project_name}/ を御覧ください`,
    ];
    sendToLine(result.join('\n'));
}

// 大体20:00に更新情報を投げるように設定する
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

// 特定の時間以降に更新されたページのURLを取得する
function getModifiedURLs(from: Date): string[] {
    const response = UrlFetchApp.fetch(
        `https://scrapbox.io/api/pages/${project_name}`
    ).getContentText('UTF-8');
    const json = JSON.parse(response) as ScrapboxProjectResponse;
    return (
        json.pages
            // 更新日時順にsortする
            .sort((a, b) => b.updated - a.updated)
            // 指定した時刻以降に更新されたpageのみ抽出する
            .filter((page) => page.updated * 1000 >= from.getTime())
            .map(
                (page) =>
                    `https://scrapbox.io/${project_name}/${page.title.replace(
                        /\s/g,
                        '_'
                    )}`
            )
    );
}
