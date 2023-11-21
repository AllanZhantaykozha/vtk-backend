import { Controller, Get, Param, Res } from "@nestjs/common";
import { MediaService } from "./media.service";
import * as path from 'path'

@Controller("/media")
export class MediaController {
    constructor (private mediaService: MediaService) {}

    @Get("/:filename")
    async getFile(@Param("filename") filename: string, @Res() res: any) {
        res.sendFile(filename, { root: path.resolve(__dirname, '..', 'static')});
    }
}
