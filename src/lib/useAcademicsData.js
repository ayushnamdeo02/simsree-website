import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `{
  "page": *[_type == "academicsPage"][0],
  "programmes": *[_type == "programme"] | order(order asc),
  "differentiators": *[_type == "academicsDifferentiator"] | order(order asc)
}`;

export function useAcademicsData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch(QUERY)
      .then((result) => { if (!cancelled) setData(result); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
