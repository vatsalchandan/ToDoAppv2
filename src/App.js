import React from 'react';
import './App.css';
import Lists from './components/Lists/Lists';
import Tasks from './components/Tasks/tasks';

function App() {
  return (
    <div className="App">
      <Lists/>
      <Tasks/>
    </div>
  );
}

export default App;
