import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `{
  "campusPage": *[_type == "campusPage"][0],
  "features": *[_type == "campusFeature"] | order(order asc),
  "facilities": *[_type == "facility"] | order(order asc),
  "testimonials": *[_type == "campusTestimonial"] | order(order asc)
}`;

export function useCampusPageData() {
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
