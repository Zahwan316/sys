import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import TugasPage from 'src/components/formmain_kurikulum/program/tugas';


const TugasMain = () => {
    return(
        <CardMain 
            title="Tugas Mengajar"
            body={
                <TugasPage />
            }
        
        />
    )
}

export default TugasMain;