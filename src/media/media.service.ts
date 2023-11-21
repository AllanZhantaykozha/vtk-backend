import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { log } from 'console';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid'

@Injectable()
export class MediaService {
    async createFile(file: any): Promise<string> {
        try {
            const fileName = uuid.v4() + '.' + file.originalname.split('.').pop()
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            } 
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch(e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }   
}
