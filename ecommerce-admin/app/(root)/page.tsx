"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {
  const storeModal = useStoreModal();

  return (
    <div className='p-4'>
      Root Page
    </div>
  )
}
