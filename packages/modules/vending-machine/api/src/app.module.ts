import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { VendingMachineInfrastructureModule } from '@vending-machine/modules/vending-machine/infrastructure';
import { VendingMachineApplicationModule } from '@vending-machine/modules/vending-machine/application';

@Module({
    imports: [
        CqrsModule,
        VendingMachineInfrastructureModule,
        VendingMachineApplicationModule.register([VendingMachineInfrastructureModule]),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
