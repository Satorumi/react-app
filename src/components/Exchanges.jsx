import React from "react";
import { Row, Col, Typography, Avatar, Collapse } from "antd";
import { useGetExchangesQuery } from "../services/cryptoApi";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import Loader from "./Loader";
import { StopOutlined, CheckOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Panel } = Collapse;
const demoDesc = ({ exchange }) => (
  <>
    <a href={exchange.websiteUrl} target="_blank" rel="noreferred">
      About {exchange.name} 
    </a>
  </>
);

const getDescription = ({ exchange }) => {
  if (exchange.description) {
    return HTMLReactParser(exchange.description);
  } else {
    return demoDesc({ exchange });
  }
};
const exchangeFields = ['Exchanges', '24h Trade Volume', 'Markets', 'Market Share']
const Exchanges = () => {
  const { data: exchanges, isFetching } = useGetExchangesQuery();
  if (isFetching) return <Loader />;
  console.log(exchanges);

  return (
    <>
      <Row>
        {exchangeFields.map(field =>
            <Col span={6}>
            <Title level={4}>{field}</Title>
            </Col>
            )}
      </Row>

      <Row>
        {exchanges?.data?.exchanges.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text>
                        <strong>#{exchange.rank}.</strong>{" "}
                        {<Avatar className='exchange-iamge' src={exchange.iconUrl} size="small" />}{" "}
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>{millify(exchange.volume)}</Col>

                    <Col span={6}>{millify(exchange.numberOfMarkets)}%</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                }
              >
                {getDescription({ exchange })}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
