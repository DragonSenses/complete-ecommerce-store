"use client";

import React from 'react';
import { BillboardColumn } from './columns';

interface CellActionProps {
  data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  return (
    <div>cell-action</div>
  )
}
