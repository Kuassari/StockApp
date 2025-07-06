import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio, PortfolioDocument } from './portfolio.schema';
import { AddStockDto, RemoveStockDto } from './portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name) private portfolioModel: Model<PortfolioDocument>,
  ) {}

  async addStock(addStockDto: AddStockDto): Promise<Portfolio> {
    const existingStock = await this.portfolioModel.findOne({
      userId: addStockDto.userId,
      symbol: addStockDto.symbol,
    });

    if (existingStock) {
      throw new Error('Stock already exists in portfolio');
    }

    const createdStock = new this.portfolioModel(addStockDto);
    return createdStock.save();
  }

  async removeStock(removeStockDto: RemoveStockDto): Promise<any> {
    return this.portfolioModel.deleteOne({
      userId: removeStockDto.userId,
      symbol: removeStockDto.symbol,
    });
  }

  async getPortfolio(userId: string): Promise<Portfolio[]> {
    return this.portfolioModel.find({ userId }).exec();
  }

  async getStock(userId: string, symbol: string): Promise<Portfolio | null> {
    return this.portfolioModel.findOne({ userId, symbol }).exec();
  }
}