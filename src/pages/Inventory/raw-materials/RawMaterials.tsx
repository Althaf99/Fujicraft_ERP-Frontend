
import { useEffect, useState } from 'react';
import AddStorageDialog from './AddStorageDialog';
import AddItemDialog from './AddItemDialog';

import DataTable from '../../../components/DataTable';
import EditButton from '../../../components/EditButton';
import DeleteButton from '../../../components/DeleteButton';

import {
  fetchRawMaterialTypes,
  fetchColors,
  fetchVendors,
  addRawMaterial,
  updateRawMaterialByAttribute,
  fetchRawMaterials,
  fetchBrands,
  addBrand,
  addRawMaterialType,
  addColor,
  addVendor,
  deleteRawMaterial,
  updateRawMaterial
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

  // Edit mode state
  const [editItem, setEditItem] = useState<any | null>(null);

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

    const handleDelete = async (row: any) => {
      await deleteRawMaterial(row.id);
      setItems((prev: any[]) => prev.filter((item: any) => item.id !== row.id));
    };

  // Update handler (open dialog pre-filled, for now just log)
  const handleUpdate = (row: any) => {
    setEditItem(row);
    setTypeId(row.RawMaterialTypeId?.toString() || '');
    setColorId(row.ColorId?.toString() || '');
    setVendorId(row.VendorId?.toString() || '');
    setBrandId(row.BrandId?.toString() || '');
    setWeight(row.weight?.toString() || '');
    setMaterialCode(row.materialCode || '');
    setAddStorageDialogOpen(true);
  };


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
      if (editItem) {
        // Update existing item
        await updateRawMaterial(editItem.id, {
          RawMaterialTypeId: typeId,
          ColorId: colorId,
          VendorId: vendorId,
          BrandId: brandId,
          weight: parseFloat(weight),
          materialCode,
        });
        setEditItem(null);
        // Fetch latest items from backend
        const updatedItems = await fetchRawMaterials();
        setItems(updatedItems);
      } else {
        // Add new or update by attribute
        const existing = items.find(
          item =>
            String(item.RawMaterialTypeId) === String(typeId) &&
            String(item.ColorId) === String(colorId) &&
            String(item.VendorId) === String(vendorId) &&
            String(item.BrandId) === String(brandId)
        );
        if (existing) {
          await updateRawMaterialByAttribute({
            RawMaterialTypeId: typeId,
            ColorId: colorId,
            VendorId: vendorId,
            BrandId: brandId,
            weight: parseFloat(weight)
          });
          const updatedItems = await fetchRawMaterials();
          setItems(updatedItems);
        } else {
          const newItem = await addRawMaterial({
            RawMaterialTypeId: typeId,
            ColorId: colorId,
            VendorId: vendorId,
            BrandId: brandId,
            weight: parseFloat(weight),
            materialCode,
          });
          setItems([...items, newItem]);
        }
      }
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
      <AddItemDialog
        open={addItemDialogOpen}
        onClose={() => setAddItemDialogOpen(false)}
        category={category}
        setCategory={setCategory}
        itemValue={itemValue}
        setItemValue={setItemValue}
        vendorContact={vendorContact}
        setVendorContact={setVendorContact}
        vendorAddress={vendorAddress}
        setVendorAddress={setVendorAddress}
        brandCode={brandCode}
        setBrandCode={setBrandCode}
        brandCountry={brandCountry}
        setBrandCountry={setBrandCountry}
        onSave={handleAddItem}
      />

      {/* Add Storage Dialog */}
      <AddStorageDialog
        open={addStorageDialogOpen}
        onClose={() => {
          setAddStorageDialogOpen(false);
          setEditItem(null);
          setTypeId('');
          setColorId('');
          setVendorId('');
          setBrandId('');
          setWeight('');
          setMaterialCode('');
        }}
        types={types}
        colors={colors}
        vendors={vendors}
        brands={brands}
        typeId={typeId}
        setTypeId={setTypeId}
        colorId={colorId}
        setColorId={setColorId}
        vendorId={vendorId}
        setVendorId={setVendorId}
        brandId={brandId}
        setBrandId={setBrandId}
        weight={weight}
        setWeight={setWeight}
        onSave={handleAddStorage}
      />

      <div style={{ marginTop: 32 }}>
        <DataTable
          columns={[
            { key: 'RawMaterialType', label: 'Material Type', width: '15%' },
            { key: 'Color', label: 'Color', width: '15%' },
            { key: 'Vendor', label: 'Vendor', width: '15%' },
            { key: 'Brand', label: 'Brand', width: '15%' },
            { key: 'weight', label: 'Weight (kg)', width: '15%' },
          ]}
          data={items.map(item => ({
            id: item.id,
            RawMaterialType: types.find(t => t.id === item.RawMaterialTypeId)?.name || '',
            Color: colors.find(c => c.id === item.ColorId)?.name || '',
            Vendor: vendors.find(v => v.id === item.VendorId)?.name || '',
            Brand: brands.find(b => b.id === item.BrandId)?.name || '',
            weight: item.weight,
            materialCode: item.materialCode,
            _original: item,
          }))}
          actions={(row) => (
            <>
              <EditButton onClick={() => handleUpdate(row._original)} />
              <DeleteButton onClick={() => handleDelete(row._original)} />
            </>
          )}
        />
      </div>
    </div>
  );
};

export default RawMaterials;
