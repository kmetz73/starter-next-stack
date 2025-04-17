import { useRouter } from 'next/router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Assume updateUserSchema is defined elsewhere

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>; // Use the inferred schema type here
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    // Handle form submission
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>{/* Form fields */}</form>
  );
};

export default UpdateUserForm;
