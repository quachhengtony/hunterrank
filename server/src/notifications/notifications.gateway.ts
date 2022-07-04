import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebSocketGateway.name);
  private readonly jwtService = new JwtService();
  private users = new Set();
  private currentUser = {};

  constructor(private readonly notificationsService: NotificationsService) {}

  afterInit(server: Server) {
    this.logger.log('Server init');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    const token = client.handshake.headers.authorization;
    try {
      const validated = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const newUser = {
        clientId: client.id,
        userId: validated.sub,
      };
      this.users.add(newUser);
      this.currentUser = newUser;
      const payload = await this.notificationsService.getNotificationsByUserId(
        validated.sub,
      );
      const x = [...this.users].indexOf(newUser);
      if (x >= 0) {
        this.server
          .to([...this.users][x]['clientId'])
          .emit('notifications', payload);
      }
    } catch (err) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.users.delete(this.currentUser);
  }
}
