import React from "react";
import { FilterComponentProps } from './interface';
import './style.scss';

const FilterComponent: React.FC<FilterComponentProps> = ({ filterText, filterKeyTitle, onFilter, onClear }) => {
  return (
    <div className="container filter-component py-2">
      <div className="row d-flex align-items-center">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <div className="input-group">
            <input 
              id="search"
              type="text"
              className="form-control"
              placeholder={`Filter By ${filterKeyTitle}`}
              aria-label="Search Input"
              value={filterText}
              onChange={onFilter}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={onClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
