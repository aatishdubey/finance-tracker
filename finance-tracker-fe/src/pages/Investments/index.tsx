import { Space, Table, Row, Col, Statistic, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useQuery } from "react-query";
import { API_BASE_URL, queryClient } from "../../api/config";
import { useIdToken } from "../../state/user";
import { useMutation } from 'react-query';
import { formatDate } from "../../utils/date";
import { AddInvestmentForm } from "./AddInvestmentForm";
import { IExpenseEarningData, IInvestmentData } from "../../api/types";
import { calculateTotal } from "../../utils/calculate";
import { ModalProps } from "../../components/Modal/types";
import { calculateTotalThisMonth } from "../../utils/calculate";



export const Investments = () => {
  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const token = useIdToken();
  const { data: queryData } = useQuery<IExpenseEarningData[]>('investments', () =>
    fetch(`${API_BASE_URL}/investments`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res =>
      res.json()
    )
  )

  const addInvestment = async (data: IInvestmentData) => {
    await fetch(`${API_BASE_URL}/investments`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
  };

  const mutation = useMutation({
    mutationFn: addInvestment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
    },
  });

  const columns: ColumnsType<IInvestmentData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (record) => <span>NPR {record}</span>
    },
    {
      title: "Interest Rate",
      dataIndex: "interest",
      key: "interest",
      render: (record) => <span>{record}%</span>
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (record) => <span>{record} years</span>
    },
    {
      title: "Payout",
      dataIndex: "payout",
      key: "payout",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => <span>{formatDate(record.date)}</span>
    }
  ];

  const handleSubmit = (values: unknown) => {
    mutation.mutate(values as IInvestmentData);
    setShowAddInvestment(false);
  }

  return (
    <div>
      <AddInvestmentModal open={showAddInvestment} onClose={() => setShowAddInvestment(false)} onSubmit={handleSubmit}/>
      <Row gutter={16}>
        <Col span={24}><h1>Investments</h1></Col>
        <Col span={12}>
          <Statistic title="Total (NPR)" value={calculateTotal(queryData || [])} />
        </Col>
        <Col span={12}>
          <Statistic title="This Month (NPR)" value={calculateTotalThisMonth(queryData || [])} precision={2} />
          <Button style={{ marginTop: 16 }} type="primary" onClick={() => setShowAddInvestment(true)}>
            Add Investments
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}><h1>History</h1></Col>
        <Col span={24}>
          <Table columns={columns} dataSource={(queryData || []).map((item, index:number) => ({...item, key: index}))} />
        </Col>
      </Row>
    </div>
  );
};


const AddInvestmentModal = ({open, onClose, onSubmit} : ModalProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = (values: unknown) => {
    setConfirmLoading(true);
    onSubmit(values);
    setConfirmLoading(false);
  };

  return (
    <Modal
        title="Add Investment"
        open={open}
        onCancel={onClose}
        okButtonProps={{ style: {display: "none"} }}
        cancelButtonProps={{ style: {display: "none"} }}
      >
        <AddInvestmentForm onSubmit={handleOk} confirmLoading={confirmLoading}/>
      </Modal>
  )
}