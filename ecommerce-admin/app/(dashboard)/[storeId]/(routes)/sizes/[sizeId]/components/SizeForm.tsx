"use client"

// Global Imports
import * as z from 'zod';
import axios from 'axios';
import React, { useState } from 'react';
import { Size } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

// Local Imports
import { AlertModal } from '@/components/modals/AlertModal';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUpload from '@/components/ui/ImageUpload';

// Create zod object schema
const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

// extract the inferred type
type SizeFormValues = z.infer<typeof formSchema>;

// Define type and shape of props
interface SizeFormProps {
  initialData: Size | null
}

const SizeForm: React.FC<SizeFormProps> = ({
  initialData
}) => {
  // Create router object to perform client-side navigation
  const router = useRouter();

  // Hook returns an object containing current route's filled in dynamic parameters
  const params = useParams();

  // Create open state to control the Alert modal
  const [open, setOpen] = useState(false);

  // Create loading state to disable interactive elements
  const [loading, setLoading] = useState(false);

  // Create dynamic data to pass into output
  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit a size" : "Add a new size";
  const toastMessage = initialData ? "Size updated." : "Size created.";
  const action = initialData ? "Save changes" : "Create";

  // 1. Define form with useForm hook & zodResolver for validation
  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: ''
    }
  });

  // 2. Define a submit handler
  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update specific Size
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
      } else {
        // Create new Size
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }
      // Refresh current route to make new request to server
      // Re-fetch data requests & re-render server components
      // Re-initializes initialData
      router.refresh();
      // Re-route the user to the sizes page
      router.push(`/${params.storeId}/sizes`)
      // Success notification with dynamic message
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Define a delete handler
  const onDelete = async () => {
    try {
      setLoading(true);
      // Call an API with dynamic route to delete the Size
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      // Re-synchronize server component to update data
      router.refresh();
      // Navigate back to the specific store's sizes page after deletion
      router.push(`${params.storeId}/sizes`);
      toast.success("Size deleted.");
    } catch (error) {
      // Safety mechanism will prompt a warning to delete any related records to the Size
      toast.error("Make sure you removed all products using this size first.");
    } finally {
      setLoading(false);
      // Close the Modal
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Size name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Size value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SizeForm