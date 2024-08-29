// src/pages/MaeGeul.tsx
import React from 'react';
import Header from '../../components/Header';
import Diag from '../MaeGeul/Diag';
import WritingGuide from '../../components/WritingGuide';

const MaeGeul: React.FC = () => {
    return (
        <>
            <Header />
            <WritingGuide />
            <Diag />
        </>
    );
}

export default MaeGeul;
