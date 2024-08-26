import React, { useMemo } from 'react';
import { ExportActionsProps } from './interface';
import { downloadCSV, exportPDF } from '../../utils/export';

const ExportActions: React.FC<ExportActionsProps> = ({ columns, filteredItems, userData, title, fileMarker }) => {

  const filename = userData?.email + '_'+ fileMarker;

  const actionsMemo = useMemo(() => (
      <>
        {filteredItems.length > 0 && (
            <>
                <button type="button" className="btn" onClick={() => downloadCSV(columns, filteredItems, filename)}>
                    <i className="fa fa-file-excel-o" style={{ fontSize: '30px', color: 'green' }}></i>
                </button>
                <button type="button" className="btn" onClick={() => exportPDF(columns, filteredItems, filename, title)}>
                    <i className="fa fa-file-pdf-o" style={{ fontSize: '30px', color: 'red' }}></i>
                </button>
            </>
        )}
      </>
  ), [filteredItems, columns]);

  return actionsMemo;
};

export default ExportActions;
