import React, { useCallback, useMemo, useState, useRef } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './style.css';
import { getData } from './data';

const App = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '1200px', width: '100%' }), []);
  const data = useMemo(() => getData(), []);
  const [rowData] = useState(data, []);

  function actions(params) {
    return (
      <span className="my-renderer">
        ...
        {params.value}
      </span>
    );
  }

  const PSI = (p) => {
    return (
      <>
        <input type="text" class="shortfield" />
        {p.value}
      </>
    );
  };

  const Tread = (p) => {
    return (
      <>
        <input type="text" class="shortfield" />
        {p.value}
        <input type="radio" name={p.value} class="red one" value="1" />
        <input type="radio" name={p.value} class="red two" value="2" />
        <input type="radio" name={p.value} class="red three" value="3" />
        <input type="radio" name={p.value} class="yellow four" value="4" />
        <input type="radio" name={p.value} class="yellow five" value="5" />
        <input type="radio" name={p.value} class="yellow six" value="6" />
        <input type="radio" name={p.value} class="yellow seven" value="7" />
        <input type="radio" name={p.value} class="yellow eight" value="8" />
        <input type="radio" name={p.value} class="green nine" value="9" />
        <input type="radio" name={p.value} class="green ten" value="10" />
        <input type="radio" name={p.value} class="green eleven" value="11" />
        <input type="radio" name={p.value} class="green twelve" value="2" />
      </>
    );
  };

  const Breaks = (p) => {
    return (
      <>
        <input type="text" name={p.value} class="shortfield" />
        {p.value}
        <input type="radio" name={p.value} class="red one" value="1" />
        <input type="radio" name={p.value} class="red two" value="2" />
        <input type="radio" name={p.value} class="red three" value="3" />
        <input type="radio" name={p.value} class="yellow four" value="4" />
        <input type="radio" name={p.value} class="yellow five" value="5" />
        <input type="radio" name={p.value} class="yellow six" value="6" />
        <input type="radio" name={p.value} class="green seven" value="7" />
        <input type="radio" name={p.value} class="green eight" value="8" />
        <input type="radio" name={p.value} class="green nine" value="9" />
      </>
    );
  };

  function inspectionLine(params) {
    return <span className="inspectionLine">{params.value}</span>;
  }

  function checkboxes(params) {
    return (
      <span className="results">
        <input type="radio" name={params.value} class="green" />
        <input type="radio" name={params.value} class="yellow" />
        <input type="radio" name={params.value} class="red" />
      </span>
    );
  }

  const createColDefs = () => {
    return [
      {
        field: 'ID',
        headerName: '',
        maxWidth: 74,
        minWidth: 74,
        cellRenderer: checkboxes,
        filter: false,
        suppressMenu: true,
        sortable: false,
        lockVisible: true,
        pinned: 'left',
        lockPinned: true,
        suppressMenu: true,
        cellStyle: {
          padding: '0',
        },
      },
      {
        field: 'Category',
        filter: 'agSetColumnFilter',
        rowGroup: true,
        hide: true,
        suppressMenu: true,
      },
      {
        field: 'InspectionLine',
        filter: 'agSetColumnFilter',
        wrapText: true,
        autoHeight: true,
        suppressMenu: true,
        sortable: false,
        resizable: false,
        cellRenderer: inspectionLine,
        cellRendererSelector: (p) => {
          var check = p.value.includes('Tire');
          if (p.value.includes('Tread depth')) {
            return { component: Tread };
          }
          if (p.value.includes('PSI')) {
            return { component: PSI };
          }
          if (p.value.includes('mm')) {
            return { component: Breaks };
          }
        },
      },

      {
        field: 'Actions',
        headerName: '',
        maxWidth: 52,
        minWidth: 52,
        pinned: 'right',
        lockPinned: true,
        cellRenderer: actions,
        cellStyle: {
          textAlign: 'center',
          color: '#2B6BDD',
          fontSize: '20px',
          cellPadding: '0',
        },
        filter: false,
        suppressMenu: true,
        sortable: false,
        lockVisible: true,
      },
    ];
  };

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    filter: false,
    resizable: true,
    sortable: true,
    enableValue: false,
    enableRowGroup: true,
    enablePivot: true,
  };

  const gridOptions = {
    defaultColDef: defaultColDef,
    animateRows: true,
    groupRowsSticky: true,
    autoGroupColumnDef: {
      cellRendererPerams: {
        suppressCount: true,
      },
    },
  };

  const [columnDefs, setColumnDefs] = useState(createColDefs());

  // --- Quick Filter

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div>
          <div className="button-group">
            <span>Inspection Form in AG Grid</span>
            {/* <input
              type="text"
              id="filter-text-box"
              placeholder="Search for line"
              onInput={onFilterTextBoxChanged}
            /> */}
          </div>
        </div>

        <div className="ag-theme-alpine" style={gridStyle}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            groupDefaultExpanded={1}
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            defaultColDef={defaultColDef}
            enableRangeSelection={true}
            groupDisplayType={'groupRows'}
            enableRangeSelection={true}
            headerHeight={0}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
