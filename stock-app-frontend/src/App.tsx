import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { observer } from 'mobx-react-lite';
import Portfolio from './components/Portfolio';
import StockDetails from './components/StockDetails';
import Navigation from './components/Navigation';
import './App.css';

const { Content } = Layout;

const App: React.FC = observer(() => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Navigation />
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/portfolio" replace />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/stock/:symbol" element={<StockDetails />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
});

export default App;