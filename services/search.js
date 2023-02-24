
import algoliasearch from "algoliasearch";

const client = algoliasearch('TATCEOG08N', '9407feda6295167d3e5b9430ec0efeae');
const index = client.initIndex('comicsIndex');



export default async function getSuggestions(query) {

    const suggestionData = await index.search(query, {
        hitsPerPage: 50,
      })
      
      
      return suggestionData;

      

}

