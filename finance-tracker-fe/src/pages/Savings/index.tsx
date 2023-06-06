import { Table, Row, Col, Statistic, Button } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { queryClient } from '../../api/config';
import { useMutation } from 'react-query';
import { AddSavingsForm } from './AddSavingsForm';
import { ISavingsData, QueryKeys } from '../../api/types';
import {
  calculateTotalThisMonth,
  calculateTotalThisYear,
} from '../../utils/calculate';
import { ModalWrapper } from '../../components/Modal';
import { addSavings, getSavings } from '../../api/savings';
import { PageHeading } from '../../components/Blocks/PageHeading';
import { formatTableData, generateColumns } from '../../utils/format';

export const Savings = () => {
  const [showAddSavings, setShowAddSavings] = useState(false);
  const { data: queryData } = useQuery(QueryKeys.SAVINGS, getSavings);

  const mutation = useMutation({
    mutationFn: addSavings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SAVINGS] });
    },
  });

  const columns = generateColumns(['amount', 'remarks', 'date']);

  const handleSubmit = (values: unknown) => {
    mutation.mutate(values as Omit<ISavingsData, 'key'>);
    setShowAddSavings(false);
  };

  return (
    <div>
      <ModalWrapper
        title="Add Savings"
        open={showAddSavings}
        onClose={() => setShowAddSavings(false)}
        onSubmit={handleSubmit}
        formElement={AddSavingsForm}
      />
      <Row gutter={16}>
        <PageHeading>Savings</PageHeading>
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
            onClick={() => setShowAddSavings(true)}
          >
            Add Savings
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
