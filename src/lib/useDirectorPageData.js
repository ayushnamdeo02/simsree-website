import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `{
  "directorPage": *[_type == "directorPage"][0],
  "sections": *[_type == "directorSection"] | order(order asc)
}`;

export function useDirectorPageData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch(QUERY)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
