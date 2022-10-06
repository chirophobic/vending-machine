import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Vending Machine')
        .setDescription('The Vending Machine API description')
        .setVersion('1.0')
        .addTag('vending-machine')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = process.env['PORT'] || 3333;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

void bootstrap();
