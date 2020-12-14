import React, {Fragment} from 'react';
import spinner from '../photo/spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner}
            style={{width: '600px',height:'600px', margin:'auto', display:'block'}}
             alt="Loading..."/>
            
        </Fragment>
    )
}

export default Spinner;
