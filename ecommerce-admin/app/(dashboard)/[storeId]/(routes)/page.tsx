// Global Imports
import React from 'react';
import { DollarSign } from 'lucide-react';

// Local Imports
import prismadb from '@/lib/prismadb';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { priceFormatter } from '@/lib/utils';

interface DashboardPageProps {
  params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title='Dashboard' description='Overview of your store' />
        <Separator />
        
        <div className="grid gap-4 grid-cols-3">

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {priceFormatter.format(100)}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}

export default DashboardPage;