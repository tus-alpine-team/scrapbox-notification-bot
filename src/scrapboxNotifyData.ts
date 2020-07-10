export interface ScrapboxNotifyData {
    text: string; //Slackへ流れる通知のタイトル
    mrkdwn: boolean;
    username: string;
    attachments: {
        title: string; //更新されたページのタイトル
        title_link: string; //更新された行の最初の部分へのリンク
        text: string; //slack用に整形された変更部分
        rawText: string; //Scrapbox記法のままの変更部分
        mrkdwn_in: string[];
        author_name: string; //更新したuserの名前
        image_url: string; //追加された画像のURL
        thumb_url: string; //ページのサムネイルに使われている画像のURL
    }[];
}
