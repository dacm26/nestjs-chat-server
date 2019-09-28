import * as morgan from 'morgan';

export const morganMiddleware = morgan((tokens, req, res) => {
    const method = tokens.method(req);
    const status = tokens.status(req, res);
    const url = tokens.url(req);
    const date = new Date().toISOString();
    const httpVersion = tokens['http-version'](req);

    const morganData = [
        `"method":"${method}"`,
        `"status":${status}`,
        `"url":"${url}"`,
        `"timestamp":"${date}"`,
        `"http-version":"${httpVersion}"`,
    ].join(',');
    return `{ ${morganData} }`;
});
