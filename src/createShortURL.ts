export function createShortURL(url: string): string {
    const token = ScriptProperties.getProperty('BITLY_ACCESS_TOKEN');

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        method: 'post',
        payload: JSON.stringify({ long_url: url }),
        headers: { Authorization: `Bearer ${token}` },
        contentType: 'application/json',
    };
    try {
        const result = UrlFetchApp.fetch(
            'https://api-ssl.bitly.com/v4/shorten',
            options
        );
        return JSON.parse(result.getContentText('utf-8')).link;
    } catch (error) {
        // 失敗したら元のURLを返す
        return url;
    }
}
