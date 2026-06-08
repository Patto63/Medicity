import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam,
} from '@nestjs/swagger';
@Controller('users')
export class UsersController {
constructor(private usersService: UsersService){}

    @Delete('users/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    deleteUser(@Param('id') id: string) {
        return this.usersService.eliminarPorCedula(id);
    }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    getAllUsers() {
      return this.usersService.findAll();
    }

}




