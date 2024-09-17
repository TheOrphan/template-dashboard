interface IExtraBtn {
  label: string;
  type: 'link' | 'fn' | 'alert';
  args?: string | (() => void);
  style?: React.CSSProperties;
  icon?: React.FC<any>;
}
export interface ILinksGroupProps {
  isMinimal?: boolean;
  noDivider?: boolean;
  icon?: React.FC<any>;
  label: string;
  link?: string;
  path?: string;
  links?: {
    label: string;
    link: string;
    id?: string;
    icon?: React.FC<any>;
    extraBtn?: IExtraBtn;
  }[];
}

export interface INavbarList {
  label: string;
  icon?: React.FC<any>;
  link?: string;
  links?: {
    label?: string;
    link?: string;
    icon?: any;
    extraBtn?: IExtraBtn;
  }[];
}
