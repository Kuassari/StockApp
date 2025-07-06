import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Card,
  List,
  Button,
  Modal,
  Input,
  AutoComplete,
  message,
  Typography,
  Space,
  Spin,
  Empty,
} from 'antd';
import { PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { stockStore } from '../store/StockStore';

const { Title } = Typography;
const { Search } = Input;

const Portfolio: React.FC = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    stockStore.loadPortfolio();
  }, []);

  const handleAddStock = async () => {
    if (!selectedStock) {
      message.error('Please select a stock');
      return;
    }

    const success = await stockStore.addStock(selectedStock.symbol, selectedStock.name);
    if (success) {
      message.success('Stock added to portfolio');
      setIsModalVisible(false);
      setSearchValue('');
      setSelectedStock(null);
      stockStore.clearSearch();
    } else {
      message.error('Failed to add stock or stock already exists');
    }
  };

  const handleRemoveStock = async (symbol: string) => {
    const success = await stockStore.removeStock(symbol);
    if (success) {
      message.success('Stock removed from portfolio');
    } else {
      message.error('Failed to remove stock');
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value.length > 2) {
      stockStore.searchStocks(value);
    } else {
      stockStore.clearSearch();
    }
  };

  const handleSelect = (value: string, option: any) => {
    setSelectedStock(option);
    setSearchValue(value);
  };

  const options = stockStore.searchResults.map((stock) => ({
    value: stock.symbol,
    label: `${stock.symbol} - ${stock.name}`,
    symbol: stock.symbol,
    name: stock.name,
  }));

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0 }}>My Portfolio</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Stock
          </Button>
        </div>

        {stockStore.loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <Spin size="large" />
          </div>
        ) : stockStore.portfolio.length === 0 ? (
          <Empty
            description="No stocks in your portfolio yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
            dataSource={stockStore.portfolio}
            renderItem={(stock) => (
              <List.Item>
                <Card
                  size="small"
                  actions={[
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`/stock/${stock.symbol}`)}
                    >
                      View
                    </Button>,
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveStock(stock.symbol)}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={stock.symbol}
                    description={stock.companyName}
                  />
                </Card>
              </List.Item>
            )}
          />
        )}
      </Card>

      <Modal
        title="Add Stock to Portfolio"
        open={isModalVisible}
        onOk={handleAddStock}
        onCancel={() => {
          setIsModalVisible(false);
          setSearchValue('');
          setSelectedStock(null);
          stockStore.clearSearch();
        }}
        okText="Add Stock"
        cancelText="Cancel"
        okButtonProps={{ disabled: !selectedStock }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <AutoComplete
            style={{ width: '100%' }}
            options={options}
            onSearch={handleSearch}
            onSelect={handleSelect}
            value={searchValue}
            placeholder="Search for stocks (e.g., AAPL, MSFT, GOOGL)"
          />
          {selectedStock && (
            <Card size="small">
              <Card.Meta
                title={selectedStock.symbol}
                description={selectedStock.name}
              />
            </Card>
          )}
        </Space>
      </Modal>
    </div>
  );
});

export default Portfolio;