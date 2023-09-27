"use client";

// Global Imports
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Local Imports
import { BillboardColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/ApiList";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface BillboardClientProps {
  data: BillboardColumn[]
}

// Client component that loads all our Billboards
const BillboardClient: React.FC<BillboardClientProps> = ({
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
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"label"}/>
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList 
        entityName="billboards"
        entityIdName="billboardId"
      />
    </>
  )
}

export default BillboardClient;