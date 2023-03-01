import { ReactNode } from 'react';

/* eslint-disable no-unused-vars */
type ICarouselProps = {
  data: Array<any>;
  renderItem?: (item: any) => ReactNode;
  keyExtractor?: (item: any) => any;
};

export default ICarouselProps;
