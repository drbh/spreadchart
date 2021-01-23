import React, { useEffect } from "react";
// import DemoDualAxes from "./Chart.js";
import Position from "./Position.js";
import { Input, Tooltip, Card, Row, Col } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

import { Form, InputNumber, Button } from "antd";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.sellOptionStrike = null; // 5000;
    this.sellOptionPrice = null; // 21.18;
    this.buyOptionStrike = null; // 1.85;
    this.butOptionPrice = null; // 20;
  }

  onFinish = (values) => {
    this.sellOptionStrike = values.st;
    this.sellOptionPrice = values.op;
    this.buyOptionStrike = values.bl;
    this.butOptionPrice = values.cp;

    if (
      this.sellOptionStrike &&
      this.sellOptionPrice &&
      this.buyOptionStrike &&
      this.butOptionPrice
    ) {
      this.forceUpdate();
    }
  };

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <Card>
              <Form
                {...layout}
                initialValues={{
                  st: 20.1,
                  op: 1.4,
                  bl: 21.1,
                  cp: 1.3,
                }}
                name="nest-messages"
                onFinish={this.onFinish}
              >
                <Form.Item name="st" label="Sell Option Strike">
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    // prefix="$"
                    // suffix="USD"
                  />
                </Form.Item>
                <Form.Item name="op" label="Sell Option Price">
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    // prefix="$"
                    // suffix="USD"
                  />
                </Form.Item>

                <Form.Item name="bl" label="Buy Option Strike">
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    // prefix="$"
                    // suffix="USD"
                  />
                </Form.Item>
                <Form.Item name="cp" label="Buy Option Price">
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    //p refix="$"
                    //. suffix="USD"
                  />
                </Form.Item>

                {/*
                <Form.Item name="minx" label="Min x">
                  <InputNumber prefix="$" suffix="USD" />
                </Form.Item>
                <Form.Item name="maxx" label="Max x">
                  <InputNumber prefix="$" suffix="USD" />
                </Form.Item>
*/}
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <br />
            <Card>
              {this.sellOptionStrike &&
                this.sellOptionPrice &&
                this.buyOptionStrike &&
                this.butOptionPrice && (
                  <Position
                    sellOptionStrike={this.sellOptionStrike}
                    sellOptionPrice={this.sellOptionPrice}
                    buyOptionStrike={this.buyOptionStrike}
                    butOptionPrice={this.butOptionPrice}
                  />
                )}
              {/*            {
              this.balance && this.currentPrice && this.optPrice && this.strikePrice &&
              <DemoDualAxes
                balance={this.balance}
                currentPrice={this.currentPrice}
                strike={this.strikePrice}
                costOfOption={this.optPrice}
              />
            }*/}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
