"use client";

// Global Imports
import { Plus } from "lucide-react";

// Local Imports
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

// Client component that loads all our Billboards
const BillboardClient = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
          description="Manage billboards for your store"
        />
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      {/* Data Table */}
    </>
  )
}

export default BillboardClient;