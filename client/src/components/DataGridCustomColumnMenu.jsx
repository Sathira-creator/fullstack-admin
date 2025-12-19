import React from 'react';
import {
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridColumnMenuHideItem,
} from '@mui/x-data-grid';

const CustomColumnMenu = (props) => {
  const { column, onClose } = props;

  return (
    <GridColumnMenuContainer onClose={onClose} column={column}>
      <GridColumnMenuFilterItem
        onClick={onClose}
        column={column}
      />
      <GridColumnMenuHideItem
        onClick={onClose}
        column={column}
      />
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;
