import React from 'react';
import { Modal } from 'react-bootstrap';
import { MyModalDispatchProps, MyModalOwnProps, MyModalProps, MyModalStateProps } from './interface';
import { selectShowModal } from '../../redux/user/user.selectors';
import { RootState } from '../../redux/store';
import { createStructuredSelector } from 'reselect'
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { manageOverdraftStart, removeShowModal, disableUserStart } from '../../redux/user/user.actions';
import { Dispatch } from 'redux';
import { ManageOverdraftRequest } from '../AccountFeatures/interface';

const MyModal : React.FC<MyModalProps> = ({ children, showModal, removeShowModal, currentAccount, manageOverdraftStart, userData, disableUserStart }) => {
    const handleProceed = () => {
        if(currentAccount){
            manageOverdraftStart(currentAccount?.accountNumber, { allowOverdraft : !currentAccount.allowOverdraft });
        }
        
        userData && disableUserStart(userData.id);
        
        removeShowModal();
    }

    return (
        <>
            <Modal show={showModal} onHide={removeShowModal} backdrop="static" keyboard={false}>
                <div className="modal-content rounded-3 shadow">
                    <Modal.Body className='p-4 text-center'>
                        {children}
                    </Modal.Body>
                    <Modal.Footer className='flex-nowrap p-0'>
                        <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end" onClick={handleProceed}><strong>Yes</strong></button>
                        <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0" data-bs-dismiss="modal" onClick={removeShowModal}>Close</button>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
}

const mapStateToProps: MapStateToProps<MyModalStateProps, MyModalOwnProps, RootState> = createStructuredSelector({
    showModal: selectShowModal,
});

const mapDispatchToProps : MapDispatchToPropsFunction<MyModalDispatchProps, MyModalOwnProps> = (dispatch: Dispatch) => ({
    removeShowModal: () => dispatch(removeShowModal()),
    manageOverdraftStart : (id: number, payload : ManageOverdraftRequest) => dispatch(manageOverdraftStart(id, payload)),
    disableUserStart : (id: number) => dispatch(disableUserStart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyModal);