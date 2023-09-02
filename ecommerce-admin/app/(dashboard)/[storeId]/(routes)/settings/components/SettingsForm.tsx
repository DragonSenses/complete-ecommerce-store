// Global Imports
import React from 'react';
import { Store } from '@prisma/client';

interface SettingsFormProps {
  initialData: Store
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  return (
    <div>SettingsForm</div>
  )
}

export default SettingsForm