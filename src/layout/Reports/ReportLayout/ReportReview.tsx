import React, {useRef} from 'react';
import {ReportContent} from "../ReportContent/ReportContent.tsx";
import {useReactToPrint} from "react-to-print";
import './styles.css'
import {BsFiletypePdf} from "react-icons/bs";

interface ButtonCreatePDFProps{
    children: JSX.Element
}

const ButtonSavePDF: React.FC<ButtonCreatePDFProps> = ({ children }) => {
    const printRef = useRef<HTMLDivElement>(null);
    const print = useReactToPrint({
        content: () => printRef.current,
        onAfterPrint: () => window.close()
    });

    return (
        <div>
            <button className='button-save-pdf'>
                <div className='button-save-pdf-content' onClick={print}>
                    <BsFiletypePdf size={21}/>
                    <div className='button-save-pdf-text'>Baixar Relatório</div>
                </div>
            </button>
            <div ref={printRef}>{children}</div>
        </div>
    );
};

export const ReportReview: React.FC = () => {

    return (
        <div className='report-page'>
            <ButtonSavePDF>
                <ReportContent ReportData={{
                    dataStart: '01/06/2023',
                    dataEnd: '31/06/2023'
                               }}/>
            </ButtonSavePDF>
        </div>
    );
}
