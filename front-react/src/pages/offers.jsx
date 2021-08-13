import React, {useState} from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, InputBase, Fab} from '@material-ui/core';
import { Search, Add } from '@material-ui/icons';

import CreateOfferModal from '../components/CreateOfferModal';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    },
    fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Offers() {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [openNewOfferModal, setOpenNewOfferModal] = useState(false);

    const handleNewOfferModalClose = () => {
        setOpenNewOfferModal(false);
    }

    const handleNewOfferModalOpen = () => {
        setOpenNewOfferModal(true);
    }


    return (
        <div>
            <CreateOfferModal open={openNewOfferModal} handleClose={() => handleNewOfferModalClose()}/>
            {/* Title component */}
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Ariel's Sales!
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        <Search />
                        </div>
                            <InputBase
                                onChange={ (e) => setSearch(e.target.value)}
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    </Toolbar>
                </AppBar>
            </div>
            <p>working on it!</p>
            <Fab onClick={()=> handleNewOfferModalOpen()} size="medium" color="secondary" aria-label="add" className={classes.fab}>
                <Add />
            </Fab>
        </div>
    );
}