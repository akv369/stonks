import { React } from 'react';
import './dataNull.css';

function DataNull(props) {
  return (
    <div className="dataNull">
      <h1>{props.reason}</h1>
      <h2>{props.tip}</h2>
    </div>
  );
}

export default DataNull;
