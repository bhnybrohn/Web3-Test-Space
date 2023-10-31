const fs = require('fs');
const ExcelJS = require('exceljs');


function downloadExcelFile(dataArray) {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add headers to the worksheet
    const headers = Object.keys(dataArray[0]);
    worksheet.addRow(headers);

    // Add data to the worksheet
    dataArray.forEach((data) => {
        const rowData = headers.map((header) => data[header]);
        worksheet.addRow(rowData);
    });

    // Save the workbook as a file
    const filename = 'data.xlsx';
    workbook.xlsx.writeFile(filename)
    .then(() => {
        console.log('Excel file created successfully!');
        // Download the file
        const fileContents = fs.readFileSync(filename);
//        fs.unlinkSync(filename); // Delete the file after reading its contents
        console.log(filename,
                    fileContents)
        return {
            filename,
            fileContents,
        };
    })
    .catch((error) => {
        console.error('Error creating the Excel file:', error);
        throw error;
    });
}

// Example usage:
const dataArray = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 28, email: 'jane@example.com' },
    // Add more objects as needed
];

console.log(downloadExcelFile(dataArray))
