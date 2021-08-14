import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography,FormControl, InputLabel,Button, MenuItem, Fab, Grid, CircularProgress, Select} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import classnames from 'classnames'

import CreateOfferModal from '../components/CreateOfferModal';
import OfferCard from '../components/OfferCard';
import { useSetState } from '../Provider';
import { getOffers } from '../helpers/db';
import { logout } from '../helpers/auth';

const useStyles = makeStyles((theme) => ({
  customBody: {
    overflowX: "hidden!important",
    overflowY: "hidden!important",
    maxWidth: '100%!important',
    maxHeight: '100%!important'
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  formControl: {
        margin: theme.spacing(1,0,2.5,3),
        minWidth: 120,
    },

  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  offersGrid: {
    display: 'flex!important',
    alignItems: "center!important",
    justifyContent: "center!important",
    padding: "1%!important",
  },
  logout: {
    position: 'fixed',
    right: theme.spacing(2),
    backgroundColor: "#FF4848",
  }
}));



export default function Offers() {
    const classes = useStyles();
    const [filter, setFilter] = useState('none');
  const [openNewOfferModal, setOpenNewOfferModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const setState = useSetState();

    const handleNewOfferModalClose = () => {
        setOpenNewOfferModal(false);
    }

    const handleNewOfferModalOpen = () => {
        setOpenNewOfferModal(true);
  }
  
  const populateOffers = () => {
    getOffers(filter, offers.length)
      .then(result => {
        if (result.length < 10) {
          setHasMoreItems(false);
        }
        else {
          setHasMoreItems(true);
        }
        setOffers(offers.concat(result));
      })
      .catch(err => { })
      .finally(() => setLoading(false));
   }

  useEffect(() => {
    populateOffers();
  },[filter])


    return (
        <div className={classes.customBody}>
        <CreateOfferModal open={openNewOfferModal} handleClose={() => {
          setHasMoreItems(true);
          populateOffers();
          handleNewOfferModalClose();
        }} />
            {/* Title component */}
            <div className={classes.grow}>
                <AppBar position="fixed">
                    <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Ariel's Sales!
                    </Typography>
                    <FormControl className={classes.formControl}>
                            <InputLabel>Filter By Type</InputLabel>
                <Select value={filter} onChange={(e) => {
                  setFilter(e.target.value);
                  setOffers([]);
                }}>
                                <MenuItem value={"none"}>All</MenuItem>
                                <MenuItem value={"cars"}>Cars</MenuItem>
                                <MenuItem value={"electronics"}>Electronics</MenuItem>
                                <MenuItem value={"realEstate"}>Real Estate</MenuItem>
                                <MenuItem value={"clothing"}>Clothing</MenuItem>
                            </Select>
              </FormControl>
              <Button className={classes.logout} color="secondary" onClick={() => {
                logout().then(() => setState(() => ({ auth: false })));
              } }>
                logout
              </Button>
                    </Toolbar>
                </AppBar>
        </div>
        {
          loading ? <CircularProgress /> : offers.length === 0 ? <p> You need to add offers!</p> :
            <InfiniteScroll
              className={classnames(classes.customBody, classes.offersGrid)}
              dataLength={offers.length}
              next={() => populateOffers()}
              hasMore={hasMoreItems}
              loader={<CircularProgress />}
            >
                <Grid container spacing={9} >
                {offers.map((offer) => {
                  return (
                    <Grid key={offer._id} item xs={6}>
                      <OfferCard offer={offer} />
                    </Grid>
                  );
                })}
              </Grid>
            </InfiniteScroll> 
        }
            <Fab onClick={()=> handleNewOfferModalOpen()} size="medium" color="secondary" aria-label="add" className={classes.fab}>
                <Add />
            </Fab>
        </div>
    );
}