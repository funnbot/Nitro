const _url = require('url')

module.exports = (url) => {
    url = _url.parse(url, true);
    if (/(?:www\.)?(?:youtu\.be|youtube\.com)/i.test(url.hostname)) {
        if (url.query.list) return 'yt-playlist';
        if (!url.query.v) return 'yt-be';
        return 'yt'
    }
    if (/(?:www\.)?(?:soundcloud\.com)/i.test(url.hostname)) {
        if (/\/sets\//i.test(url.path)) return 'sc-playlist';
        return 'sc';
    }
    return 'nal';
}