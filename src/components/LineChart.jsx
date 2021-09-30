import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ cryptoHistory, currentPrice, cryptoName }) => {
  
  const cryptoPrice = [];
  const cryptoTimestamp = [];
  let history = cryptoHistory?.data?.history;

  for (let i = 0; i < history.length; i++) {
    cryptoPrice.push(+history[i].price);
    cryptoTimestamp.push(new Date(history[i].timestamp).toDateString());
  }

  history = {
      labels: cryptoTimestamp,
      datasets: [
          {
              label: 'Price (USD)',
              data: cryptoPrice,
              fill: false,
              backgroundColor: '#0071bd',
              borderColor: '#0071bd'
          }
      ]
  }
  const options = {
      scales: {
          yAxes: [
              {
                  ticks: {
                      beginAtZero: true
                  }
              }
          ]
      }
  }
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {cryptoName} History Price Chart
        </Title>
        <Col className="price-container">
          <Title className="price-change" level={5}>
            {cryptoName} Price Change: {cryptoHistory?.data?.change}%
          </Title>
          <Title className="current-price" level={5}>
            Current {cryptoName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={history} options={options}></Line>
    </>
  );
};

export default LineChart;
