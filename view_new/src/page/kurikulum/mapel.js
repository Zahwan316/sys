import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import MapelForm from 'src/components/formmain_kurikulum/program/mapel';

const MapelPage = () => {
    return(
        <CardMain 
            title="Mata Pelajaran"
            body={
                <MapelForm />
            }
        />
    )
}

export default MapelPage