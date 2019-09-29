import { Inject, Injectable, HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { IUser } from '../';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        @Inject('UtilService') private readonly utilService,
        @Inject('UserService') private readonly userService,
    ) { }

    public async use(req: any, res: Response, next: NextFunction) {
        if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Bearer') {
            const token = (req.headers.authorization as string).split(' ')[1];
            const decoded: any = jwt.verify(token, this.utilService.environmentConfigUtils.string('JWT_KEY', ''));
            req.user = decoded;
            // let user: IUser = await this.userService.findById(req.user._id);
            // if (!user.isLoggedIn) {
            //     throw new HttpException({
            //         status: HttpStatus.UNAUTHORIZED,
            //         error: `User is not logged in`,
            //     }, HttpStatus.UNAUTHORIZED);
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
