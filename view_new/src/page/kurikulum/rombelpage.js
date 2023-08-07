import React, { useState, useEffect } from 'react';
import RombelPage from 'src/components/formmain_kurikulum/program/rombel';
import CardMain from 'src/components/card/card';

const RombelMain = () => {
    return(
        <CardMain 
            body={
                <RombelPage />
            }
            title="Rombongan Belajar"
        />
    )
}

export default RombelMain