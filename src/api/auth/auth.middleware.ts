import { Inject, Injectable, HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        @Inject('UtilService') private readonly utilService,
        @Inject('UserService') private readonly userService,
    ) { }

    public async use(req: any, res: Response, next: NextFunction) {
        if (req.headers.cookie && (req.headers.cookie as string).split(' ')[0] === 'Bearer') {
            const token = (req.headers.cookie as string).split(' ')[1];
            // const decoded: any = jwt.verify(token, this.utilService.environmentConfigUtils.string('JWT_KEY', ''));
            // req.user = decoded;
            
            // let user: IUser = await this.userService.findById(id);
            // if (!user.isLoggedIn) {
            //     throw new HttpException({
            //         status: HttpStatus.CONFLICT,
            //         error: `User is not logged in`,
            //     }, HttpStatus.CONFLICT);
            // }
            next();
        } else {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'Unauthorized',
            }, HttpStatus.UNAUTHORIZED);
        }
    }
}
