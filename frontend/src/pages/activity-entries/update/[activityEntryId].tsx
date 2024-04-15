import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { FormEvent } from 'react';
import Link from 'next/link';
import { UPDATE_ACTIVITY_ENTRY } from '@/graphql/activity-entry/mutations/activity-entry.mutations';
import { ACTIVITY_ENTRY_BY_ID } from '@/graphql/activity-entry/queries/activity-entry.queries';
import {
  CategoriesQuery,
  CategoriesQueryVariables,
  GetActivityEntryByIdQuery,
  GetActivityEntryByIdQueryVariables,
  UpdateActivityEntryMutation,
  UpdateActivityEntryMutationVariables,
} from '@/graphql/generated/schema';
import LIST_CATEGORIES from '@/graphql/category/queries/category.queries';

export default function UpdateActivityEntry() {
  const router = useRouter();
  const { activityEntryId } = router.query;

  const { data: categoryData } = useQuery<
    CategoriesQuery,
    CategoriesQueryVariables
  >(LIST_CATEGORIES, {
    fetchPolicy: 'no-cache',
  });
  const categories = categoryData?.categories || [];

  const { data: activityEntryData } = useQuery<
    GetActivityEntryByIdQuery,
    GetActivityEntryByIdQueryVariables
  >(ACTIVITY_ENTRY_BY_ID, {
    variables: {
      activityEntryId:
        typeof activityEntryId === 'string' ? parseInt(activityEntryId, 10) : 0,
    },
    skip: typeof activityEntryId === 'undefined',
  });
  const activityEntry = activityEntryData?.getActivityEntryById;

  const [updateActivityEntry] = useMutation<
    UpdateActivityEntryMutation,
    UpdateActivityEntryMutationVariables
  >(UPDATE_ACTIVITY_ENTRY);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.input = parseFloat(formJSON.input);
    formJSON.category = { id: parseInt(formJSON.category, 10) };

    try {
      await updateActivityEntry({
        variables: {
          activityEntryId: parseInt(activityEntryId as string, 10) || 0,
          data: { ...formJSON },
        },
      });
      router.push(`/activity-entries/list`);
    } catch (error) {
      console.error('Une erreur est survenue:', error);
    }
  };

  return (
    <main className='p-24'>
      {activityEntry && (
        <form onSubmit={handleSubmit}>
          <h1>Modifier une activité</h1>
          <div className='py-8'>
            <div className='pb-4'>
              <select
                className='select select-bordered w-full max-w-sm'
                id='category'
                name='category'
                required
                defaultValue={activityEntry.category?.id}
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
                defaultValue={activityEntry?.name}
              />
            </div>
            <div className='pb-4'>
              <input
                className='input input-bordered w-full max-w-xs'
                type='text'
                name='input'
                placeholder='La dépense carbone'
                defaultValue={activityEntry?.input}
              />
            </div>
            <input className='btn' type='submit' />
          </div>
        </form>
      )}
      <Link
        href={`/activity-entries/list`}
        className='flex items-center mt-3 cursor-pointer link link-primary'
      >
        Retour à la liste des dépenses
      </Link>
    </main>
  );
}
