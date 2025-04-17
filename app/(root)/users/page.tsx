import DeleteDialog from '@/components/buttons/delete-dialog';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deleteUser, getAllUsers } from '@/lib/actions/user.actions';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Roster',
};

const RoasterPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page = '1' } = await props.searchParams;
  const users = await getAllUsers({ page: Number(page) });
  return (
    <div className="space-y-2">
      <div className="flex-between">
        <h1 className="h2-bold">Roster</h1>
        <Button asChild variant="default">
          <Link href="/users/create">Create User</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>RANK</TableHead>
            <TableHead>FIRST NAME</TableHead>
            <TableHead>LAST NAME</TableHead>
            <TableHead>CALL SIGN</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.rank}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.callSign}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.isActive ? 'Yes' : 'No'}</TableCell>
              {/* Actions */}
              <TableCell className="flex gap-1">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/users/${user.id}`}>Edit</Link>
                </Button>
                <DeleteDialog id={user.id} action={deleteUser} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users.totalPages > 1 && (
        <Pagination page={Number(page) || 1} totalPages={users?.totalPages} />
      )}
    </div>
  );
};
export default RoasterPage;
