//Client2/src/components/Guide.tsx
import React from 'react';
import GuideImageSrc from '../Image/스크린샷 2024-08-26 143816.png'; 

const Guide: React.FC = () => {
    return (
        <div className="relative w-full h-full flex justify-center items-center">
            <img src={GuideImageSrc} alt="Guide" className="max-w-full max-h-full object-cover" />
        </div>
    );
};

export default Guide;
