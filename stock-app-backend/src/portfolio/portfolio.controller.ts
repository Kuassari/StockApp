import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { AddStockDto, RemoveStockDto } from './portfolio.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('add')
  async addStock(@Body() addStockDto: AddStockDto) {
    try {
      const result = await this.portfolioService.addStock(addStockDto);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  
  @Delete('remove')
  async removeStock(@Body() removeStockDto: RemoveStockDto) {
    try {
      // We're using RemoveStockDto here - it validates the request body
      const result = await this.portfolioService.removeStock(removeStockDto);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get(':userId')
  async getPortfolio(@Param('userId') userId: string) {
    try {
      const result = await this.portfolioService.getPortfolio(userId);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get(':userId/:symbol')
  async getStock(@Param('userId') userId: string, @Param('symbol') symbol: string) {
    try {
      const result = await this.portfolioService.getStock(userId, symbol);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}