import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { GetUser } from 'src/decorator';

@WebSocketGateway()
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebSocketGateway.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  @SubscribeMessage('getNotificationsByUserId')
  async getNotificationsByUserId(@GetUser('id') userId: string) {
    const payload = await this.notificationsService.getNotificationsByUserId(
      userId,
    );
    return payload;
  }

  afterInit(server: Server) {
    this.logger.log('Server init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
