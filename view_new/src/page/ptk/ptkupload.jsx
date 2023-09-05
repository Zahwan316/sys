import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import PtkUpload from 'src/components/formmain_ptk/upload';

const PtkUploadMain = () => {
    return(
        <>
            <CardMain
                title="Upload PTK"
                body={
                    <>
                        <PtkUpload 
                        
                        />
                    </>
                }
            />
        </>
    )
}
export default PtkUploadMain