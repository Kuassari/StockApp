import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Typography,
  Spin,
  Tag,
  Divider,
  Space,
} from 'antd';
import { ArrowLeftOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { stockStore } from '../store/StockStore';

const { Title, Text } = Typography;

const StockDetails: React.FC = observer(() => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (symbol) {
      stockStore.getStockQuote(symbol);
    }
  }, [symbol]);

  if (stockStore.loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!stockStore.selectedStock) {
    return (
      <Card>
        <Text>Stock data not available</Text>
        <Button onClick={() => navigate('/portfolio')}>Back to Portfolio</Button>
      </Card>
    );
  }

  const stock = stockStore.selectedStock;
  const isPositive = stock.changesPercentage >= 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return formatCurrency(value);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/portfolio')}
        style={{ marginBottom: 16 }}
      >
        Back to Portfolio
      </Button>

      <Card>
        <div style={{ marginBottom: 24 }}>
          <Space align="center">
            <Title level={2} style={{ margin: 0 }}>
              {stock.symbol}
            </Title>
            <Tag color={stock.exchange === 'NASDAQ' ? 'blue' : 'green'}>
              {stock.exchange}
            </Tag>
          </Space>
          <Text type="secondary" style={{ fontSize: 16 }}>
            {stock.name}
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={8}>
            <Card size="small" style={{ background: isPositive ? '#f6ffed' : '#fff2f0' }}>
              <Statistic
                title="Current Price"
                value={stock.price}
                precision={2}
                prefix="$"
                valueStyle={{ fontSize: 28, fontWeight: 'bold' }}
              />
              <div style={{ marginTop: 8 }}>
                <Tag
                  color={isPositive ? 'green' : 'red'}
                  icon={isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                >
                  {isPositive ? '+' : ''}{stock.changesPercentage.toFixed(2)}%
                </Tag>
                <Text style={{ marginLeft: 8, color: isPositive ? '#52c41a' : '#ff4d4f' }}>
                  {isPositive ? '+' : ''}{formatCurrency(stock.change)}
                </Text>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card size="small">
              <Statistic
                title="Market Cap"
                value={formatMarketCap(stock.marketCap)}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Card size="small">
              <Statistic
                title="Volume"
                value={formatNumber(stock.volume)}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Statistic
              title="Open"
              value={stock.open}
              precision={2}
              prefix="$"
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="Previous Close"
              value={stock.previousClose}
              precision={2}
              prefix="$"
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="Day Low"
              value={stock.dayLow}
              precision={2}
              prefix="$"
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="Day High"
              value={stock.dayHigh}
              precision={2}
              prefix="$"
            />
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Statistic
              title="52W Low"
              value={stock.yearLow}
              precision={2}
              prefix="$"
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="52W High"
              value={stock.yearHigh}
              precision={2}
              prefix="$"
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="50D MA"
              value={stock.priceAvg50}
              precision={2}
              prefix="$"
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="200D MA"
              value={stock.priceAvg200}
              precision={2}
              prefix="$"
            />
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Statistic
              title="P/E Ratio"
              value={stock.pe}
              precision={2}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="EPS"
              value={stock.eps}
              precision={2}
              prefix="$"
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="Avg Volume"
              value={formatNumber(stock.avgVolume)}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="Shares Outstanding"
              value={formatNumber(stock.sharesOutstanding)}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
});

export default StockDetails;