import { Table, Row, Col, Statistic, Button } from 'antd';
import { useState } from 'react';
import { AddEarningsForm } from './AddEarningsForm';
import { useQuery } from 'react-query';
import { queryClient } from '../../api/config';
import { useMutation } from 'react-query';
import { IExpenseEarningData, QueryKeys } from '../../api/types';
import {
  calculateTotalThisMonth,
  calculateTotalThisYear,
} from '../../utils/calculate';
import { addEarnings, getEarnings } from '../../api/earnings';
import { ModalWrapper } from '../../components/Modal';
import { PageHeading } from '../../components/Blocks/PageHeading';
import { formatTableData, generateColumns } from '../../utils/format';

export const Earnings = () => {
  const [showAddEarnings, setShowAddEarnings] = useState(false);
  const { data: queryData } = useQuery(QueryKeys.EARNINGS, getEarnings);

  const mutation = useMutation({
    mutationFn: addEarnings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EARNINGS] });
    },
  });

  const handleSubmit = (values: unknown) => {
    mutation.mutate(values as Omit<IExpenseEarningData, 'key'>);
    setShowAddEarnings(false);
  };

  const columns = generateColumns(['name', 'amount', 'remarks', 'date']);

  return (
    <div>
      <ModalWrapper
        title="Add Earnings"
        open={showAddEarnings}
        onClose={() => setShowAddEarnings(false)}
        onSubmit={handleSubmit}
        formElement={AddEarningsForm}
      />
      <Row gutter={16}>
        <PageHeading>Earnings</PageHeading>
        <Col span={12}>
          <Statistic
            title="This Year (NPR)"
            value={calculateTotalThisYear(queryData || [])}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="This Month (NPR)"
            value={calculateTotalThisMonth(queryData || [])}
            precision={2}
          />
          <Button
            style={{ marginTop: 16 }}
            type="primary"
            onClick={() => setShowAddEarnings(true)}
          >
            Add Earnings
          </Button>
        </Col>
      </Row>
      <Row>
        <PageHeading>History</PageHeading>
        <Col span={24}>
          <Table columns={columns} dataSource={formatTableData(queryData)} />
        </Col>
      </Row>
    </div>
  );
};
