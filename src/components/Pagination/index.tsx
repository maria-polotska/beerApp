import Pagination from "@mui/material/Pagination";

interface Props {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const ListPagination = (props: Props) => {
  return (
    <Pagination
      count={props.count}
      page={props.page}
      onChange={props.onChange}
    />
  );
};

export default ListPagination;
