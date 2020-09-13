import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography, 
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton 
} from '@material-ui/core';
import { SendOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  pageContainer: {
    width: '100vw',
    height: '100vh',
  },
  topContainer: {
    width: '100%',
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bottomContainer: {
    width: '100%',
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  searchBar: {
    width: '50%',
    alignSelf: 'center'
  }
}));

function App() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");

  function handleSubmit() {
    const requestBody = { 
      message: inputValue
    };
    axios.post(`https://twilio-app-frank.herokuapp.com/text`, { requestBody })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(err => {
      console.error(err.message)
    })
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.topContainer}>
        <Typography 
          variant="h1" 
          component="h2" 
          style={{
            alignSelf: 'center',
            marginBottom: '50px',
            textAlign: 'center'
          }}
        >
          Welcome to my Twilio App
        </Typography>
        <Typography 
          variant="h4" 
          style={{
            alignSelf: 'center',
            wordWrap: 'break-word',
            textAlign: 'center'
          }}
        >
          Hi there! To learn more about me, submit your phone number below and receive a message with more information. 
        </Typography>
      </div>
      <div className={classes.bottomContainer}>
        <FormControl className={classes.searchBar}>
          <InputLabel htmlFor="standard-adornment-search">Your phone number(US Number only)</InputLabel>
          <Input
            id="submit-bar"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="submit-search"
                  onClick={() => handleSubmit()}
                >
                  <SendOutlined/>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </div>
  );
}

export default App;
