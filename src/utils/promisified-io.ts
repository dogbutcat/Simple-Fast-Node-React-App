import * as fs from 'fs';
import * as request from 'request';

export function httpRequest(url: string, method?: string) {
    if (!method) method = 'GET'
    return new Promise<string>((resolve, reject) => {
        let options = {
            url,
            method,
            header: {
                "User-Agent": "Node Server v4.0"
            }
        };
        request(options, (err, response, body) => {
            if (err) reject(err);
            else if (response.statusCode !== 200)
                reject(response.statusCode);
            else resolve(body)
        })
    });
}

export function readFile(fileName: string) {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            err ? reject(err) : resolve(data);
        })
    })
}

export function writeFile(fileName: string, data: string) {
    return new Promise<boolean>((resolve, reject) => {
        var fsOption = {encoding:'utf8',mode:'0o777',flag:'w'}
        fs.writeFile(fileName, data, fsOption, (err) => {
            err ? reject(err) : resolve(true);
        })
    })
}