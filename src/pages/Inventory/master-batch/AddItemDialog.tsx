import React from 'react';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';

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
  vendors: { id: string; name: string }[];
  selectedVendorId: string;
  setSelectedVendorId: (v: string) => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({
  open, onClose, category, setCategory, itemValue, setItemValue,
  vendorContact, setVendorContact, vendorAddress, setVendorAddress,
  brandCode, setBrandCode, onSave,
  vendors, selectedVendorId, setSelectedVendorId
}) => {
  return (
    <div style={{ display: open ? 'block' : 'none' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 9998 }} onClick={onClose} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#fff', borderRadius: 12, minWidth: 340, maxWidth: '90vw', boxShadow: '0 4px 32px rgba(0,0,0,0.12)', padding: 32, zIndex: 9999 }}>
        <h3 style={{ marginTop: 0 }}>Add New Item</h3>
        <form onSubmit={e => { e.preventDefault(); onSave(); }}>
          <Select
            label="Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            options={[
              { value: 'vendor', label: 'Vendor' },
              { value: 'color', label: 'Color' },
            ]}
            required
          />
          {category === 'vendor' && (
            <>
              <Input label="Vendor Name" value={itemValue} onChange={e => setItemValue(e.target.value)} required />
              <Input label="Contact Details" value={vendorContact} onChange={e => setVendorContact(e.target.value)} required />
              <Input label="Address" value={vendorAddress} onChange={e => setVendorAddress(e.target.value)} required />
            </>
          )}
          {category === 'color' && (
            <>
              <Input label="Color" value={itemValue} onChange={e => setItemValue(e.target.value)} required />
              <Input label="Color Code" value={brandCode} onChange={e => setBrandCode(e.target.value)} required />
              <Select
                label="Vendor"
                value={selectedVendorId}
                onChange={e => setSelectedVendorId(e.target.value)}
                options={vendors.map(v => ({ value: v.id, label: v.name }))}
                required
              />
            </>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 18 }}>
            <Button type="button" onClick={onClose} style={{ background: '#e5e7eb', color: '#222' }}>Cancel</Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemDialog;
