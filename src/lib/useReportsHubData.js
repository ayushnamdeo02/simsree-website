import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

// MMS uses the original page document; M.Sc. Finance has its own. Tabs without a
// programme are MMS.
const QUERY = `{
  "page": *[_id == $pageId][0],
  "tabs": *[_type == "reportTab" && coalesce(programme, "mms") == $programme] | order(order asc)
}`;

export function useReportsHubData(programme = 'mms') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch(QUERY, { programme, pageId: programme === 'msc' ? 'reportsHubPageMsc' : 'reportsHubPage' })
      .then((result) => { if (!cancelled) setData(result); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [programme]);

  return { data, loading, error };
}
