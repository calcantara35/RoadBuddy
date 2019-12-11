// function that takes in token if the token is there and add it to headers if not then delete from headers
import axios from "axios";

// when we have a token, we can send it with every request that requires one instead of repeating code on every request.

const setAuthToken = token => {
  if (token) {
    // using axios to set a default header if it has a token, if not then it will remove it
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
