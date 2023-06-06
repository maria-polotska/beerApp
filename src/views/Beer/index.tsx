import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box'
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styles from "./Beer.module.css";

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article>
      <section>
      <Paper sx={{p:3, margin: "auto"}} >
            <Grid container spacing={2} justifyContent="center" >
                <Grid xs={8} sm={10} md={5} lg={4} item alignItems="center">
                    <Box className={styles.productImg}>
                        <img
                         src={process.env.PUBLIC_URL + "/beer-placeholder.jpg"}
                        alt={beer?.name}
                        />
                    </Box>
                </Grid>
                <Grid xs={12} sm={12} md={7} lg={8} item>
                    <h1>{beer?.name}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  </p>
                    <main>
                        <span>
                            <b>Brewery type: </b> {beer?.brewery_type}
                        </span>
                        <br/>
                        <span>
                            <b>Address: </b> {beer?.address_1} {beer?.address_2} {beer?.address_3} , {beer?.postal_code}
                        </span><br/>
                        <span>
                            <b>City: </b> {beer?.city}
                        </span><br/>
                        <span>
                            <b>State: </b> {beer?.state_province}
                        </span><br/>
                        <span>
                            <b>Country: </b> {beer?.country}
                        </span><br/>
                        {beer?.website_url && <span><b>Web Site: </b> <a href={beer?.website_url}>{beer?.website_url}</a></span>}
                        
                    </main>
            
                </Grid>
            </Grid>
        </Paper>
      </section>
    </article>
  );
};

export default Beer;
