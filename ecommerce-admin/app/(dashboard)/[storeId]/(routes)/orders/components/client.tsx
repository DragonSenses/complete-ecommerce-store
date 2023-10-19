"use client";

// Global Imports
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Local Imports
import { OrderColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/ApiList";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface OrdersClientProps {
  data: OrderColumn[]
}

// Client component that loads all our Orders
const OrdersClient: React.FC<OrdersClientProps> = ({
  data
}) => {
  // Create router object to perform client-side navigation
  const router = useRouter();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage orders for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/orders/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"name"}/>
      <Heading title="API" description="API calls for Orders" />
      <Separator />
      <ApiList 
        entityName="orders"
        entityIdName="orderId"
      />
    </>
  )
}

export default OrdersClient;