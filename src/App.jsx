import { useState } from 'react';
import { saveAs } from 'file-saver';
import { generatePDF } from './pdfGenerator'; 
import "./App.css";
const App = () => {
  const [name, setName] = useState('');

  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => //RegEx expression for Capitalising First letter
      match.toUpperCase()
    );

  const submitHandler = async () => {
    const val = capitalize(name.trim());

    // Check if the text is empty or not
    if (val !== '') {
      try {
        const pdfBytes = await generatePDF(val);

        // Create a Blob object
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Save the file using file-saver library
        saveAs(blob, 'Certificate.pdf');

        console.log('Done creating');
      } catch (error) {
        // Handle the error as needed
        console.error('Error:', error);
      }
    } else {
      alert('Please enter a valid name.');
    }
  };

  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;


  return ( 
    <body
    id="main-body"
    className={`m-0 p-0 bg-cover`}
    style={{
    backgroundImage: prefersDarkMode ? 'url(/nightBG.jpg),linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4))' : 'url(/dayBG.jpg)linear-gradient,(rgba(0,0,0,0.4),rgba(0,0,0,0.4))',
    }}
    >
    <div className='flex flex-col items-center justify-center min-h-screen'>
       <div className="flex flex-col items-center justify-center m-auto">
          <label
             htmlFor="name"
             className={`h-16 w-50 p-2 font-serif font-bold text-2xl text-blue-700 dark:text-slate-50 rounded mb-4`}
             >
          Enter Name:
          </label>
          <input
             type="text"
             id="name"
             value={name}
             onChange={(e) => setName(e.target.value)}
          className='border-b-4 border-rose-600 placeholder-white text-white rounded w-80 px-3 mb-4 text-center bg-transparent'
          placeholder="Your Name for Certificate"
          autoComplete='off'
          />
          <button
             id="submitBtn"
             className='bg-blue-500 text-white px-4 py-2 rounded-lg'
             onClick={submitHandler}
             >
          Generate PDF
          </button>
       </div>
       <footer className="bg-gray-800 text-white p-4 mt-auto">
          <p className="text-center">Made with 💖 by Krishnanshu ©2023</p>
       </footer>
    </div>
    </body>

    
  );
};

export default App;
