/**
 * 需要扩展第三方类型 统一写在这里。
 */
import { ColumnProps } from 'antd/lib/table';
/**
   * columnsItem类型 添加disable的可选项
   */
export type TColumnsItem<T> = Omit<ColumnProps<T>, 'render'>
    & {
      disabled?: boolean;
      render?: (text: any, record: T, index: number) => React.ReactNode | JSX.Element;
    };
