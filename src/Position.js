import React, { useState, useEffect } from "react";
import { PageHeader, Tabs, Button, Statistic, Descriptions } from "antd";
import "antd/dist/antd.css";
import { Line } from "@ant-design/charts";

const findIntersection = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  var px =
    ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
  var py =
    ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
    ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));

  // console.log(px, py)
  return { px, py };
};

const Position: React.FC = (props) => {
  // var priceAtExpiration = 29.0;
  //

  const low = props.sellOptionStrike * 0.5;
  const high = props.buyOptionStrike * 1.5;

  const valueAtExpiration = (price) => {
    return (
      (-(price > props.sellOptionStrike ? price - props.sellOptionStrike : 0) +
        (price > props.buyOptionStrike ? price - props.buyOptionStrike : 0)) *
        100 +
      (props.sellOptionPrice - props.butOptionPrice) * 100.0
    );
  };

  const makeData = () => {
    var array = [];
    for (var price = low * 100; price < high * 100; ++price) {
      let myprice = price / 100.0;

      array.push({
        price: myprice.toString(),
        value: valueAtExpiration(myprice),
      });
    }
    return array;
  };

  var yourCredit = (props.sellOptionPrice - props.butOptionPrice) * 100.0;
  var maxLossWithCredit =
    -(props.buyOptionStrike - props.sellOptionStrike) * 100.0 +
    (props.sellOptionPrice - props.butOptionPrice) * 100.0;

  var x = findIntersection(
    0,
    0,
    1000,
    0,
    props.sellOptionStrike,
    yourCredit,
    props.buyOptionStrike,
    maxLossWithCredit
  );

  var config = {
    data: makeData(),
    height: 800,
    xField: "price",
    yField: "value",
    annotations: [
      {
        type: "line",
        // start: ['min', 'median'],
        start: ["min", 0],
        end: ["max", 0],
        // end: ['max', 'median'],
        style: {
          stroke: "#F4664A",
          lineDash: [2, 2],
        },
      },
    ],
  };

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => {}}
        title="Title"
        subTitle="This is a subtitle"
      >
        <Descriptions size="medium" column={2}>
          <Descriptions.Item label="Sell Option Strike">
            {props.sellOptionStrike}
          </Descriptions.Item>
          <Descriptions.Item label="Sell Option Price">
            {props.sellOptionPrice}
          </Descriptions.Item>
          <Descriptions.Item label="Buy Option Strike">
            {props.buyOptionStrike}
          </Descriptions.Item>
          <Descriptions.Item label="But Option Price">
            {props.butOptionPrice}
          </Descriptions.Item>

          <Descriptions.Item label="Breakeven">{x.px}</Descriptions.Item>
        </Descriptions>

        <br />

        <h3>Full Dollar Values</h3>
        <br />
        <Descriptions size="medium" column={1}>
          <Descriptions.Item label="Max Loss At Expiration">
            {(props.buyOptionStrike - props.sellOptionStrike) * 100.0}
          </Descriptions.Item>
          <Descriptions.Item label="Your Credit">
            {(props.sellOptionPrice - props.butOptionPrice) * 100.0}
          </Descriptions.Item>
          <Descriptions.Item label="Max Loss With Credit">
            {-(props.buyOptionStrike - props.sellOptionStrike) * 100.0 +
              (props.sellOptionPrice - props.butOptionPrice) * 100.0}
          </Descriptions.Item>
        </Descriptions>

        {/*        <br />
        <Descriptions size="large" column={1}>
          <Descriptions.Item label="Owed">
            {priceAtExpiration > props.sellOptionStrike
              ? (priceAtExpiration - props.sellOptionStrike) * 100
              : 0}
          </Descriptions.Item>
          <Descriptions.Item label="Gained">
            {priceAtExpiration > props.buyOptionStrike
              ? (priceAtExpiration - props.buyOptionStrike) * 100
              : 0}
          </Descriptions.Item>
          <Descriptions.Item label="Net At Expiration">
            {(-(priceAtExpiration > props.sellOptionStrike
              ? priceAtExpiration - props.sellOptionStrike
              : 0) +
              (priceAtExpiration > props.buyOptionStrike
                ? priceAtExpiration - props.buyOptionStrike
                : 0)) *
              100}
          </Descriptions.Item>
          <Descriptions.Item label="Net At Expiration Including Credit">
            {valueAtExpiration(priceAtExpiration)}
          </Descriptions.Item>
        </Descriptions>*/}
        {/*
        {
          makeData().map((data, index)=>{
            return <div>{data.price} {data.value}</div>
          })
        }*/}
        <Line {...config} />
      </PageHeader>
    </>
  );
};
export default Position;
