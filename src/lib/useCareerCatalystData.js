import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `*[_type == "careerCatalystPage"][0]`;

export function useCareerCatalystData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch(QUERY)
      .then((result) => { if (!cancelled) setData(result); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return { data };
}
