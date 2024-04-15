import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { LIST_ACTIVITY_ENTRIES } from '@/graphql/activity-entry/queries/activity-entry.queries';
import {
  ActivityEntriesQuery,
  ActivityEntriesQueryVariables,
} from '@/graphql/generated/schema';

export default function ActivityEntriesList() {
  const { data } = useQuery<
    ActivityEntriesQuery,
    ActivityEntriesQueryVariables
  >(LIST_ACTIVITY_ENTRIES, {
    fetchPolicy: 'no-cache',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>(
    'Toutes les dépenses',
  );

  const categories = [
    'Toutes les dépenses',
    ...Array.from(
      new Set(data?.activityEntries.map((activity) => activity.category.name)),
    ),
  ];

  const filteredActivityEntries =
    selectedCategory === 'Toutes les dépenses'
      ? data?.activityEntries
      : data?.activityEntries.filter(
          (activity) => activity.category.name === selectedCategory,
        );

  return (
    <main className={`overflow-x-auto p-24`}>
      <select
        className='select select-bordered w-full max-w-sm mb-5'
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <table className='table'>
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Date</th>
            <th>Footprint</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivityEntries?.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.category.name}</td>
              <td>
                <Link
                  href={`/activity-entries/${activity.id}`}
                  className='cursor-pointer link link-primary'
                >
                  {activity.name}
                </Link>
              </td>
              <td>{activity.createdAt}</td>
              <td>{activity.input}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
