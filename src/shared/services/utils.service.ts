import { Injectable } from '@nestjs/common';
import {
    reduce,
} from 'lodash';
import { Types } from 'mongoose';

import { EnvironmentConfigUtils } from './';

@Injectable()
export class UtilService {
    public environmentConfigUtils: EnvironmentConfigUtils;
    constructor() {
        this.environmentConfigUtils = EnvironmentConfigUtils;
    }

    // Converts the provided mongo id's array to Object Id
    public convertMongoIdToObjectId(ids: Array<string>) {
        return reduce(ids, (steps: Array<Types.ObjectId>, id: string) => {
            steps.push(Types.ObjectId(id));
            return steps;
        }, []);
    }
}
