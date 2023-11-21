import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const authService: AuthService = app.get(AuthService);

  app.setGlobalPrefix('api')
  app.enableCors()

  await authService.createAdmin()

  await app.listen(4200);
}
bootstrap();
