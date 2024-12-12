interface TPagination {
  page: number;
  total: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface TRoute {
  name: string;
  path: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;

  sub_routes?: TRoute[];
}
