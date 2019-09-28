import { Global, Module } from '@nestjs/common';

import { FindAllService, UtilService } from './services';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [FindAllService, UtilService],
  exports: [FindAllService, UtilService],
})
export class SharedModule { }
