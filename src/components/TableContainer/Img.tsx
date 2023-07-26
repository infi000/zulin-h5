import * as React from 'react';

interface IProps {
  src: string;
}
const TableImg = (props: IProps) => {
  const { src } = props;
  return <a href={src} target='_blank' rel='noreferrer' style={{ display: 'inline-block' }}><img style={{ width: '100%' }} src={src} /></a>;
};

export default TableImg;
