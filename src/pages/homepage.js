import React, { useState } from 'react';
import './Homepage.css';
import { Pie } from 'react-chartjs-2';

function Homepage() {

  //state for chart
  const [pieState, setPieState] = useState({
    labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F'
      ],
      data: [65, 59, 80, 81, 56]
    }
  ]
  });


  return (
    <div className="App">
      <header className="App-header">
      </header>

      {/* navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">

        {/* Add Home link to website name on navbar */}
        <a className="navbar-brand" href="index.html">Everbody Votes</a>

        {/* create navbar toggler icon for small screens */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            {/* create new list elements like this to add more links to navbar */}
            <li className="nav-item active">
              <a className="nav-link" href="index.html">test</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* chart test */}
      <div>
      <Pie
          data={pieState}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>


    </div>
  );
}

export default Homepage;
