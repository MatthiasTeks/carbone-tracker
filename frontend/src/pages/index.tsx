import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useGetBooksQuery } from '@/graphql/generated/schema';

export default function Home() {
  const { loading, error, data } = useGetBooksQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const books = data?.tags || [];

  console.info('books', books);

  return (
    <>
      <DashboardLayout />
    </>
  );
}
