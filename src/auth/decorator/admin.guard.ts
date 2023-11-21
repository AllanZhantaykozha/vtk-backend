import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Предполагается, что информация о пользователе будет доступна через запрос

    return user.isAdmin; // Здесь предполагается, что у пользователя есть поле isAdminus
  }
}