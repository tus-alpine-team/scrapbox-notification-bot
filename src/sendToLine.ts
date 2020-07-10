// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function sendToLine(message: string): void {
    const token = ScriptProperties.getProperty('LINE_ACCESS_TOKEN');
    if (!token) {
        console.error('The LINE Notify access token is not found.');
        return;
    }
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        method: 'post',
        payload: `message=${message}`,
        headers: { Authorization: `Bearer ${token}` },
    };
    UrlFetchApp.fetch('https://notify-api.line.me/api/notify', options);
}
