import { PaginationProps as OriginalPaginationProps } from '@mantine/core';

export interface ICategory {
  slug: string;
  name: string;
  images: { dark: string; light: string };
}

export interface ICategoriesGroup {
  name: string;
  categories: ICategory[];
}

export interface ICanvasAttributes {
  responsive?: boolean;
  withColor?: boolean;
  dimmed?: boolean;
  author: string;
  canvas: { center: boolean; maxWidth?: number };
  category: string;
  dependencies: string[];
  title: string;
  props?: Record<string, any>;
}

export interface IUiComponent {
  component: string;
  slug: string;
  code: string;
  attributes: ICanvasAttributes;
}
export interface ILocation {
  location_id: number;
  name: string;
  address: string;
  coordinate: string;
  activated: boolean;
  created_at: string;
  updated_at: string;
}

export interface IPageResponse {
  totalData: number;
  currentPage: number;
  currentPageSize: number;
  totalPage: number;
  previousPage: number;
  nextPage: number;
}

export interface IRole {
  id: number;
  name: string;
  display_name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface IUserData {
  user_id: string;
  name: string;
  email: string;
  nik: string | null;
  nrp: string | null;
  activated: boolean;
  sync_status: string;
  phone_mobile: string;
  created_by: string;
  location_id: number;
  created_at: string;
  updated_at: string;
  issued_at: string | null;
  location: ILocation;
  role: IRole;
}

export interface IPaginationProps extends Omit<OriginalPaginationProps, 'total'> {
  total?: OriginalPaginationProps['total'];
}
