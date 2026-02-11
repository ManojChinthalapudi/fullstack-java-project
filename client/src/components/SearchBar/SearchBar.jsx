// import React from 'react'
// import { HiLocationMarker } from 'react-icons/hi'

// const SearchBar = ({ filter, setFilter }) => {
//   return (
//     <div className="search-bar flexCenter">
//         <HiLocationMarker color="var(--blue)" size={25} />
//         <input placeholder="Search by title/city/country.." type='text' value={filter} onChange={(e)=>setFilter(e.target.value)}/>
//           <button className="button">Search</button>
//     </div>
//   )
// }

// export default SearchBar



//-----------------------------------------------------------------------
// import React, { useState } from 'react';
// import { HiLocationMarker } from 'react-icons/hi';

// const SearchBar = ({ filter, setFilter }) => {
//   const [suggestions, setSuggestions] = useState([]);

//   const fetchSuggestions = async (query) => {
//     try {
//       const response = await fetch(`https://api.locationiq.com/v1/autocomplete.php?key=pk.5a427daa355fc91e61bd412c29e409f3&q=${query}&countrycodes=IN&limit=5`);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
//       }

//       const data = await response.json();

//       console.log("API Response:", data); // Log the API response to debug

//       if (Array.isArray(data)) {
//         const filteredSuggestions = data
//           .map(suggestion => {
//             const parts = suggestion.display_name.split(', '); // Split the response by commas

//             // Assuming the city name is always the first element in the parts array
//             const cityName = parts[0].trim(); // Get the first part as the city name

//             return { display_name: cityName }; // Return an object with city name
//           })
//           .filter(suggestion => 
//             suggestion.display_name.toLowerCase().includes(query.toLowerCase()) // Filter based on user input
//           );

//         setSuggestions(filteredSuggestions);
//       } else {
//         console.error("Unexpected response format:", data);
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error("Error fetching suggestions:", error.message);
//     }
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setFilter(value);
//     if (value) {
//       fetchSuggestions(value);
//     } else {
//       setSuggestions([]); // Clear suggestions if input is empty
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setFilter(suggestion.display_name); // Set the input value to the selected suggestion
//     setSuggestions([]); // Clear suggestions after selection
//   };

//   return (
//     <div className="search-bar">
//       <HiLocationMarker color="var(--blue)" size={25} />
//       <input 
//         placeholder="Search by city.." 
//         type="text" 
//         value={filter} 
//         onChange={handleChange}
//       />
//       <button className="button">Search</button>
//       {suggestions.length > 0 && (
//         <div className="suggestions">
//           {suggestions.map((suggestion, index) => (
//             <div 
//               key={index} 
//               className="suggestion-item" 
//               onClick={() => handleSuggestionClick(suggestion)} // Allow users to click a suggestion
//             >
//               {suggestion.display_name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;


//-------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { HiLocationMarker } from 'react-icons/hi';

// const SearchBar = ({ filter, setFilter }) => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [query, setQuery] = useState('');

//   // Debounce function to limit the rate of API calls
//   const debounce = (func, delay) => {
//     let timeoutId;
//     return (...args) => {
//       if (timeoutId) {
//         clearTimeout(timeoutId);
//       }
//       timeoutId = setTimeout(() => {
//         func(...args);
//       }, delay);
//     };
//   };

//   const fetchSuggestions = async (query) => {
//     try {
//       const response = await fetch(`https://api.locationiq.com/v1/autocomplete.php?key=pk.5a427daa355fc91e61bd412c29e409f3&q=${query}&countrycodes=IN&limit=5`);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
//       }

//       const data = await response.json();

//       console.log("API Response:", data); // Log the API response to debug

//       if (Array.isArray(data)) {
//         const filteredSuggestions = data
//           .map(suggestion => {
//             const parts = suggestion.display_name.split(', '); // Split the response by commas
//             const cityName = parts[0].trim(); // Get the first part as the city name
//             return { display_name: cityName }; // Return an object with city name
//           })
//           .filter(suggestion => 
//             suggestion.display_name.toLowerCase().includes(query.toLowerCase()) // Filter based on user input
//           );

//         setSuggestions(filteredSuggestions);
//       } else {
//         console.error("Unexpected response format:", data);
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error("Error fetching suggestions:", error.message);
//     }
//   };

//   const debouncedFetchSuggestions = debounce(fetchSuggestions, 300); // Adjust the delay as needed

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setFilter(value);
//     setQuery(value); // Store the current input value
//     if (value) {
//       debouncedFetchSuggestions(value); // Call the debounced function
//     } else {
//       setSuggestions([]); // Clear suggestions if input is empty
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setFilter(suggestion.display_name); // Set the input value to the selected suggestion
//     setSuggestions([]); // Clear suggestions after selection
//   };

//   return (
//     <div className="search-bar">
//       <HiLocationMarker color="var(--blue)" size={25} />
//       <input 
//         placeholder="Search by city.." 
//         type="text" 
//         value={filter} 
//         onChange={handleChange}
//       />
//       <button className="button">Search</button>
//       {suggestions.length > 0 && (
//         <div className="suggestions">
//           {suggestions.map((suggestion, index) => (
//             <div 
//               key={index} 
//               className="suggestion-item" 
//               onClick={() => handleSuggestionClick(suggestion)} // Allow users to click a suggestion
//             >
//               {suggestion.display_name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;


//------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { HiLocationMarker } from 'react-icons/hi';

const SearchBar = ({ filter, setFilter }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`https://api.locationiq.com/v1/autocomplete.php?key=pk.5a427daa355fc91e61bd412c29e409f3&q=${query}&countrycodes=IN&limit=5`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        const filteredSuggestions = data
          .map(suggestion => {
            const parts = suggestion.display_name.split(', ');
            const cityName = parts[0].trim();
            return { display_name: cityName };
          })
          .filter(suggestion => 
            suggestion.display_name.toLowerCase().includes(query.toLowerCase())
          );

        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error.message);
      setSuggestions([]); // Clear suggestions on error
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    setQuery(value);
    if (value) {
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFilter(suggestion.display_name);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input 
        placeholder="Search by city.." 
        type="text" 
        value={filter} 
        onChange={handleChange}
      />
      <button className="button">Search</button>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="suggestion-item" 
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
