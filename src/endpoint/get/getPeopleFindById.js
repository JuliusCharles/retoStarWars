const axios = require('axios');
const _url = process.env.SWAPI_URL;

module.exports.handler = async (event) => {
    try {
      const  param  = event.pathParameters.id;

      const response = await axios.get(_url+`/${param}`); 
      const responseData = response.data;
  
      return {
        statusCode: 200,
        body: JSON.stringify(responseData),
      };
      
    } catch (error) {
      console.error('Error:', error);
  
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal server error' }),
      };
    }
  };