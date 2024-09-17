import { UseFormReturnType } from '@mantine/form';
import { useRouter } from 'next/navigation';

export interface IProduct {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
}

export interface IProductsProps {
  rows: IProduct[];
  totalData: number;
}

export interface IProductColumn {
  setIsUpdate: (arg0: boolean) => void;
  form: UseFormReturnType<IProduct>;
  open: () => void;
  openedPopover: boolean;
  setPopover: { open: () => void; close: () => void };
  activePopover: string | null;
  setActivePopover: (arg0: string | null) => void;
  router: ReturnType<typeof useRouter>;
}

export interface IOpenModalProps {
  form: UseFormReturnType<IProduct>;
  opened: boolean;
  isUpdate: boolean;
  close: () => void;
}

export interface IUseProductsDataProps {
  initialRows: IProduct[];
  initialTotalData: number;
}

export interface IResponseComponent {
  closeModal: () => void;
}
