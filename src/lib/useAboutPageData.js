import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `{
  "aboutPage": *[_type == "aboutPage"][0],
  "campusCards": *[_type == "aboutLinkCard" && section == "Campus & Culture"] | order(order asc),
  "alumniCards": *[_type == "aboutLinkCard" && section == "Alumni Network"] | order(order asc),
  "news": *[_type == "newsItem"] | order(order asc)
}`;

export function useAboutPageData() {
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
