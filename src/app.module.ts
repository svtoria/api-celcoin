import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { BillpaymentsModule } from "./billpayments/billpayments.module";
import { TasksService } from "./taskservice";

@Module({
  imports: [BillpaymentsModule, ScheduleModule.forRoot(), HttpModule],
  controllers: [],
  providers: [TasksService],
})
export class AppModule {}
