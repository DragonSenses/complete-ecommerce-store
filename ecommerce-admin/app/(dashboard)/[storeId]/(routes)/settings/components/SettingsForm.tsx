// Global Imports
import React from 'react';
import { Store } from '@prisma/client';

// Local Imports
import { Heading } from '@/components/ui/heading';

interface SettingsFormProps {
  initialData: Store
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  return (
    <div className="flex items-center justify-between">
      <Heading
        title="Settings"
        description="Manage store preferences"
      />
    </div>
  )
}

export default SettingsForm