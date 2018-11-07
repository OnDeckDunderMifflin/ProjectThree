import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';


if(document.cookie.indexOf("token") !== -1){
  axios.post('/auth/onstart', {}).then(response => {
    if(response.data.status === "success"){
      ReactDOM.render(<App auth={"success"} user={response.data.user}/>, document.getElementById('root'));
    }else{
      ReactDOM.render(<App auth={null} user={null}/>, document.getElementById('root'));
    }
  })
}else{
  ReactDOM.render(<App auth={null} user={null}/>, document.getElementById('root'));
}