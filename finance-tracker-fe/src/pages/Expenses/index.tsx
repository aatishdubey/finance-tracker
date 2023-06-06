import { Table, Row, Col, Statistic, Button } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { queryClient } from '../../api/config';
import { useMutation } from 'react-query';
import { AddExpensesForm } from './AddExpensesForm';
import { IExpenseEarningData, QueryKeys } from '../../api/types';
import {
  calculateTotalThisMonth,
  calculateTotalThisYear,
} from '../../utils/calculate';
import { addExpenses, getExpenses } from '../../api/expenses';
import { ModalWrapper } from '../../components/Modal';
import { PageHeading } from '../../components/Blocks/PageHeading';
import { formatTableData, generateColumns } from '../../utils/format';

export const Expenses = () => {
  const [showAddExpenses, setShowAddExpenses] = useState(false);
  const { data: queryData } = useQuery(QueryKeys.EXPENSES, getExpenses);

  const mutation = useMutation({
    mutationFn: addExpenses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EXPENSES] });
    },
  });

  const handleSubmit = (values: unknown) => {
    mutation.mutate(values as Omit<IExpenseEarningData, 'key'>);
    setShowAddExpenses(false);
  };

  const columns = generateColumns(['name', 'amount', 'remarks', 'date']);

  return (
    <div>
      <ModalWrapper
        title="Add Expenses"
        open={showAddExpenses}
        onClose={() => setShowAddExpenses(false)}
        onSubmit={handleSubmit}
        formElement={AddExpensesForm}
      />
      <Row gutter={16}>
        <PageHeading>Expenses</PageHeading>
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
            onClick={() => setShowAddExpenses(true)}
          >
            Add Expenses
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
