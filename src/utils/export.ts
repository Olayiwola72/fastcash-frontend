import { ItemsDataRow, TableColumnDataRow } from '../components/ExportActions/interface';
import { jsPDF } from "jspdf";
import autoTable, { CellInput, RowInput } from 'jspdf-autotable'
import logoSrc from '../assets/logo512.png';

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
    const totalPagesExp = '{total_pages_count_string}'
    
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(20)

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

    autoTable(doc, {
      theme: 'striped',
      styles: {
        overflow: 'linebreak'
      },
      startY: 94,
      head: [headers],
      body: rows,
      willDrawPage: function (data) {
        // Header
        doc.setFontSize(15)
        doc.setTextColor(40)
        doc.addImage(logoSrc, 'PNG', data.settings.margin.left, 40, 40, 40)
        doc.text(title, data.settings.margin.left + 50, 65);
      },
      didDrawPage: function (data) {
        // Footer
        let str = 'Page ' + (doc as any).internal.getNumberOfPages()
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp
        }
        doc.setFontSize(10)
  
        // jsPDF 1.4+ uses getHeight, <1.4 uses .height
        let pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text(str, data.settings.margin.left, pageHeight - 10)
      },
      margin: { top: 30 },
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp)
    }

    doc.save(`${filename}.pdf`);
}