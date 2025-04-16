import { Metadata } from 'next';
import CreateUserForm from './create-user-form';

export const metadata: Metadata = {
  title: 'Create User',
};
const CreateProductPage = () => {
  return (
    <>
      <h2 className="h2-bold">Create User</h2>
      <div className="my-8">
        <CreateUserForm />
      </div>
    </>
  );
};
export default CreateProductPage;
