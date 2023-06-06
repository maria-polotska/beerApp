import { useEffect, useState } from "react";
import { fetchData } from "./utils";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, TextField, Link } from "@mui/material";
import styles from "./Home.module.css";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>(
    JSON.parse(localStorage.getItem("savedBeers") || "[]")
  );
  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  useEffect(() => {
    localStorage.setItem("savedBeers", JSON.stringify(savedList));
  }, [savedList]);

  const isChecked = (beer: Beer): boolean =>
    savedList.some(item => item.id === beer.id);

  const handleChecked = (beer: Beer) => {
    if (isChecked(beer)) {
      setSavedList(savedList.filter(item => item.id !== beer.id));
    } else {
      setSavedList([...savedList, beer]);
    }
  };

  const removeAllSavedBeers = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSavedList([]);
    localStorage.removeItem("savedBeers");
  };
  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label="Filter..." variant="outlined" />
                <Button variant="contained">Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      checked={isChecked(beer)}
                      onChange={() => handleChecked(beer)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items ({savedList.length})</h3>
                <Button
                  variant="contained"
                  size="small"
                  onClick={e => removeAllSavedBeers(e)}
                >
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      checked={isChecked(beer)}
                      onChange={() => handleChecked(beer)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
