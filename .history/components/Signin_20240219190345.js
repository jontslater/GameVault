import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Right This way</h1>
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Click me!
      </Button>
    </div>
  );
}

export default Signin;
