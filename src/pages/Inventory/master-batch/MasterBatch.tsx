import React, { useEffect, useState } from 'react';
import DataTable from '../../../components/DataTable';
import EditButton from '../../../components/EditButton';
import DeleteButton from '../../../components/DeleteButton';
import AddItemDialog from './AddItemDialog';
import AddStorageDialog from './AddStorageDialog';
import {
  fetchMasterBatchColors,
  addMasterBatchColor,
  fetchMasterBatchInventory,
  addMasterBatchInventory,addVendor
} from './api';

interface Color {
  id: string;
  name: string;
}
interface Code {
  id: string;
  code: string;
  colorId: string;
  vendor: string;
  address: string;
  contact: string;
}
interface Inventory {
  id: string;
  colorId: string;
  codeId: string;
  weight: number;
}


const MasterBatch: React.FC = () => {
  // Dialog states
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [addStorageDialogOpen, setAddStorageDialogOpen] = useState(false);

  // Add item dialog fields
  const [category, setCategory] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [vendorContact, setVendorContact] = useState('');
  const [vendorAddress, setVendorAddress] = useState('');
  const [brandCode, setBrandCode] = useState('');
  const [brandCountry, setBrandCountry] = useState('');
  const [vendors, setVendors] = useState<{ id: string; name: string }[]>([]);
  const [selectedVendorId, setSelectedVendorId] = useState('');

  // Add storage dialog fields
  const [colorId, setColorId] = useState('');
  const [codeId, setCodeId] = useState('');
  const [weight, setWeight] = useState('');

  // Edit mode state
  const [editItem, setEditItem] = useState<any | null>(null);

  // Data lists
  const [colors, setColors] = useState<any[]>([]);
  // codes are not used in new UI, but kept for DataTable mapping
  const [codes, setCodes] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchMasterBatchColors().then(setColors);
    fetchMasterBatchInventory().then(setItems);
  
  }, []);

  // Delete handler
  const handleDelete = async (row: any) => {
    // TODO: implement delete API for master batch inventory
    setItems((prev: any[]) => prev.filter((item: any) => item.id !== row.id));
  };

  // Update handler (open dialog pre-filled)
  const handleUpdate = (row: any) => {
    setEditItem(row);
    setColorId(row.colorId || '');
    setCodeId(row.codeId || '');
    setWeight(row.weight?.toString() || '');
    setAddStorageDialogOpen(true);
  };

  // Add item (category) handler
  const handleAddItem = async () => {
    if (!category) return;
    let added;
    if (category === 'vendor') {
      if (!itemValue || !vendorContact || !vendorAddress) return;
      // Save vendor to backend
      const newVendor = await addVendor({ name: itemValue, contact: vendorContact, address: vendorAddress });
      setVendors([...vendors, newVendor]);
    } else if (category === 'color') {
      if (!itemValue || !brandCode || !selectedVendorId) return;
      added = await addMasterBatchColor({ name: itemValue, code: brandCode, vendorId: selectedVendorId });
      setColors([...colors, added]);
    }
    setCategory('');
    setItemValue('');
    setVendorContact('');
    setVendorAddress('');
    setBrandCode('');
    setBrandCountry('');
    setSelectedVendorId('');
  };

  // Add storage handler
  const handleAddStorage = async () => {
    if (colorId && brandCode && selectedVendorId && weight) {
      if (editItem) {
        // Update existing item (TODO: implement update API)
        setEditItem(null);
        // Fetch latest items from backend
        const updatedItems = await fetchMasterBatchInventory();
        setItems(updatedItems);
      } else {
        // Add new
        const newItem = await addMasterBatchInventory({ colorId, code: brandCode, vendorId: selectedVendorId, weight: parseFloat(weight) });
        setItems([...items, newItem]);
      }
      setColorId('');
      setCodeId('');
      setWeight('');
      setAddStorageDialogOpen(false);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <h2 style={{ margin: 0, flex: 1 }}>Master Batch Inventory</h2>
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
          Create Master Batch Inventory
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
        vendors={vendors}
        selectedVendorId={selectedVendorId}
        setSelectedVendorId={setSelectedVendorId}
      />

      {/* Add Storage Dialog */}
      <AddStorageDialog
        open={addStorageDialogOpen}
        onClose={() => {
          setAddStorageDialogOpen(false);
          setEditItem(null);
          setColorId('');
          setCodeId('');
          setWeight('');
        }}
        colors={colors}
        codes={codes}
        colorId={colorId}
        setColorId={setColorId}
        codeId={codeId}
        setCodeId={setCodeId}
        weight={weight}
        setWeight={setWeight}
        onSave={handleAddStorage}
        editMode={!!editItem}
      />

      <div style={{ marginTop: 32 }}>
        <DataTable
          columns={[
            { key: 'Color', label: 'Color', width: '30%' },
            { key: 'Code', label: 'Code', width: '30%' },
            { key: 'weight', label: 'Weight (kg)', width: '20%' },
          ]}
          data={items.map(item => ({
            id: item.id,
            Color: colors.find((c: any) => c.id === item.colorId)?.name || '',
            Code: codes.find((c: any) => c.id === item.codeId)?.code || '',
            weight: item.weight,
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

export default MasterBatch;
