"use client";

import { useSearch } from "@/components/search/SearchProvider";

export default function RandomButton({
  className = "btn",
  children = "Give me a thought",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { openRandom } = useSearch();
  return (
    <button className={className} onClick={openRandom}>
      {children}
    </button>
  );
}
