import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";
import LineChart from './LineChart';
import Loader from './Loader';


const { Title ,Text } = Typography;
const { Option } = Select;
const timeOptions = ["3h", "24h", "7d", "30d", "1y", "3y", "5y"];

const CrytoDetails = () => {
  const [timePeriod, setTimePeriod] = useState("7d");
  const { cryptoId } = useParams();
  const { data } = useGetCryptoDetailsQuery(cryptoId);
  const cryptoDetails = data?.data?.coin;
  const {data: cryptoHistory} = useGetCryptoHistoryQuery({cryptoId, timePeriod})

  if (!cryptoDetails || !cryptoHistory) return <Loader/>;
  
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title className="coin-name" level={2}>
          {cryptoDetails.name} / {cryptoDetails.symbol} Price
        </Title>
        <p>
          View value statistics, market cap and supply for {cryptoDetails.name}
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Selet a Time Period"
        onChange={(input) => setTimePeriod(input)}
        bordered={false}
      >
        {timeOptions.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
      <LineChart cryptoHistory={cryptoHistory} currentPrice={cryptoDetails.price} cryptoName={cryptoDetails.name}/>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={2} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>Overview of {cryptoDetails.name} Statistics</p>
          </Col>
          {stats.map(({ title, value, icon }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Col className="coin-stats-value">{value}</Col>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={2} className="coin-details-heading">
              {cryptoDetails.name} Other Statistics
            </Title>
            <p>Overview of {cryptoDetails.name} Other Statistics</p>
          </Col>
          {genericStats.map(({ title, value, icon }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Col className="coin-stats-value">{value}</Col>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title className="coin-details-heading" level={3}>
            Descriptions of {cryptoDetails.name}
            <p>
              <br />
              <a href={cryptoDetails.websiteUrl}>
                {cryptoDetails.name} Website
              </a>
            </p>
            <Text>{HTMLReactParser(cryptoDetails.description)}</Text>
          </Title>
        </Row>
        <Col className='coin-links'>
            <Title className='coin-details-heading' level={3}>
                {cryptoDetails.name} Additional Resources
            </Title>
            {cryptoDetails.links.map(link =>
                <Row className='coin-link' key={link.name}> 
                <Title level={5} className='link-name'>{link.type}</Title>
                    <a href={link.url} target='_blank' rel='noreferred'>{link.name}</a>
                </Row>
                )}
        </Col>
      </Col>
    </Col>
  );
};

export default CrytoDetails;
