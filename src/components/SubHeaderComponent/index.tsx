import React, { useMemo } from 'react';
import FilterComponent from "../FilterComponent";
import { SubHeaderComponentProps } from './interface';

const SubHeaderComponent: React.FC<SubHeaderComponentProps> = ({
    accounts,
    filterText,
    filterAccount,
    setFilterText,
    setFilterAccount,
    resetPaginationToggle,
    setResetPaginationToggle
}) => {
    
    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
          }
        };

        const handleClearAccount = () => {
          if (filterAccount) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterAccount(undefined);
          }
        };

        return (
            <React.Fragment>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" 
                      className={`btn btn-outline-primary ${filterAccount === undefined ? 'active' : ''}`}
                      onClick={() => handleClearAccount()}
                    >
                        All
                    </button>

                    {accounts.map((account) => (
                      <button 
                          key={account.accountNumber}
                          type="button" 
                          className={`btn btn-outline-primary ${filterAccount?.accountNumber === account.accountNumber ? 'active' : ''}`}
                          onClick={() => setFilterAccount(account)}
                      >
                          {account.accountNumber} {account.currency}
                      </button>
                    ))}
                </div>

                <FilterComponent
                  filterKeyTitle="Narration"
                  onFilter={e => setFilterText(e.target.value)} 
                  onClear={handleClear} 
                  filterText={filterText} 
                />
            </React.Fragment>
        );
    }, [accounts, filterAccount, filterText, resetPaginationToggle]);

    return subHeaderComponent;
};

export default SubHeaderComponent;