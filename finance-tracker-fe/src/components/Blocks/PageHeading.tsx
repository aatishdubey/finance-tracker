import { Col } from 'antd';

type Props = {
  children: React.ReactNode;
};

export const PageHeading = ({ children }: Props) => {
  return (
    <Col span={24}>
      <h1>{children}</h1>
    </Col>
  );
};
