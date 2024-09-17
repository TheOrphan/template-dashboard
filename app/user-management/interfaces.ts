import { UseFormReturnType } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { IUser } from '@/lib/auth/interfaces';

export interface IUsersProps {
  rows: IUser[];
  totalData: number;
}

export interface IUserColumn {
  setIsUpdate: (arg0: boolean) => void;
  form: UseFormReturnType<IUser>;
  open: () => void;
  openedPopover: boolean;
  setPopover: { open: () => void; close: () => void };
  activePopover: string | null;
  setActivePopover: (arg0: string | null) => void;
  router: ReturnType<typeof useRouter>;
}

export interface IOpenModalProps {
  form: UseFormReturnType<IUser>;
  opened: boolean;
  isUpdate: boolean;
  close: () => void;
}

export interface IResponseComponent {
  closeModal: () => void;
}
