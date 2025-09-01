import React from 'react';
import Dialog from '../../../components/Dialog';

interface AddItemDialogProps {
  open: boolean;
  onClose: () => void;
  category: string;
  setCategory: (v: string) => void;
  itemValue: string;
  setItemValue: (v: string) => void;
  vendorContact: string;
  setVendorContact: (v: string) => void;
  vendorAddress: string;
  setVendorAddress: (v: string) => void;
  brandCode: string;
  setBrandCode: (v: string) => void;
  brandCountry: string;
  setBrandCountry: (v: string) => void;
  onSave: () => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({
  open,
  onClose,
  category,
  setCategory,
  itemValue,
  setItemValue,
  vendorContact,
  setVendorContact,
  vendorAddress,
  setVendorAddress,
  brandCode,
  setBrandCode,
  brandCountry,
  setBrandCountry,
  onSave
}) => (
  <Dialog open={open} title="Add New Item" onClose={onClose}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 260 }}>
      <label>
        Category
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
        >
          <option value="">Select category</option>
          <option value="materialType">Material Type</option>
          <option value="materialColor">Material Color</option>
          <option value="vendor">Vendor</option>
          <option value="brand">Brand</option>
        </select>
      </label>
      <label>
        Name
        <input
          type="text"
          value={itemValue}
          onChange={e => setItemValue(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
          placeholder={'Enter name'}
        />
      </label>
      {category === 'vendor' && (
        <>
          <label>
            Contact
            <input
              type="text"
              value={vendorContact}
              onChange={e => setVendorContact(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
              placeholder="Enter contact"
            />
          </label>
          <label>
            Address
            <input
              type="text"
              value={vendorAddress}
              onChange={e => setVendorAddress(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
              placeholder="Enter address"
            />
          </label>
        </>
      )}
      {category === 'brand' && (
        <>
          <label>
            Brand Code
            <input
              type="text"
              value={brandCode}
              onChange={e => setBrandCode(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
              placeholder="Enter brand code"
            />
          </label>
          <label>
            Country
            <input
              type="text"
              value={brandCountry}
              onChange={e => setBrandCountry(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
              placeholder="Enter country"
            />
          </label>
        </>
      )}
      <button
        style={{
          padding: '10px 0',
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: 8
        }}
        onClick={onSave}
        disabled={
          !category ||
          (category === 'vendor'
            ? !itemValue || !vendorContact || !vendorAddress
            : category === 'brand'
              ? !itemValue || !brandCode || !brandCountry
              : !itemValue)
        }
      >
        Save
      </button>
    </div>
  </Dialog>
);

export default AddItemDialog;
