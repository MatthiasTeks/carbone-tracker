import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '@/graphql/queries-example/book.queries';
import {
  GetBooksQuery,
  GetBooksQueryVariables,
} from '@/graphql/generated/schema';

function ListBooks() {
  const { data } = useQuery<GetBooksQuery, GetBooksQueryVariables>(GET_BOOKS);
  return (
    <main className={`flex flex-col items-center justify-between p-2`}>
      <ul className='list-decimal'>
        <li>Ceci est un test</li>
        {data?.tags.map((b) => <li key={b.id}>{b.title}</li>)}
      </ul>
    </main>
  );
}

export default ListBooks;
