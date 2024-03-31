import {useState} from 'react'
import {Data} from './Components/Data'
import * as XLSX from 'xlsx'

function App() {
  
  // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
 
  // submit
  const [excelData, setExcelData]=useState(null);
  // it will contain array of objects
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  // handle File
  
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      // console.log(selectedFile.type);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFile(e.target.result);
        } 
      }
      else{
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('plz select your file');
    }
  }

  // submit function
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const expectedColumns = [
        'Number', 'StudentID', 'FirstName', 'MiddleName', 'LastName',
        'Gender', 'EmailID', 'Address', 'CompanyName', 'CompanyAdd',
        'Profile', 'Package'
      ];
  
      // Get the column names from the first row of the worksheet
      const columnsInFile = Object.keys(data[0]);
  
      // Check if all expected columns are present in the file
      const missingColumns = expectedColumns.filter(col => !columnsInFile.includes(col));
  
      if (missingColumns.length > 0) {
        // Display error message if any expected columns are missing
        const errorMessage = `The following columns are missing in the file: ${missingColumns.join(', ')}. Please correct your Excel file.`;
        setExcelData(null);
        setExcelFileError(errorMessage);
      } else {
        // Proceed with setting the Excel data
        setExcelData(data);
        setExcelFileError(null);
      }
    } else {
      setExcelData(null);
      setExcelFileError('Please select an Excel file.');
    }
  }
  
  return (
    <div className="container">

      {/* upload file section */}
      <div className='form'>
        <form className='form-group' autoComplete="off"
        onSubmit={handleSubmit}>
          <label><h5>Upload Excel file</h5></label>
          <br></br>
          <input type='file' className='form-control'
          onChange={handleFile} required></input>                  
          {excelFileError&&<div className='text-danger'
          style={{marginTop:5+'px'}}>{excelFileError}</div>}
          <button type='submit' className='btn btn-success'
          style={{marginTop:5+'px'}}>Submit</button>
        </form>
      </div>

      <br></br>
      <hr></hr>

      {/* view file section */}
      <h5>View Excel file</h5>
      <div className='viewer'>
        {excelData===null&&<>No file selected</>}
        {excelData!==null&&(
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Number</th>
                  <th scope='col'>StudentID</th>
                  <th scope='col'>FirstName</th>
                  <th scope='col'>MiddleName</th>
                  <th scope='col'>LastName</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>EmailID</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>CompanyName</th>
                  <th scope='col'>CompanyAdd</th>  
                  <th scope='col'>Profile</th>
                  <th scope='col'>Package</th>                 
                </tr>
              </thead>
              <tbody>
                <Data excelData={excelData}/>
              </tbody>
            </table>            
          </div>
        )}       
      </div>

    </div>
  );
}

export default App;