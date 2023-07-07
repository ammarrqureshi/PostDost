import React, { useRef } from 'react';
import Backdrop from '../../../UI/Backdrop';
import Button from './../../../UI/Button';
import styles from './../Influencer.module.css';

function BuyPostForm1(props){
    const addFileRef=useRef();
    function formSubmitHandler(e){
        e.preventDefault();
        const uploadedFile= addFileRef.current.files[0];
        if (uploadedFile) {
            props.formIndex(1);
            props.form1Data(uploadedFile);
          }
    }

    return(
        <Backdrop>
            <form onSubmit={formSubmitHandler} className={styles.buyPostForm1}>
             <div className={styles.buyFormHeading}>
             <h1>Add Your File</h1>
             <span onClick={props.onCancel}>&times;</span>
             </div>
             
             
             <div className={styles.addImageFile}>
              <label>Select your file</label>
              <input type="file" accept="image/*, video/*" ref={addFileRef}/>
             </div>
        
             <Button>Next</Button>
             
            </form>
        </Backdrop>
        
    )
}

export default BuyPostForm1;