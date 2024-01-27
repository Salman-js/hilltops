import React from 'react';
import { tileHomeProps } from './tile.home';
import { Col, Row } from 'antd';
import { Column, Line } from '@ant-design/plots';
import { lineConfig, barConfig } from './data';

const AnalyticsHome: React.FC<tileHomeProps> = ({ vendors, items }) => {
  return (
    <div className='home-analytics-container'>
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24} className='analytics-tile'>
          <p className='analytics-title'>Yearly Analytics</p>
          <div className='analytics-graph-container'>
            <Line {...lineConfig} />
          </div>
        </Col>
        <Col lg={12} xs={24} className='analytics-tile'>
          <p className='analytics-title'>This Year</p>
          <div className='analytics-graph-container'>
            <Column {...barConfig} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default AnalyticsHome;
