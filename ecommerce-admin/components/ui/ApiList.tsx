"use client";

// Global imports
import React from 'react';
import { useParams } from 'next/navigation';

// Local imports
import { useOrigin } from '@/hooks/use-origin';
import { ApiAlert } from '@/components/ui/ApiAlert';

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  // Safely access the window object, only after the component is mounted
  const origin = useOrigin();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();

  // Create base URL for the API call
  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert 
        title="GET" 
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert 
        title="GET" 
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert 
        title="POST" 
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert 
        title="PATCH" 
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert 
        title="DELETE" 
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  )
}
