import { React } from 'react';
import DataNull from '../../components/dataNull/dataNull';

function Lost(props) {
  return (
      <div>
        <DataNull reason="404! Not Found!" tip="Looks like you are lost"/>
        <p>
            Click <span>here</span> to go to home page.
        </p>
      </div>
  );
}

export default Lost;
