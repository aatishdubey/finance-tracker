import { Table, Row, Col, Statistic, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { queryClient } from '../../api/config';
import { useMutation } from 'react-query';
import { AddInvestmentForm } from './AddInvestmentForm';
import { IInvestmentData, QueryKeys } from '../../api/types';
import { calculateTotal } from '../../utils/calculate';
import { calculateTotalThisMonth } from '../../utils/calculate';
import { addInvestment, getInvestments } from '../../api/investments';
import { ModalWrapper } from '../../components/Modal';
import { PageHeading } from '../../components/Blocks/PageHeading';
import { formatTableData, generateColumns } from '../../utils/format';

export const Investments = () => {
  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const { data: queryData } = useQuery(QueryKeys.INVESTMENTS, getInvestments);

  const mutation = useMutation({
    mutationFn: addInvestment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.INVESTMENTS] });
    },
  });

  const handleSubmit = (values: unknown) => {
    mutation.mutate(values as IInvestmentData);
    setShowAddInvestment(false);
  };

  const columns: ColumnsType<IInvestmentData> = generateColumns([
    'name',
    'amount',
    'interest rate',
    'duration',
    'payout',
    'date',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ]).map((column: Record<string, any>) => {
    switch (column.title) {
      case 'amount':
        return {
          ...column,
          render: (_, record) => <span>NPR {record.amount}</span>,
        };
      case 'interest rate':
        return {
          ...column,
          render: (_, record) => <span>{record.interest}%</span>,
        };
      case 'duration':
        return {
          ...column,
          render: (_, record) => <span>{record.duration} years</span>,
        };
      default:
        return column;
    }
  });

  return (
    <div>
      <ModalWrapper
        title="Add Investment"
        open={showAddInvestment}
        onClose={() => setShowAddInvestment(false)}
        onSubmit={handleSubmit}
        formElement={AddInvestmentForm}
      />
      <Row gutter={16}>
        <PageHeading>Investments</PageHeading>
        <Col span={12}>
          <Statistic
            title="Total (NPR)"
            value={calculateTotal(queryData || [])}
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
            onClick={() => setShowAddInvestment(true)}
          >
            Add Investments
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
