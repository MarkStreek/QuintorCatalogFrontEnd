import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { updateDevice } from '../../../pages/updateDevice/UpdateDevice';

/**
 * DeviceModal is a component for editing and viewing device details in a modal.
 *
 * @param {Object} device - The device object to edit.
 * @param {boolean} isOpen - A boolean indicating whether the modal is open.
 * @param {Function} onClose - Function to call when closing the modal.
 * @param {Function} onSave - Function to call when saving the edited device.
 * @param setMessage - Function to set a message.
 * @param setIsError - Function to set an error.
 * @returns {JSX.Element|null} The DeviceModal component.
 */
const DeviceModal = ({ device, isOpen, onClose, onSave, setMessage, setIsError }) => {
    const [editedDevice, setEditedDevice] = useState(device);

    /**
     * useEffect hook to update the editedDevice state when the device prop changes.
     */
    useEffect(() => {
        setEditedDevice(device);
    }, [device]);

    /**
     * Handles input changes and updates the editedDevice state.
     * 
     * @param {Object} e - The event object from the input change.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedDevice({ ...editedDevice, [name]: value });
    };

    /**
     * Handles changes to the device specifications.
     * 
     * @param {number} index - The index of the specification being changed.
     * @param {Object} e - The event object from the input change.
     */
    const handleSpecChange = (index, e) => {
        const newSpecs = editedDevice.specs.map((spec, specIndex) => {
            if (index !== specIndex) return spec;
            return { ...spec, [e.target.name]: e.target.value };
        });
        setEditedDevice({ ...editedDevice, specs: newSpecs });
    };

    /**
     * Handles saving the edited device by calling the updateDevice function.
     * 
     * @async
     * @returns {Promise<void>}
     */
    const handleSave = async () => {
        try {
            await updateDevice(editedDevice, setMessage, setIsError); // Save the updated device
            onSave(editedDevice); // Call the onSave callback
            onClose(); // Close the modal
            // reload after 2 seconds
            setTimeout(() => {
                window.location.reload();
            } , 750);
        } catch (error) {
            console.error('Failed to save device:', error); // Log any errors
        }
    };

    // Return null if there's no device to edit
    if (!editedDevice) return null;

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-2">Edit Device Details</ModalHeader>
                    <ModalBody className="max-h-96 overflow-y-auto">
                        <Input
                            fullWidth
                            label="Type"
                            name="type"
                            value={editedDevice.type}
                            onChange={handleChange}
                        />
                        <Input
                            fullWidth
                            label="Brand Name"
                            name="brandName"
                            value={editedDevice.brandName}
                            onChange={handleChange}
                        />
                        <Input
                            fullWidth
                            label="Model"
                            name="model"
                            value={editedDevice.model}
                            onChange={handleChange}
                        />
                        <Input
                            fullWidth
                            label="Serial Number"
                            name="serialNumber"
                            value={editedDevice.serialNumber}
                            onChange={handleChange}
                        />
                        <Input
                            fullWidth
                            label="Invoice Number"
                            name="invoiceNumber"
                            value={editedDevice.invoiceNumber}
                            onChange={handleChange}
                        />
                        <Input
                            fullWidth
                            label="Location Name"
                            name="locationName"
                            value={editedDevice.locationName}
                            onChange={handleChange}
                        />
                        <Input
                            fullWidth
                            label="Location City"
                            name="locationCity"
                            value={editedDevice.locationCity}
                            onChange={handleChange}
                        />
                        <div>
                            <h4>Specifications</h4>
                            {editedDevice.specs && editedDevice.specs.map((spec, index) => (
                                <div key={index}>
                                    <Input
                                        fullWidth
                                        label="Specification Name"
                                        className="p-2"
                                        name="specName"
                                        value={spec.specName}
                                        onChange={(e) => handleSpecChange(index, e)}
                                    />
                                    <Input
                                        fullWidth
                                        label="Specification Value"
                                        className="p-2"
                                        name="value"
                                        value={spec.value}
                                        onChange={(e) => handleSpecChange(index, e)}
                                    />
                                </div>
                            ))}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={handleSave}>
                            Save
                        </Button>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};

export default DeviceModal;
