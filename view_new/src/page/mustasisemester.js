import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import MutasiSemesterForm from 'src/components/formmain_mutasi/semester';


const MutasiSemesterMain = () => {
    return(
        <CardMain
            title="Mutasi Semester"
            body={
                <MutasiSemesterForm />
            }
        />
    )
}

export default MutasiSemesterMain;