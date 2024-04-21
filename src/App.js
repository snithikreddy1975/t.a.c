import React, { useEffect, useState } from 'react';
function App() {
  // State variables to store input value, total lines, poems with min lines, and error
  const [author, setAuthor] = useState('');
  const [totalLines, setTotalLines] = useState(0);
  const [poemsWithMinLines, setPoemsWithMinLines] = useState([]);
  const [error, setError] = useState(false);

  // Function to handle input change
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false)
    
    try {
      // Fetch poetry information from backend server
      const response = await fetch(`https://poetrydb.org/author/${author}`);
      console.log(response)
      const data = await response.json();
      console.log(data)
      let lines_count=0
      if(data.status===404){
        setError(true)
        setPoemsWithMinLines("-")
        setTotalLines(0)
      }
      else{
        for (let count of data){
          lines_count=lines_count+parseInt(count['linecount'])
        }
        let initial_length=data[0]
        let min_length=parseInt(initial_length['linecount'])

        for (let eachLine of data){
          if (parseInt(eachLine['linecount'])<min_length){
            min_length=parseInt(eachLine['linecount'])
            console.log(min_length)
          }
        }

        let initial_poem_list=[]
        for (let min_lines of data){
          if (parseInt(min_lines['linecount'])===min_length){
            initial_poem_list.push(min_lines['title'])
          }
        }

        setPoemsWithMinLines(initial_poem_list)
        setTotalLines(lines_count);
      }

    } catch (error) {
        // Handle error
        console.log(error)
      }
  };
  return (
    <div>
      <h1>Poetry Database</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='authorName'>Enter the name of the poet:</label>
          <input id='authorName' type="text" value={author} onChange={handleAuthorChange} placeholder='Enter Author Name' />
        
        <button type="submit">Search</button>
      </form>
      
      {/* Display error message if there is an error */}
      {error && <div><p>Total lines: {totalLines}</p><p>Title(s) of poem(s) with the least number of lines:{poemsWithMinLines}</p></div>}
      
      {/* Display total lines and poems with min lines */}
      {totalLines > 0 && (
        <div>
          <p>Total number of lines: {totalLines}</p>
          <p>Title(s) of poem(s) with the least number of lines: </p>
          <ul>
            {poemsWithMinLines.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default App;