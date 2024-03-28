import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

export default function FormComponent() {
  // State variables
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [componentData, setComponentData] = useState({
    // Initial state for component data
    name: "",
    brandName: "",
    model: "",
    serialNumber: "",
    invoiceNumber: "",
    locationCity: "",
    locationAddress: "",
    locationName: "",
    specs: [], // Initially empty, will be populated with fetched specs
  });
  const [newSpec, setNewSpec] = useState({ name: "", value: "", datatype: "" });
  const [addingSpec, setAddingSpec] = useState(false);
  const [specsVisible, setSpecsVisible] = useState(false);

  useEffect(() => {
    // Fetch specs data from the server
    async function fetchSpecs() {
      try {
        const response = await fetch("http://localhost:8080/specs");
        if (!response.ok) {
          throw new Error("Failed to fetch specs");
        }
        const specsData = await response.json();
        // Update componentData with fetched specs
        setComponentData((prevData) => ({
          ...prevData,
          // Map each spec from specData to an object with name and value fields
          specs: specsData.map((spec) => ({
            name: spec.name,
            value: "",
          })),
        }));
      } catch (error) {
        console.error("Error fetching specs:", error);
      }
    }
    fetchSpecs();
  }, []);

  // Event handlers
  const handleSpecChange = (e) => {
    // Update newSpec state when a spec input changes
    const { name, value } = e.target;
    setNewSpec((prevSpec) => ({
      ...prevSpec,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    // Update componentData state when a non-spec input changes
    const { name, value } = e.target;
    setComponentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSpec = () => {
    // Add a new spec to the specs array in componentData
    setComponentData((prevData) => ({
      ...prevData,
      // Add newSpec to the specs array  
      specs: [...prevData.specs, { ...newSpec }],
    }));
    // Reset newSpec fields and collapse the add spec section
    setNewSpec({ name: "", value: "", datatype: "" });
    setAddingSpec(false);
  };

  const handleSubmit = async () => {
    // Prepare specs data to be sent to the server
    const specsToSend = componentData.specs.map((spec) => ({
      specName: spec.name,
      value: spec.value,
      datatype: spec.datatype,
    }));

    try {
      // Send componentData to the server
      const response = await fetch("http://localhost:8080/components", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send componentData alongside the specs data as a JSON string
        body: JSON.stringify({
          ...componentData,
          specs: specsToSend,
        }),
      });

      if (response.ok) {
        // Show success message and close the modal
        alert("Component added successfully!");
        onClose();
      } else {
        // Show error message if failed to add component
        alert("Failed to add component");
      }
    } catch (error) {
      // Log and show error message if an error occurs
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

return (
    <>
        <Button onPress={onOpen} color="primary">
            Add Device
        </Button>
        <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        placement="top-center"
        scrollBehavior={scrollBehavior}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Add Device
                </ModalHeader>
                <ModalBody>
                    <Input
                        clearable
                        bordered
                        label="Name"
                        name="name"
                        value={componentData.name}
                        onChange={handleChange}
                    />
                    <Input
                        clearable
                        bordered
                        label="Brand Name"
                        name="brandName"
                        value={componentData.brandName}
                        onChange={handleChange}
                    />
                    <Input
                        clearable
                        bordered
                        label="Model"
                        name="model"
                        value={componentData.model}
                        onChange={handleChange}
                    />
                    <Input
                        clearable
                        bordered
                        label="Serial Number"
                        name="serialNumber"
                        value={componentData.serialNumber}
                        onChange={handleChange}
                    />
                    <Input
                        clearable
                        bordered
                        label="Invoice Number"
                        name="invoiceNumber"
                        value={componentData.invoiceNumber}
                        onChange={handleChange}
                    />
                    <Input
                        clearable
                        bordered
                        label="Location City"
                        name="locationCity"
n                        value={componentData.locationCity}
                        onChange={handleChange}
                    />
                    <Input
                        clearable
                        bordered
                        label="Location Address"
                        name="locationAddress"
                        value={componentData.locationAddress}
                        onChange={handleChange}
                    />
                    <Input
                        clearable
                        bordered
                        label="Location Name"
                        name="locationName"
                        value={componentData.locationName}
                        onChange={handleChange}
                    />

                    <div>
                        <Button
                            auto
                            onClick={() => setSpecsVisible(!specsVisible)}
                            style={{ marginBottom: "10px" }}
                        >
                            {specsVisible ? "Hide Specs" : "Show Specs"}
                        </Button>
                        {specsVisible && (
                            <div>
                                <h3>Existing Specs</h3>
                                {componentData.specs.map((spec, index) => (
                                    <div key={index} style={{ marginBottom: "10px" }}>
                                        <p style={{ marginRight: "10px" }}>{spec.name}</p>
                                        <Input
                                            clearable
                                            bordered
                                            label="Value"
                                            name={`specs[${index}].value`}
                                            value={spec.value}
                                            onChange={(e) =>
                                                setComponentData((prevData) => ({
                                                    ...prevData,
                                                    specs: prevData.specs.map((s, i) =>
                                                        i === index
                                                            ? { ...s, value: e.target.value }
                                                            : s
                                                    ),
                                                }))
                                            }
                                        />
                                    </div>
                                ))}
                                <div>
                                    <Button
                                        auto
                                        onClick={() => setAddingSpec(!addingSpec)}
                                        style={{ marginBottom: "10px" }}
                                    >
                                        {addingSpec ? "Hide Add Spec" : "Add New Spec"}
                                    </Button>
                                    {addingSpec && (
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <Input
                                                clearable
                                                bordered
                                                label="Spec Name"
                                                name="name"
                                                value={newSpec.name}
                                                onChange={handleSpecChange}
                                                style={{ marginBottom: "10px" }}
                                            />
                                            <Input
                                                clearable
                                                bordered
                                                label="Value"
                                                name="value"
                                                value={newSpec.value}
                                                onChange={handleSpecChange}
                                                style={{ marginBottom: "10px" }}
                                            />
                                            <Input
                                                clearable
                                                bordered
                                                label="Datatype"
                                                name="datatype"
                                                value={newSpec.datatype}
                                                onChange={handleSpecChange}
                                                style={{ marginBottom: "10px" }}
                                            />
                                            <Button auto onClick={handleAddSpec}>
                                                Add Spec
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button auto flat color="error" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button auto onPress={handleSubmit}>
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
);
}
