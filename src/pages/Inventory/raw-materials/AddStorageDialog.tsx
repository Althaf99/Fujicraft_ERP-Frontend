import React from 'react';
import Dialog from '../../../components/Dialog';

interface AddStorageDialogProps {
  open: boolean;
  onClose: () => void;
  types: any[];
  colors: any[];
  vendors: any[];
  brands: any[];
  typeId: string;
  setTypeId: (v: string) => void;
  colorId: string;
  setColorId: (v: string) => void;
  vendorId: string;
  setVendorId: (v: string) => void;
  brandId: string;
  setBrandId: (v: string) => void;
  weight: string;
  setWeight: (v: string) => void;
  onSave: () => void;
}

const AddStorageDialog: React.FC<AddStorageDialogProps> = ({
  open, onClose, types, colors, vendors, brands,
  typeId, setTypeId, colorId, setColorId, vendorId, setVendorId, brandId, setBrandId,
  weight, setWeight, onSave
}) => (
  <Dialog open={open} title="Create Raw Material Storage" onClose={onClose}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 260 }}>
      <label>
        Material Type
        <select
          value={typeId}
          onChange={e => setTypeId(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
        >
          <option value="">Select type</option>
          {types.map((opt: any) => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
      </label>
      <label>
        Color
        <select
          value={colorId}
          onChange={e => setColorId(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
        >
          <option value="">Select color</option>
          {colors.map((opt: any) => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
      </label>
      <label>
        Vendor
        <select
          value={vendorId}
          onChange={e => setVendorId(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
        >
          <option value="">Select vendor</option>
          {vendors.map((opt: any) => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
      </label>
      <label>
        Brand
        <select
          value={brandId}
          onChange={e => setBrandId(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
        >
          <option value="">Select brand</option>
          {brands.map((opt: any) => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
      </label>
      <label>
        Weight
        <input
          type="number"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
          placeholder="Enter weight"
        />
      </label>
      <button
        style={{
          padding: '10px 0',
          background: '#059669',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: 8
        }}
        onClick={onSave}
        disabled={!typeId || !colorId || !vendorId || !brandId || !weight}
      >
        Save
      </button>
    </div>
  </Dialog>
);

export default AddStorageDialog;
