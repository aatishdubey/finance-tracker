import { Form, Input, InputNumber, DatePicker, Button } from "antd";
import { useRef } from "react";
import type { FormInstance } from 'antd/es/form';

export const AddBudgetForm = ({
  onSubmit,
  confirmLoading,
}: {
  onSubmit: (args: unknown) => void;
  confirmLoading: boolean;
}) => {

  const formRef = useRef<FormInstance>(null);

  const onReset = () => {
    formRef.current?.resetFields();
  }

  const handleSubmit = (values: unknown) => {
    onReset();
    onSubmit(values);
  }
  
  return (
    <Form ref={formRef} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: "Please input the amount!" }]}
      >
        <InputNumber min={0} addonAfter="NPR"/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={confirmLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
