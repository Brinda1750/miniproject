import React from 'react'
import { IndividualData } from './IndividualData'

export const Data = ({excelData}) => {
    return excelData.map((individualExcelData)=>(
        <tr key={individualExcelData.StudentID}>
            <IndividualData individualExcelData={individualExcelData}/>
        </tr>        
    ))
}
