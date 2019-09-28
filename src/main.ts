import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { EnvironmentConfigUtils as env, morgan as morganMiddleware } from './shared/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('nestjs-chat-server')
    .setSchemes('http')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  for (const path of Object.keys(document.paths)) {
    for (const method of Object.keys(document.paths[path])) {

      if (document.paths[path][method].parameters && document.paths[path][method].parameters.length) {
        document.paths[path][method].parameters.forEach((parameter, index) => {
          if (parameter.schema) {
            const prevSchema = parameter.schema;
            document.paths[path][method].parameters[index].schema = {
              type: 'object',
              properties: {
                data: {
                  $ref: prevSchema.$ref,
                },
              },
            };
          }
        });
      }
    }
  }

  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('api/docs', app, document);

  app.use(cors());
  app.use(morganMiddleware);
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  const port: number = env.number('PORT', 3000);
  await app.listen(port);
  console.log(`Server has started on port: ${port}`);

}
bootstrap();
