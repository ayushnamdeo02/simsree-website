import { useEffect, useState } from 'react';
import { sanityClient } from './sanity';

const QUERY = `{
  "homepage": *[_type == "homepage"][0],
  "stats": *[_type == "statCard"] | order(order asc),
  "news": *[_type == "newsItem"] | order(order asc),
  "courses": *[_type == "courseOffered"] | order(order asc),
  "factors": *[_type == "whySimsreeFactor"] | order(order asc),
  "events": *[_type == "upcomingEvent"] | order(order asc),
  "flagships": *[_type == "flagshipEvent"] | order(order asc),
  "recruiters": *[_type == "recruiter"] | order(order asc),
  "recruiterCount": count(*[_type == "recruiter"]),
  "studentVoices": *[_type == "studentVoice"] | order(order asc)
}`;

export function useHomepageData() {
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
