import * as morgan from 'morgan';
import { isNumber } from 'lodash';

export const morgan = ((tokens, req, res) => {
    const method = tokens.method(req, res);
    const status = Number(tokens.status(req, res));
    const statusFinal = isNumber(status) ? status : null;
    const url = tokens.url(req, res);
    const resTime = Number(tokens['response-time'](req, res, 'digits'));
    const resTimeFinal = isNumber(resTime) ? resTime : null;
    // const globalProfileId = req.headers[config.user_id_header()];
    const date = tokens.date(req, res, 'iso');
    const httpVersion = tokens['http-version'](req, res);
    const referrer = tokens.referrer(req, res);
    const remoteAddr = tokens['remote-addr'](req, res);
    const contentLength = Number(tokens.res(req, res, 'content-length'));
    const contentLengthFinal = isNumber(contentLength) ? contentLength : null;
    const userAgent = tokens['user-agent'](req, res);

    const morganData = [
        `"method":"${method}"`,
        `"status":${statusFinal}`,
        `"url":"${url}"`,
        `"response-time":${resTimeFinal}`,
        `"timestamp":"${date}"`,
        `"http-version":"${httpVersion}"`,
        `"referrer":"${referrer}"`,
        `"remote-addr":"${remoteAddr}"`,
        `"content-length":${contentLengthFinal}`,
        `"user-agent":"${userAgent}"`,
    ].join(',');
    return `{ ${morganData} }`;
});
