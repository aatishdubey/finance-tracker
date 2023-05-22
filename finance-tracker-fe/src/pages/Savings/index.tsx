import { Table, Row, Col, Statistic, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useQuery } from "react-query";
import { API_BASE_URL, queryClient } from "../../api/config";
import { useIdToken } from "../../state/user";
import { useMutation } from 'react-query';
import { formatDate } from "../../utils/date";
import { AddSavingsForm } from "./AddSavingsForm";
import { ISavingsData } from "../../api/types";
import { calculateTotalThisMonth, calculateTotalThisYear } from "../../utils/calculate";
import { ModalProps } from "../../components/Modal/types";

export const Savings = () => {
  const [showAddSavings, setShowAddSavings] = useState(false);
  const token = useIdToken();
  const { isLoading, data: queryData } = useQuery<ISavingsData[]>('savings', () =>
    fetch(`${API_BASE_URL}/savings`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res =>
      res.json()
    )
  )

  const addSavings = async (data: Omit<ISavingsData, "key">) => {
    await fetch(`${API_BASE_URL}/savings`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
  };

  const mutation = useMutation({
    mutationFn: addSavings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });

  
  const columns: ColumnsType<ISavingsData> = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => <span>{formatDate(record.date)}</span>
    }
  ];

  const handleSubmit = (values: unknown) => {
    mutation.mutate(values as Omit<ISavingsData, "key">);
    setShowAddSavings(false);
  }

  return (
    <div>
      <AddSavingsModal open={showAddSavings} onClose={() => setShowAddSavings(false)} onSubmit={handleSubmit}/>
      <Row gutter={16}>
        <Col span={24}><h1>Savings</h1></Col>
        <Col span={12}>
          <Statistic title="This Year (NPR)" value={calculateTotalThisYear(queryData || [])} />
        </Col>
        <Col span={12}>
          <Statistic title="This Month (NPR)" value={calculateTotalThisMonth(queryData || [])} precision={2} />
          <Button style={{ marginTop: 16 }} type="primary" onClick={() => setShowAddSavings(true)}>
            Add Savings
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

const AddSavingsModal = ({open, onClose, onSubmit} : ModalProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = (values: unknown) => {
    setConfirmLoading(true);
    onSubmit(values);
    setConfirmLoading(false);
  };

  return (
    <Modal
        title="Add Savings"
        open={open}
        onCancel={onClose}
        okButtonProps={{ style: {display: "none"} }}
        cancelButtonProps={{ style: {display: "none"} }}
      >
        <AddSavingsForm onSubmit={handleOk} confirmLoading={confirmLoading}/>
      </Modal>
  )
}