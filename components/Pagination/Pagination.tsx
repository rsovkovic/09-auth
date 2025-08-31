import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";
interface PaginationProps {
  total: number;
  page: number;
  onChange: (nextPage: number) => void;
}
export default function Pagination({ page, total, onChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={total}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
