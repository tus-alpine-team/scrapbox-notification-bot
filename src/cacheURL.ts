const wiki_domain = 'scrapbox.io';
const project_name = 'tus-alpine';
export function cacheURLs(urls: string[]): void {
    const scriptProperties = PropertiesService.getScriptProperties();
    const cachedTitles = (scriptProperties.getProperty(
        'PAGE_NAME_CACHE'
    ) as string).split(' ');
    // urlsからタイトル部分を抽出
    const titles = urls.map((url) =>
        url.replace(/#.*$/, '').replace(/^.*\/\/.*\//, '')
    );

    // 重複を除去
    const newCachedTitles = [...new Set([...cachedTitles, ...titles])];
    scriptProperties.setProperty('PAGE_NAME_CACHE', newCachedTitles.join(' '));
}
function getURLs(): string[] {
    const scriptProperties = PropertiesService.getScriptProperties();
    if (scriptProperties === null) {
        console.error('PropertiesService is not found.');
        return [];
    }
    const cachedTitles = scriptProperties
        .getProperty('PAGE_NAME_CACHE')
        .split(' ');
    return cachedTitles.map(
        (title) => `https://${wiki_domain}/${project_name}/${title}`
    );
}
export function flushURLs(): string[] {
    const urls = getURLs();
    const scriptProperties = PropertiesService.getScriptProperties();
    if (scriptProperties === null) {
        console.error('PropertiesService is not found.');
        return [];
    }
    scriptProperties.setProperty('PAGE_NAME_CACHE', '');
    return urls;
}
