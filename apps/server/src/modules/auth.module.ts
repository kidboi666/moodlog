import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from '../controllers/auth.controller'
import { UsersModule } from '../modules/users.module'
import { AuthService } from '../services/auth.service'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
