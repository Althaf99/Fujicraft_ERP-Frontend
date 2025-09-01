import React from 'react';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';

interface AddStorageDialogProps {
  open: boolean;
  onClose: () => void;
  colors: any[];
  codes: any[];
  colorId: string;
  setColorId: (v: string) => void;
  codeId: string;
  setCodeId: (v: string) => void;
  weight: string;
  setWeight: (v: string) => void;
  onSave: () => void;
  editMode?: boolean;
}

const AddStorageDialog: React.FC<AddStorageDialogProps> = ({
  open, onClose, colors, codes, colorId, setColorId, codeId, setCodeId, weight, setWeight, onSave, editMode
}) => {
  return (
    <div style={{ display: open ? 'block' : 'none' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 9998 }} onClick={onClose} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#fff', borderRadius: 12, minWidth: 340, maxWidth: '90vw', boxShadow: '0 4px 32px rgba(0,0,0,0.12)', padding: 32, zIndex: 9999 }}>
        <h3 style={{ marginTop: 0 }}>{editMode ? 'Edit' : 'Create'} Master Batch Inventory</h3>
        <form onSubmit={e => { e.preventDefault(); onSave(); }}>
          <Select
            label="Color"
            value={colorId}
            onChange={e => setColorId(e.target.value)}
            options={colors.map((c: any) => ({ value: c.id, label: c.name }))}
            required
          />
          <Select
            label="Code"
            value={codeId}
            onChange={e => setCodeId(e.target.value)}
            options={codes.filter((c: any) => c.colorId === colorId).map((c: any) => ({ value: c.id, label: c.code }))}
            required
            disabled={!colorId}
          />
          <Input
            label="Weight"
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            required
            min={0}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 18 }}>
            <Button type="button" onClick={onClose} style={{ background: '#e5e7eb', color: '#222' }}>Cancel</Button>
            <Button type="submit">{editMode ? 'Update' : 'Add'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStorageDialog;
