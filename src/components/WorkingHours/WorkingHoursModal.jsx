import React from 'react'
import Modal from 'react-modal'
function WorkingHoursModal({visibleModal}) {
    return (
        <div>
            <Modal
                isOpen = {visibleModal}
                onRequestClose = {!visibleModal}
            >
                <h1>Hello world</h1>
            </Modal>
        </div>
    )
}

export default WorkingHoursModal
