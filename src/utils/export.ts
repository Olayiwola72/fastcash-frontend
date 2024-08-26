import { ItemsDataRow, TableColumnDataRow } from '../components/ExportActions/interface';
import { jsPDF } from "jspdf";
import autoTable, { CellInput, RowInput } from 'jspdf-autotable'

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
export const convertArrayOfObjectsToCSV = (columns: TableColumnDataRow, data: ItemsDataRow): string => {
    if (data.length === 0) return '';

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const headers = columns.map(column => column.name);
    
    let result = '';
    result += headers.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(item => {
        let rowString = '';

        columns.forEach((column, index) => {
            if (index > 0) rowString += columnDelimiter;

            const cellValue = column.selector ? column.selector(item as any) : '';
            
            // Enclose in double quotes if value contains comma
            const value = cellValue != null ? cellValue.toString() : '';
            const escapedValue = value.includes(columnDelimiter) ? `"${value}"` : value;

            rowString += escapedValue;
        });

        result += rowString + lineDelimiter;
    });

    return result;
};

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
export const downloadCSV = (columns: TableColumnDataRow, data : ItemsDataRow, filename : string) => {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(columns, data);
    if (csv == null) return;

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename+'.csv');
    link.click();
}

export const exportPDF = (columns: TableColumnDataRow, data : ItemsDataRow, filename: string, title: string) => {
    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape 
    const marginLeft = 40;
    
    const doc = new jsPDF(orientation, unit, size);   
    doc.setFontSize(15);

    const headers = columns.map(column => column.name) as RowInput;       
    let rows : RowInput[] = [];

    data.forEach(item => {
      let row : CellInput = [];

      columns.forEach((column) => {
        const cellValue = column.selector ? column.selector(item as any) : '';
        row.push(cellValue as string);
      });

      rows.push(row);
    });

    doc.text(title, marginLeft, 40);

      autoTable(doc, {
        theme: 'striped',
        styles: {
          overflow: 'linebreak'
        },
        startY: 50,
        head: [headers],
        body: rows
    });

    doc.save(filename+".pdf");
}