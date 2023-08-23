import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import MutasiRombelForm from 'src/components/formmain_mutasi/rombel';

const MutasiRombelMain = () => {
    return(
        <CardMain 
            title="Mutasi Rombel"
            body={
            <MutasiRombelForm />
        }  
        />
    )
}

export default MutasiRombelMain;