// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );


    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('👤 Usuario recibido en RolesGuard:', user);
    console.log('🎯 Roles requeridos en endpoint:', requiredRoles);

    if (!requiredRoles) return true;
    return requiredRoles.some(role => role.trim().toLowerCase() === (user?.rol || '').trim().toLowerCase());


  }
}
