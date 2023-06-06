import { Button, Col, Row, Statistic } from 'antd';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { IBudgetData, QueryKeys } from '../../api/types';
import { queryClient } from '../../api/config';
import { AddBudgetForm } from './AddBudgetForm';
import { calculateTotalThisMonth } from '../../utils/calculate';
import { ModalWrapper } from '../../components/Modal';
import { getBudgets, updateBudget } from '../../api/budgets';
import { getExpenses } from '../../api/expenses';

export function Dashboard() {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const { data: queryData } = useQuery(QueryKeys.BUDGETS, getBudgets);
  const { data: expenseData } = useQuery(QueryKeys.EXPENSES, getExpenses);

  const mutation = useMutation({
    mutationFn: updateBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BUDGETS] });
    },
  });

  const handleSubmit = (values: unknown) => {
    mutation.mutate(values as IBudgetData);
    setShowAddBudget(false);
  };

  return (
    <Row gutter={16}>
      <ModalWrapper
        title="Update Budget"
        open={showAddBudget}
        onClose={() => setShowAddBudget(false)}
        onSubmit={handleSubmit}
        formElement={AddBudgetForm}
      />
      <Col span={12}>
        <Statistic
          title="This Month's Expense (NPR)"
          value={calculateTotalThisMonth(expenseData || [])}
        />
        <Button style={{ marginTop: 16 }} type="primary">
          Add Expense
        </Button>
      </Col>
      <Col span={12}>
        {!queryData || !queryData.amount ? (
          <Statistic title="Budget not yet set" value={0} />
        ) : (
          <Statistic
            title="Monthly Expense Budget Remaining (NPR)"
            value={
              queryData?.amount - calculateTotalThisMonth(expenseData || [])
            }
            suffix={`/ ${queryData?.amount}`}
          />
        )}
        <Button
          style={{ marginTop: 16 }}
          type="primary"
          onClick={() => setShowAddBudget(true)}
        >
          Update Expense Budget
        </Button>
      </Col>
    </Row>
  );
}
