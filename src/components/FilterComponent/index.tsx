import React from "react";
import { FilterComponentProps } from './interface';
import './style.scss';

const FilterComponent : React.FC<FilterComponentProps> = ({ filterText, filterKeyTitle, onFilter, onClear}) => {
  return (
    <div className="container filter-component">
        <div className="row d-flex align-items-center">
            <div className="col-md-3">
                <div className="form">
                  <input 
                      id="search"
                      type="text"
                      className="form-control form-input"
                      placeholder={`Filter By ${filterKeyTitle}`}
                      aria-label="Search Input"
                      value={filterText}
                      onChange={onFilter}
                  />
                  <span className="left-pan" onClick={onClear}>
                    X
                  </span>
                </div>           
            </div>        
        </div>    
    </div>
  ); 
}

export default (FilterComponent);
