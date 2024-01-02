"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

import React from 'react';

interface OverviewProps {
  data: any[];
}

const Overview: React.FC<OverviewProps> = ({
  data,
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>

      </BarChart>
    </ResponsiveContainer>
  )
}

export default Overview