import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `{
  "page": *[_type == "alumniPortalPage"][0],
  "events": *[_type == "simaaEvent"] | order(order asc),
  "services": *[_type == "alumniService"] | order(order asc),
  "chapters": *[_type == "cityChapter"] | order(order asc),
  "talks": *[_type == "alumniTalk"] | order(order asc)
}`;

export function useAlumniPortalData() {
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
