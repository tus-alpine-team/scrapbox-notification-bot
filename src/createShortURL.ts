export function createShortenURL(url: string): string {
    const BITLY_ACCESS_TOKEN = ScriptProperties.getProperty(
        'BITLY_ACCESS_TOKEN'
    );
    const endpoint = `https://api-ssl.bitly.com/v3/shorten?access_token=${BITLY_ACCESS_TOKEN}%longUrl=${encodeURIComponent(
        url
    )}`;

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        method: 'get',
        contentType: 'application/json;',
    };
    const result = UrlFetchApp.fetch(endpoint, options);
    const json = JSON.parse(result.getContentText('utf-8'));
    return json.data.url;
}
