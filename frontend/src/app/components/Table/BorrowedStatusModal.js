import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { format } from 'date-fns';

/**
 * BorrowedStatusModal is a component that displays details of a borrowed status.
 * 
 * @param {boolean} isOpen - Whether the modal is open.
 * @param {function} onClose - Function to close the modal.
 * @param {object} status - The borrowed status object to display.
 * @param {function} onApprove - Function to call when the request is approved.
 * @param {function} onReject - Function to call when the request is rejected.
 * @returns {JSX.Element|null} The BorrowedStatusModal component.
 */
const BorrowedStatusModal = ({ isOpen, onClose, status, onApprove, onReject }) => {
    if (!status) return null;

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">Verzoek Details</ModalHeader>
                    <ModalBody className="max-h-96 overflow-y-auto">
                        <p><strong>Naam:</strong> {status.user.name}</p>
                        <p><strong>Email:</strong> {status.user.email}</p>
                        <hr />
                        <p><strong>Apparaat:</strong> {status.device.type} {status.device.brandName} {status.device.model}</p>
                        <p><strong>Serienummer:</strong> {status.device.serialNumber}</p>
                        <p><strong>Factuurnummer:</strong> {status.device.invoiceNumber}</p>
                        <p><strong>Locatie:</strong> {status.device.location.name}, {status.device.location.city}</p>
                        <hr />
                        <p><strong>Status:</strong> {status.status}</p>
                        <p><strong>Datum Uitgeleend:</strong> {format(new Date(status.borrowDate), 'dd-MM-yyyy')}</p>
                        <p><strong>Omschrijving:</strong> Dit is een voorbeeld beschrijving.</p>
                    </ModalBody>
                    <ModalFooter>
                        {status.status === 'Wachten op goedkeuring' && (
                            <>
                                <Button color="success" onPress={() => onApprove(status.id)}>
                                    Goedkeuren
                                </Button>
                                <Button color="error" onPress={() => onReject(status.id)}>
                                    Afwijzen
                                </Button>
                            </>
                        )}
                        <Button auto flat color="error" onPress={onClose}>
                            Sluiten
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};

export default BorrowedStatusModal;
