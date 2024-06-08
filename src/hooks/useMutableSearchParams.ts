import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useMutableSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = new URLSearchParams(searchParams);

  function get<IsArray extends boolean>(
    key: string,
    asArray: IsArray
  ): IsArray extends true ? string[] : string;
  function get(key: string, isArray: boolean): string[] | string {
    if (isArray) {
      return query.get(key)?.split(",") ?? [];
    }
    return query.get(key) ?? "";
  }

  return {
    get,
    set: (key: string, value: string) => {
      query.set(key, value);
      router.replace(`${pathname}?${query.toString()}`);
    },
    clear: () => {
      query.forEach((_, key) => query.delete(key));
      router.replace(`${pathname}?${query.toString()}`);
    },
    remove: (key: string) => {
      query.delete(key);
      router.replace(`${pathname}?${query.toString()}`);
    },
  };
};
