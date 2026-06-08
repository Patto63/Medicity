
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('Hospital Admin API')
    .setDescription('Documentación del microservicio hospital-admin-service')
    .setVersion('1.0')
    .addTag('medico')
    .addTag('empleado')
    .addTag('centro-medico')
    .addTag('especialidad')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

app.enableCors({
  origin: ['http://localhost:5173' , 'http://20.82.216.9'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});


    await app.listen(process.env.PORT || 3000);

}
bootstrap();
