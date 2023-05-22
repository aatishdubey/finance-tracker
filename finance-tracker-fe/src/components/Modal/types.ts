export interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: unknown) => void;
}