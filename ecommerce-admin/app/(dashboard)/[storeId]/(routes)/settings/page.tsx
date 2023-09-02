import React from 'react';

interface SettingsPageProps {
  params: {
    storeId: string;
  }
};

const SettingsPage: React.FC<SettingsPageProps> = ({
  params
}) => {
  return (
    <div>
      Settings Page
    </div>
  )
}

export default SettingsPage