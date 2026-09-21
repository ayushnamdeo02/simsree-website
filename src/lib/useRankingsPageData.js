import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `{
  "rankingsPage": *[_type == "rankingsPage"][0],
  "frameworks": *[_type == "rankingFramework"] | order(order asc),
  "honours": *[_type == "honour"] | order(order asc),
  "accreditations": *[_type == "accreditation"] | order(order asc),
  "verificationDocs": *[_type == "verificationDoc"] | order(order asc)
}`;

export function useRankingsPageData() {
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
