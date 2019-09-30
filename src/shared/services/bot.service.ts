import { isEmpty, isString, reduce } from 'lodash';
import * as request from 'request-promise';
import { EnvironmentConfigUtils as env } from './environment-config.service';

import { IPost } from '../../api';

export interface IStock {
    symbol?: string;
    date?: string;
    time?: string;
    open?: string;
    high?: string;
    low?: string;
    close?: string;
    volume?: string;
}
export class BotService {
    public static mayBeACmd(post: IPost) {
        const regex = /(\/stock=)/g;
        return regex.test(post.content);
    }

    public static async parseCmd(post: IPost) {
        const regex = /^(\/stock=)([A-Za-z]+\.[A-Za-z]+)/g;
        const user: any = {
            username: 'Stock Bot',
        };
        post.user = user;
        post.userId = null;
        post.createdAt = new Date().toISOString();
        const msg = `Sorry, I didn't understood the command. Could you try again with the following format:\n /stock=stock_code\nThanks!`;
        try {
            if (regex.test(post.content.replace(/\s/g, ''))) {
                const content = await BotService.getContent(post.content.replace(/\s/g, ''));
                if (isString(content)) {
                    post.content = content;
                } else {
                    throw new Error('Something went wrong during the content parsing');
                }
            } else {
                post.content = msg;
            }
            return post;
        } catch (e) {
            console.error(e);
            post.content = msg;
        }
        return post;
    }

    private static async getContent(content: string): Promise<string> {
        const STOCK_URL = env.string('STOCK_API', '');
        const [cmd, stockCode] = content.split('=');
        const url = `${STOCK_URL}?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`;
        const response = await request.get(url);
        return BotService.parseResponse(response);
    }

    private static parseResponse(response: string): string {
        let content = null;
        const rows = response.split('\r\n');
        const headers = rows.shift();
        rows.pop();
        if (!isEmpty(rows)) {
            content = reduce(rows, (accum, row) => {
                const stock: IStock = BotService.parseRow(row);
                accum.push(`${stock.symbol} quote is $${stock.close} per share`);
                return accum;
            }, []).join('\n');
        }
        return content;
    }

    private static parseRow(row: string): IStock {
        const [symbol, date, time, open, high, low, close, volume] = row.split(',');
        const stock: IStock = {
            symbol,
            date,
            time,
            open,
            high,
            low,
            close,
            volume,
        };
        return stock;
    }
}
