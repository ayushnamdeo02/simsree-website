import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `*[_type == "programmeDetail" && slug.current == $slug][0]`;

export function useProgrammeDetailData(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    sanityClient
      .fetch(QUERY, { slug })
      .then((result) => { if (!cancelled) setData(result); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  return { data, loading, error };
}
