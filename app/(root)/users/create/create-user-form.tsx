'use client';

import { createUser } from '@/lib/actions/user.actions';
import { userDefaultValues } from '@/lib/constants';
import { createUserSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

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

// Infer the strict CreateUser type
type CreateUserType = z.infer<typeof createUserSchema>;

const CreateUserForm = () => {
  const router = useRouter();

  const form = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: userDefaultValues,
  });

  const onSubmit: SubmitHandler<CreateUserType> = async (values) => {
    const res = await createUser(values);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      router.push('/users');

      return;
    }
    return;
  };

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem className="w-[250px]">
              <FormLabel>Rank</FormLabel>
              <FormControl>
                <Input
                  disabled={false}
                  placeholder="Enter user rank"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Repeat FormField for firstName, lastName, callSign, email, etc. */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-[250px]">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  disabled={false}
                  placeholder="Enter First Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-[250px]">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  disabled={false}
                  placeholder="Enter Last Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="callSign"
          render={({ field }) => (
            <FormItem className="w-[250px]">
              <FormLabel>Call Sign</FormLabel>
              <FormControl>
                <Input
                  disabled={false}
                  placeholder="Enter users call sign"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-[250px]">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={false}
                  placeholder="Enter users email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex-between mt-4">
          <Button
            type="submit"
            className="w-full "
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Submitting' : 'Add User'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateUserForm;
