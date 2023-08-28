import React from 'react';

interface DashboardPageProps {
  params: { storeId: string }
};

// TODO: Arrow function, load store using prismadb, 
const DashboardPage: React.FC<DashboardPageProps> = async () => {
  return (
    <div>
      This is a Dashboard!
    </div>
  );
}

export default DashboardPage;