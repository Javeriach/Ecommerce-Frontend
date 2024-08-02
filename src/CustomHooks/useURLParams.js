import { useParams, useSearchParams } from 'react-router-dom';

export function useURLParams() {
  let [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('itemId');
  const Category = searchParams.get('Category');
  const quantity = searchParams.get('quantity');
  const session_id = searchParams.get('session_id');
  const resultProducts = searchParams.get('resultProducts');
  console.log(session_id);
  return { Category, id, quantity, session_id, resultProducts };
}
