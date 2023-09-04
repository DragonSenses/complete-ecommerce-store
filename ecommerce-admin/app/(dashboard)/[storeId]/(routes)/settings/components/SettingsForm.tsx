// Global Imports
import * as z from 'zod';
import React from 'react';
import { Store } from '@prisma/client';
import { Trash } from 'lucide-react';

// Local Imports
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface SettingsFormProps {
  initialData: Store
}

// Create zod object schema with string name and min of 1 letter
const formSchema = z.object({
  name: z.string().min(1),
});

// extract the inferred type
type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Manage store preferences"
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => { }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
    </>
  )
}

export default SettingsForm