import { ReactNode } from 'react';

export interface ICustomAction {
  component: JSX.Element;
}

export interface IContentComponentProps {
  children: ReactNode;
  title: string;
  breadcrumbs?: { title: string; href: string }[];
  withBackBtn?: boolean;
  handleBackBtn?: () => void;
  customActions?: ICustomAction[] | null;
  isLoadingBackBtn?: boolean;
}
