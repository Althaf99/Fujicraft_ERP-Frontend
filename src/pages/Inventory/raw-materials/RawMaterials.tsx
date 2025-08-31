
import { useEffect, useState } from 'react';
import Dialog from '../../../components/Dialog';
import {
  fetchRawMaterialTypes,
  fetchColors,
  fetchVendors,
  addRawMaterial,
  fetchRawMaterials,
  fetchBrands,
  addBrand,
  addRawMaterialType,
  addColor,
  addVendor
} from './api';

const RawMaterials: React.FC = () => {
  // Dialog states
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [addStorageDialogOpen, setAddStorageDialogOpen] = useState(false);


  // Add item dialog fields
  const [category, setCategory] = useState('');
  const [itemValue, setItemValue] = useState('');

  // Vendor-specific fields
  const [vendorContact, setVendorContact] = useState('');
  const [vendorAddress, setVendorAddress] = useState('');
  // Brand-specific fields
  const [brandCode, setBrandCode] = useState('');
  const [brandCountry, setBrandCountry] = useState('');

  // Add storage dialog fields
  const [typeId, setTypeId] = useState('');
  const [colorId, setColorId] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [weight, setWeight] = useState('');
  const [materialCode, setMaterialCode] = useState('');

  // Data lists
  const [types, setTypes] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchRawMaterialTypes().then(setTypes);
    fetchColors().then(setColors);
    fetchVendors().then(setVendors);
    fetchBrands().then(setBrands);
    fetchRawMaterials().then(setItems);
  }, []);

  // Add item (category) handler
  const handleAddItem = async () => {
    if (!category) return;
    let added;
    if (category === 'materialType') {
      if (!itemValue) return;
      added = await addRawMaterialType({ name: itemValue });
      setTypes([...types, added]);
    } else if (category === 'materialColor') {
      if (!itemValue) return;
      added = await addColor({ name: itemValue });
      setColors([...colors, added]);
    } else if (category === 'vendor') {
      if (!itemValue || !vendorContact || !vendorAddress) return;
      added = await addVendor({ name: itemValue, contact: vendorContact,address: vendorAddress });
      setVendors([...vendors, added]);
    } else if (category === 'brand') {
      if (!itemValue || !brandCode || !brandCountry) return;
      added = await addBrand({ name: itemValue, code: brandCode, country: brandCountry });
      setBrands([...brands, added]);
    }
    setCategory('');
    setItemValue('');
    setVendorContact('');
    setVendorAddress('');
    setBrandCode('');
    setBrandCountry('');
  };

  // Add storage handler
  const handleAddStorage = async () => {
    if (typeId && colorId && vendorId && brandId && weight) {
      const newItem = await addRawMaterial({
        RawMaterialTypeId: typeId,
        ColorId: colorId,
        VendorId: vendorId,
        BrandId: brandId,
        weight: parseFloat(weight),
        materialCode,
      });
      setItems([...items, newItem]);
      setTypeId('');
      setColorId('');
      setVendorId('');
      setBrandId('');
      setWeight('');
      setMaterialCode('');
      setAddStorageDialogOpen(false);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <h2 style={{ margin: 0, flex: 1 }}>Raw Materials Inventory</h2>
        <button
          style={{
            padding: '10px 24px',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
          onClick={() => setAddItemDialogOpen(true)}
        >
          Add New Item
        </button>
        <button
          style={{
            padding: '10px 24px',
            background: '#059669',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
          onClick={() => setAddStorageDialogOpen(true)}
        >
          Create Raw Materials Storage
        </button>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={addItemDialogOpen} title="Add New Item" onClose={() => setAddItemDialogOpen(false)}>
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
              placeholder={ 'Enter name'}
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
            onClick={handleAddItem}
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

      {/* Add Storage Dialog */}
      <Dialog open={addStorageDialogOpen} title="Create Raw Material Storage" onClose={() => setAddStorageDialogOpen(false)}>
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
          <label>
            Material Code
            <input
              type="text"
              value={materialCode}
              onChange={e => setMaterialCode(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
              placeholder="Enter material code"
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
            onClick={handleAddStorage}
            disabled={!typeId || !colorId || !vendorId || !brandId || !weight}
          >
            Save
          </button>
        </div>
      </Dialog>

      <p>This is the Raw Materials page.</p>
      {items.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h4>Items List</h4>
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>
                {item.RawMaterialType?.name || item.RawMaterialTypeId} / {item.Color?.name || item.ColorId} / {item.Vendor?.name || item.VendorId} / {item.Brand?.name || item.BrandId} / {item.weight}kg / {item.materialCode}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RawMaterials;
