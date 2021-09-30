import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from './Loader'

const Cryptocurrencies = ({ simplified }) => {
  const nCrytos = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(nCrytos);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredCryptos = cryptosList?.data.coins.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredCryptos);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader/>;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search for Cryptocurrencies"
            onChange={(event) => setSearchTerm(event.target.value)}
          ></Input>
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-dash-container">
        {cryptos?.map((crypto) => (
          <Col
            xs={24}
            sm={10}
            lg={8}
            className="crypto-card"
            key={crypto.id}
          >
            <Link to={`/crypto/${crypto.id}`}>
              <Card
                title={`#${crypto.rank}. ${crypto.name}/${crypto.symbol}`}
                extra={<img className="crypto-image" src={crypto.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(crypto.price)}</p>
                <p>Marker Cap: {millify(crypto.marketCap)}</p>
                <p>Price Change: {millify(crypto.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
