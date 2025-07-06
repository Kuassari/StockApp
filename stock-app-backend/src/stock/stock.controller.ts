import { Controller, Get, Param, Query } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('quote/:symbol')
  async getQuote(@Param('symbol') symbol: string) {
    try {
      const result = await this.stockService.getQuote(symbol);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get('search')
  async searchStock(@Query('q') query: string) {
    try {
      const result = await this.stockService.searchStock(query);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get('profile/:symbol')
  async getCompanyProfile(@Param('symbol') symbol: string) {
    try {
      const result = await this.stockService.getCompanyProfile(symbol);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}