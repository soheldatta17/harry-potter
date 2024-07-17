import React from 'react';
import Characters from './Characters';

const App = () => {
  return (
    <div style={{ backgroundColor: '#1A1A1A', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ textAlign: 'center', padding: '20px', color: '#fff', fontFamily: 'Georgia, serif' }}>Harry Potter Characters</h1>
      <Characters />
    </div>
  );
};

export default App;
