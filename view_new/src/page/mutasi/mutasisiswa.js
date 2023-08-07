import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import MutasiSiswaForm from 'src/components/formmain_mutasi/siswa';

const MutasiSiswaMain = () => {
    return(
        <CardMain 
            title="Mutasi Siswa"
            body={
               <MutasiSiswaForm />
            }
        />
    )
}

export default MutasiSiswaMain;