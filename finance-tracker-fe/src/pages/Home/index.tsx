import { Button, Col, Row, Statistic, Modal } from 'antd';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { IBudgetData, IExpenseEarningData } from '../../api/types';
import { API_BASE_URL, queryClient } from '../../api/config';
import { AddBudgetForm } from './AddBudgetForm';
import { useIdToken } from '../../state/user';
import { calculateTotalThisMonth } from '../../utils/calculate';
import { ModalProps } from '../../components/Modal/types';

export function Dashboard() {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const token = useIdToken();
  const { isLoading, data: queryData } = useQuery<IBudgetData>('budgets', () =>
    fetch(`${API_BASE_URL}/budgets`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res =>
      res.json()
    )
  )

  const { data: expenseData } = useQuery<IExpenseEarningData[]>('expenses', () =>
    fetch(`${API_BASE_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res =>
      res.json()
    )
  )

  const updateBudget = async (data: IBudgetData) => {
    await fetch(`${API_BASE_URL}/budgets`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
  };

  const mutation = useMutation({
    mutationFn: updateBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  const handleSubmit = (values: unknown) => {
    mutation.mutate(values as IBudgetData);
    setShowAddBudget(false);
  }

  return (
    <Row gutter={16}>
      <AddBudgetModal open={showAddBudget} onClose={() => setShowAddBudget(false)} onSubmit={handleSubmit}/>
      <Col span={12}>
        <Statistic title="This Month's Expense (NPR)" value={calculateTotalThisMonth(expenseData || [])} />
        <Button style={{ marginTop: 16 }} type="primary">
          Add Expense
        </Button>
      </Col>
      <Col span={12}>
        {!queryData || !queryData.amount ? (
          <Statistic title="Budget not yet set" value={0}  />  
        ): (
          <Statistic title="Monthly Expense Budget Remaining (NPR)" value={queryData?.amount - calculateTotalThisMonth(expenseData || [])} suffix={`/ ${queryData?.amount}`}  />
        )}
        <Button style={{ marginTop: 16 }} type="primary" onClick={() => setShowAddBudget(true)}>
          Update Expense Budget
        </Button>
      </Col>
    </Row>
  );
}

const AddBudgetModal = ({open, onClose, onSubmit} : ModalProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = (values: unknown) => {
    setConfirmLoading(true);
    onSubmit(values);
    setConfirmLoading(false);
  };

  return (
    <Modal
        title="Update Budget"
        open={open}
        onCancel={onClose}
        okButtonProps={{ style: {display: "none"} }}
        cancelButtonProps={{ style: {display: "none"} }}
      >
        <AddBudgetForm onSubmit={handleOk} confirmLoading={confirmLoading}/>
      </Modal>
  )
}