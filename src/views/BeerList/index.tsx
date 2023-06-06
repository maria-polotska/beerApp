import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Beer } from "../../types";
import { fetchData } from "./utils";
import ListPagination from "../../components/Pagination";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Button,
  Divider,
  Stack
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const [page, setPage] = useState<number>(1);
  const [beersPerPage, setBeersPerPage] = useState<number>(5);

  const changePageHandler = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const startIndex = (page - 1) * beersPerPage;
  const endIndex = startIndex + beersPerPage;
  const currentBeerList = beerList.slice(startIndex, endIndex);

  const [sortDirection, setSortDirection] = useState<boolean>(true);

  const sortListHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSortDirection(prevSortDirection => !prevSortDirection);

    const sortedList = [...beerList].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return sortDirection ? 1 : -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return sortDirection ? -1 : 1;
      }
      return 0;
    });

    setBeerList(sortedList);
  };
  const onBeerClick = (id: string) => navigate(`/beer/${id}`);
  const beersPerPageHandler = (event: SelectChangeEvent) => {
    setBeersPerPage(+event.target.value);
  };
  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              variant="outlined"
              onClick={e => sortListHandler(e)}
              startIcon={
                sortDirection ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
              }
            >
              {!sortDirection && "Sort by ASC"}
              {sortDirection && "Sort by DESC"}
            </Button>
            <span>Items per page: </span>
            <FormControl variant="standard">
              <Select
                value={beersPerPage.toString()}
                onChange={beersPerPageHandler}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Divider sx={{ mt: 2 }} />
          <List>
            {currentBeerList.map(beer => (
              <ListItemButton
                key={beer.id}
                onClick={onBeerClick.bind(this, beer.id)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={beer.name}
                  secondary={beer.brewery_type}
                />
              </ListItemButton>
            ))}
          </List>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            mb={2}
            mt={2}
          >
            <ListPagination
              count={Math.ceil(beerList.length / beersPerPage)}
              page={page}
              onChange={changePageHandler}
            />
          </Stack>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
