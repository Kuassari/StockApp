import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StockService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://financialmodelingprep.com/api/v3';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('FMP_API_KEY') || 'YDsO4BTtznqwWUPMn1Hkma6f5qa3AIFv';
  }

  async getQuote(symbol: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/quote/${symbol}?apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data[0];
    } catch (error) {
      throw new Error(`Failed to fetch quote for ${symbol}: ${error.message}`);
    }
  }

  async searchStock(query: string): Promise<any[]> {
    try {
      const url = `${this.baseUrl}/search?query=${query}&limit=10&apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search stocks: ${error.message}`);
    }
  }

  async getCompanyProfile(symbol: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/profile/${symbol}?apikey=${this.apiKey}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data[0];
    } catch (error) {
      throw new Error(`Failed to fetch company profile for ${symbol}: ${error.message}`);
    }
  }
}