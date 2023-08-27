import React from 'react';

interface DashboardPageProps {
  params: { storeId: string }
};

// TODO: Arrow function, load store using prismadb, 
export default function DashboardPage: React.FC<DashboardPageProps> = async({
  params
})() {
  return (
    <div>This is a Dashboard</div>
  )
}
