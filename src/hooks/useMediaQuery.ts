import { useEffect, useState } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const updateMatches = () => {
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
    };

    updateMatches();

    // const listener = () => setMatches(media.matches);
    const listener = () => updateMatches();

    // window.addEventListener("resize", listener);
    media.addEventListener("change", listener);

    // return () => window.removeEventListener("resize", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
