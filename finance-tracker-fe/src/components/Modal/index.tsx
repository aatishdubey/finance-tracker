import { Modal } from 'antd';
import { useState } from 'react';

export interface ModalProps {
  title: string;
  formElement: React.FC<{
    onSubmit: (values: unknown) => void;
    confirmLoading: boolean;
  }>;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: unknown) => void;
}

export const ModalWrapper = ({
  title,
  open,
  onClose,
  onSubmit,
  formElement: FormElement,
}: ModalProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = (values: unknown) => {
    setConfirmLoading(true);
    onSubmit(values);
    setConfirmLoading(false);
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      okButtonProps={{ style: { display: 'none' } }}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <FormElement onSubmit={handleOk} confirmLoading={confirmLoading} />
    </Modal>
  );
};
