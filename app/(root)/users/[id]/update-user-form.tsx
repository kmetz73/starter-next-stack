'use client';

import { updateUserSchema } from '@/lib/validations';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { updateUser } from '@/lib/actions/user.actions';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof updateUserSchema>>({
    defaultValues: {
      id: user.id,
      rank: user.rank,
      firstName: user.firstName,
      lastName: user.lastName,
      callSign: user.callSign,
      email: user.email,
      isActive: user.isActive, // or false, depending on the user
      // ...other fields
    },
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    try {
      const res = await updateUser({
        ...values,
        id: user.id,
      });

      if (!res.success) {
        toast.error(res.message);
      }
      toast.success(res.message);
      form.reset();
      router.push(`/users`);
    } catch (error) {
      toast.error((error as Error).message);

      return;
    }

    return;
  };

  return (
    <Form {...form}>
      <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          {/* rank */}
          <FormField
            control={form.control}
            name="rank"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                'rank'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Rank</FormLabel>
                <FormControl>
                  <Input
                    disabled={false}
                    placeholder="Enter  user  rank"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* first name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                'firstName'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    placeholder="Enter  user  First name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                'lastName'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    placeholder="Enter  user  Last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* callsign */}
          <FormField
            control={form.control}
            name="callSign"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                'callSign'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Call Sign</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    placeholder="Enter  user  email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateUserSchema>,
                'email'
              >;
            }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={false}
                    placeholder="Enter  user  email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* isActive */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-between mt-4">
          <Button
            type="submit"
            className="w-full "
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Submitting' : 'Update User'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UpdateUserForm;
