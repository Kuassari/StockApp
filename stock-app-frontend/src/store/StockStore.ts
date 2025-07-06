import { makeAutoObservable } from 'mobx';
import axios from 'axios';

export interface Stock {
  _id?: string;
  symbol: string;
  companyName: string;
  userId: string;
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  volume: number;
  avgVolume: number;
  exchange: string;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: string;
  sharesOutstanding: number;
  timestamp: number;
}

class StockStore {
  portfolio: Stock[] = [];
  loading = false;
  selectedStock: StockQuote | null = null;
  searchResults: any[] = [];
  userId = 'user123'; 

  constructor() {
    makeAutoObservable(this);
  }

  async loadPortfolio() {
    this.loading = true;
    try {
      const response = await axios.get(`http://localhost:3001/portfolio/${this.userId}`);
      if ((response.data as any).success) {
        this.portfolio = (response.data as any).data; 
      }
    } catch (error) {
      console.error('Failed to load portfolio:', error);
    } finally {
      this.loading = false;
    }
  }

  async addStock(symbol: string, companyName: string) {
    try {
      const response = await axios.post('http://localhost:3001/portfolio/add', {
        symbol: symbol.toUpperCase(),
        companyName,
        userId: this.userId,
      });
      if ((response.data as any).success) {
        await this.loadPortfolio();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to add stock:', error);
      return false;
    }
  }

  async removeStock(symbol: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3001/portfolio/remove/${this.userId}/${symbol.toUpperCase()}`
      );
      if ((response.data as any).success) {
        await this.loadPortfolio();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to remove stock:', error);
      return false;
    }
  }

  async getStockQuote(symbol: string) {
    this.loading = true;
    try {
      const response = await axios.get(`http://localhost:3001/stock/quote/${symbol}`);
      if ((response.data as any).success) {
        this.selectedStock = (response.data as any).data;
        return (response.data as any).data;
      }
      return null;
    } catch (error) {
      console.error('Failed to get stock quote:', error);
      return null;
    } finally {
      this.loading = false;
    }
  }

  async searchStocks(query: string) {
    if (!query.trim()) {
      this.searchResults = [];
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:3001/stock/search?q=${query}`);
      if ((response.data as any).success) {
        this.searchResults = (response.data as any).data.slice(0, 10);
      }
    } catch (error) {
      console.error('Failed to search stocks:', error);
      this.searchResults = [];
    }
  }

  clearSearch() {
    this.searchResults = [];
  }
}

export const stockStore = new StockStore();