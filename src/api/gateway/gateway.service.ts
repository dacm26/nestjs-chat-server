import { Inject, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BotService } from '../../shared';

@WebSocketGateway()
export class GatewayService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(@Inject('PostService') private readonly postService, ) {
  }

  @WebSocketServer() private server: Server;
  private logger: Logger = new Logger('GatewayService');

  @SubscribeMessage('msgToServer')
  public async handleMessage(client: Socket, payload: string) {
    let post = null;
    try {
      post = JSON.parse(payload);
      let createdPost = null;
      if (BotService.mayBeACmd(post)) {
        createdPost = await BotService.parseCmd(post);
      } else {
        createdPost = await this.postService.create(post, true);
      }
      this.server.emit('msgToClient', JSON.stringify(createdPost));
    } catch (e) {
      const retVal = {
        error: true,
        message: 'Something went wrong',
      };
      this.server.emit('msgToClient', JSON.stringify(retVal));
    }
  }

  public afterInit(server: Server) {
    this.logger.log('Chat Server initialized');
  }

  public handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
