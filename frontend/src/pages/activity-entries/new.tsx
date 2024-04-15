import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { CREATE_ACTIVITY_ENTRY } from '@/graphql/activity-entry/mutations/activity-entry.mutations';
import {
  CategoriesQuery,
  CategoriesQueryVariables,
  CreateActivityEntryMutation,
  CreateActivityEntryMutationVariables,
} from '@/graphql/generated/schema';
import LIST_CATEGORIES from '@/graphql/category/queries/category.queries';

export default function NewActivityEntry() {
  const router = useRouter();
  const [createActivityEntry] = useMutation<
    CreateActivityEntryMutation,
    CreateActivityEntryMutationVariables
  >(CREATE_ACTIVITY_ENTRY);

  const { data } = useQuery<CategoriesQuery, CategoriesQueryVariables>(
    LIST_CATEGORIES,
    {
      fetchPolicy: 'no-cache',
    },
  );
  const categories = data?.categories || [];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.input = parseFloat(formJSON.input);
    formJSON.category = { id: parseInt(formJSON.category, 10) };

    try {
      await createActivityEntry({
        variables: { data: { ...formJSON } },
      });
      router.push(`/activity-entries/list`);
    } catch (error) {
      console.error('Une erreur est survenue:', error);
    }
  };

  return (
    <main className='p-24'>
      <form onSubmit={handleSubmit}>
        <h1>Créer une nouvelle activité</h1>
        <div className='py-8'>
          <div className='pb-4'>
            <select
              className='select select-bordered w-full max-w-sm'
              id='category'
              name='category'
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className='pb-4'>
            <input
              className='input input-bordered w-full max-w-xs'
              type='text'
              name='name'
              placeholder='Le nom de mon activité'
            />
          </div>
          <div className='pb-4'>
            <input
              className='input input-bordered w-full max-w-xs'
              type='text'
              name='input'
              placeholder='La dépense carbone'
            />
          </div>
          <input className='btn' type='submit' />
        </div>
      </form>
    </main>
  );
}
