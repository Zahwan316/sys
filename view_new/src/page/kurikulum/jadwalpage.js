import React, { useState, useEffect } from 'react';
import CardMain from 'src/components/card/card';
import JadwalPage from 'src/components/formmain_kurikulum/program/jadwal';
import { useNavigate, useParams } from 'react-router-dom';

const JadwalMain = () => {
    const id = useParams()

    return(
        <div>
            <CardMain
                body={
                    <JadwalPage />
                }
                title="Jadwal"
            />
        </div>
    )
}

export default JadwalMain