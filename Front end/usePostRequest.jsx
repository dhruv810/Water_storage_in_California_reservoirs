import React, {useEffect} from 'react';

const usePostRequest = function (url, options, thenFun, catchFun) {

  async function fetchData() {
   
    let params = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(options)
    };
    
    let api_url = '/query/getData';
    let response = await fetch(api_url, params);
    if (!response.ok){
      catchFun(response.status);
    }
    
    let json = await response.json();
    console.log("then function was called");
    
    thenFun(json);
  }
  
  useEffect(function () {
    console.log("Calling fetch");
    
    fetchData();
    
  }, [options]);

}

export default usePostRequest;