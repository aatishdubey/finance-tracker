import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Radio,
  Button,
  Row,
  Col,
} from 'antd';
import { useRef } from 'react';
import type { FormInstance } from 'antd/es/form';

export const AddInvestmentForm = ({
  onSubmit,
  confirmLoading,
}: {
  onSubmit: (args: unknown) => void;
  confirmLoading: boolean;
}) => {
  const formRef = useRef<FormInstance>(null);

  const onReset = () => {
    formRef.current?.resetFields();
  };

  const handleSubmit = (values: unknown) => {
    onReset();
    onSubmit(values);
  };

  return (
    <Form ref={formRef} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please input the amount!' }]}
          >
            <InputNumber min={0} addonAfter="NPR" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="interest"
            label="Interest"
            rules={[{ required: true, message: 'Please input the interest!' }]}
          >
            <InputNumber min={0} max={100} addonAfter="%" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: 'Please input the duration!' }]}
          >
            <InputNumber min={0} addonAfter="years" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="payout"
        label="Payout"
        rules={[{ required: true, message: 'Please choose the payout!' }]}
      >
        <Radio.Group>
          <Radio value="monthly">Monthly</Radio>
          <Radio value="quarterly">Quarterly</Radio>
          <Radio value="yearly">Yearly</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: 'Please select the date!' }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={confirmLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
