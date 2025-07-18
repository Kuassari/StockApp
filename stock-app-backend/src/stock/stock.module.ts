import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [HttpModule],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}