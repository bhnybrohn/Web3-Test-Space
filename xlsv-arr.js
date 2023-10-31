const XLSX = require('xlsx');
const fs = require('fs');


function excelDateToJSDate(excelDate) {
    const MS_PER_DAY = 86400000; // Number of milliseconds in a day
    const EXCEL_DATE_OFFSET = 25569; // Excel date offset from January 1, 1970 (Unix time)
    // Convert the Excel date number to milliseconds
    const dateInMilliseconds = (excelDate - EXCEL_DATE_OFFSET) * MS_PER_DAY;
    // Create a new Date object with the calculat ed milliseconds
    const jsDate = new Date(dateInMilliseconds);
    return jsDate;
}

// Function to convert XLSX to an array of objects
function xlsxToArrayOfObjects(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);
    return data;
}

// Example usage
const filePath = './your_file.xlsx';
const sheetName = 'Sheet1'; // Replace with the name of your sheet
const arrayOfObjects = xlsxToArrayOfObjects(filePath, sheetName);
for (const item of arrayOfObjects) {
    if(item.date_joined && typeof(item.date_joined) === 'number'){
        item.date_joined = excelDateToJSDate(item.date_joined)
        
    }
    if(item.mobile){
        item.mobile = String(item.mobile)
    }

}
console.log(arrayOfObjects[241]);