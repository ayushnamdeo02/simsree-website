import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `{
  "historyPage": *[_type == "historyPage"][0],
  "milestones": *[_type == "timelineMilestone"] | order(order asc),
  "coreValues": *[_type == "coreValue"] | order(order asc)
}`;

export function useHistoryPageData() {
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
