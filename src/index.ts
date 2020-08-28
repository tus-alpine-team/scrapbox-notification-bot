import { ScrapboxNotifyData } from './scrapboxNotifyData';
import { sendToLine } from './sendToLine';
import { cacheURLs, flushURLs } from './cacheURL';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doPost(e: any): void {
    const data = JSON.parse(e.postData.getDataAsString()) as ScrapboxNotifyData;
    const hr = '------------';

    // 更新されたページのURLを取得する
    const urls = data.attachments.map((notice) => notice.title_link);
    cacheURLs(urls);
    const result = [
        hr,
        '本日は以下の記事が更新されました。',
        ...flushURLs().map((url) => ` ･ ${url}`),
    ];
    sendToLine(result.join('\n'));
}
