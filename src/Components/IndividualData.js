import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.Number}</th>
            <th>{individualExcelData.StudentID}</th>
            <th>{individualExcelData.FirstName}</th>
            <th>{individualExcelData.MiddleName}</th>
            <th>{individualExcelData.LastName}</th>
            <th>{individualExcelData.Gender}</th>
            <th>{individualExcelData.EmailID}</th>
            <th>{individualExcelData.Address}</th>
            <th>{individualExcelData.CompanyName}</th>
            <th>{individualExcelData.CompanyAdd}</th>
            <th>{individualExcelData.Profile}</th>
            <th>{individualExcelData.Package}</th>
        </>
    )
}
