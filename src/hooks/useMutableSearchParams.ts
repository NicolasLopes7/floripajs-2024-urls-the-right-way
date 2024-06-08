import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useMutableSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = new URLSearchParams(searchParams);

  return {
    searchParams,
    set: (key: string, value: string) => {
      query.set(key, value);
      router.replace(`${pathname}?${query.toString()}`);
    },
    remove: (key: string) => {
      query.delete(key);
      router.replace(`${pathname}?${query.toString()}`);
    },
  };
};
