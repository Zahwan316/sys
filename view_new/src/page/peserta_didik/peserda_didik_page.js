import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import UploadPesertaDidik from 'src/components/formmain_pd/upload';

const PesertaDidikPage = () => {
    return(
        <CardMain 
            title="Peserta Didik"
            body={
                <UploadPesertaDidik />
            }
        />
    )
}

export default PesertaDidikPage;