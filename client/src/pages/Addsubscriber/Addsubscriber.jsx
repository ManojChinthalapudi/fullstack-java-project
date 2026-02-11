// import React, { useState } from 'react';
// import './Addsubscriber.css';

// const Addsubscriber = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');

//   const handleCreateUser = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await fetch("http://localhost:8000/api/user/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//         setEmail('');
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Error creating user:", error);
//       alert("An error occurred while creating the user.");
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   return (
//     <div className="add-subscriber-container">
//       <h1>Add Subscriber</h1>
//       <form onSubmit={handleCreateUser}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter email"
//           className="input-field"
//           required
//         />
//         <button type="submit" className="submit-button">Add Subscriber</button>
//       </form>
//       {error && <div className="error">{error}</div>}
//     </div>
//   );
// };

// export default Addsubscriber;
import React, { useState } from 'react';
//import './Addsubscriber.css';

const Addsubscriber = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors

    try {
      const response = await fetch("http://localhost:8000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setEmail(''); // Clear input on successful creation
      } else {
        setError(data.message || "Failed to create subscriber"); // Set error if not ok
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setError("An error occurred while creating the user."); // Display network error
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className='wrapper'>
    <div className="add-subscriber-container">
      <h1>Add Subscriber</h1>
      <form onSubmit={handleCreateUser}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="input-field"
          required
        />
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Subscriber'}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
    </div>
  );
};

export default Addsubscriber;

