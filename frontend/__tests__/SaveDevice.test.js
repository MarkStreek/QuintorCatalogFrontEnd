import { translateKeys, translationMap } from '../src/pages/addDevice/SaveDevice.js';

describe('translateKeys', () => {
    it('translates keys correctly', () => {
        const mockObj = {
            Type: "Laptop",
            Merknaam: "Apple",
            Model: "Macbook Pro",
            Serienummer: "123456",
            Factuurnummer: "78910",
            LocatieNaam: "Office",
            LocatieStad: "Amsterdam",
            LocatieAdres: "Street 1",
            specificaties: "16GB RAM"
        };

        const expectedObj = {
            type: "Laptop",
            brandName: "Apple",
            model: "Macbook Pro",
            serialNumber: "123456",
            invoiceNumber: "78910",
            locationName: "Office",
            locationCity: "Amsterdam",
            locationAddress: "Street 1",
            specs: "16GB RAM"
        };

        expect(translateKeys(mockObj, translationMap)).toEqual(expectedObj);
    });
});