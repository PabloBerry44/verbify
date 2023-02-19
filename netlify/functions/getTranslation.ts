import fetch from 'node-fetch'

exports.handler = async function (event) {
   const queryText = event.queryStringParameters.text
   const querySource = event.queryStringParameters.source
   const queryTarget = event.queryStringParameters.target

   const apiKey = String(process.env.API_KEY)

   const encodedParams = new URLSearchParams()
   encodedParams.append('source_language', querySource.toLowerCase())
   encodedParams.append('target_language', queryTarget.toLowerCase())
   encodedParams.append('text', queryText)

   const url = 'https://text-translator2.p.rapidapi.com/translate'
   const options = {
      method: 'POST',
      headers: {
         'content-type': 'application/x-www-form-urlencoded',
         'X-RapidAPI-Key': apiKey,
         'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      body: encodedParams,
   }

   try {
      const response = await fetch(url, options)
      const data = await response.json()

      return {
         statusCode: 200,
         body: JSON.stringify(data),
      }
   } catch (error) {
      const { status, statusText, headers, data } = error.response
      return {
         statusCode: status,
         body: JSON.stringify({ status, statusText, headers, data }),
      }
   }
}
