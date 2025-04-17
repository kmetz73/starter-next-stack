import { getUserById } from '@/lib/actions/user.actions';
import UpdateUserForm from './update-user-form';
import { notFound } from 'next/navigation';

const UpdateUserPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const user = await getUserById(id);

  if (!user) notFound();

  // Transform the user object to handle null values
  const formattedUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    rank: user.rank || undefined,
    callSign: user.callSign || undefined,
    isActive: user.isActive || false,
  };

  return (
    <div className="space-y-8 max-w-lg mx-auto ">
      <h1 className="h2-bold">Update User</h1>
      <UpdateUserForm user={formattedUser} />
    </div>
  );
};
export default UpdateUserPage;
