import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import ListBooks from '@/components/example/Book';
import { Book } from '@/graphql/generated/schema';
import GET_BOOKS from '@/graphql/queries-example/book.queries';

const BookMock: MockedResponse<{ tags: Book[] }>[] = [
  {
    request: {
      query: GET_BOOKS,
    },
    result: {
      data: {
        tags: [
          {
            id: 1,
            title: 'Je suis pas trés lecture d`erreur TypeScript',
            author: 'Julien',
          },
          { id: 2, title: 'Le petit Prince', author: 'Saint-EX' },
        ],
      },
    },
  },
];

afterEach(() => {
  jest.resetAllMocks();
});

describe('Liste des livres', () => {
  it('récupération de liste et affichage des éléments', async () => {
    render(
      <MockedProvider mocks={BookMock} addTypename={false}>
        <ListBooks />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(
        screen.getByText('Je suis pas trés lecture d`erreur TypeScript'),
      ).toBeInTheDocument();
    });
  });
});

describe('Liste des livres', () => {
  it('récupération de liste et affichage des éléments', async () => {
    const container = render(
      <MockedProvider mocks={BookMock} addTypename={false}>
        <ListBooks />
      </MockedProvider>,
    );
    await waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(container.baseElement).toMatchSnapshot();
    });
  });
});
