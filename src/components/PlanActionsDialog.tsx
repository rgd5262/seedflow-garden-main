import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plan } from '@/components/GardenParcel';

interface PlanActionsDialogProps {
  open: boolean;
  plan: Plan | null;
  onClose: () => void;
  onUpdate: (planId: string, updates: { title?: string; description?: string; state?: Plan['state'] }) => void;
  onDelete: (planId: string) => void;
}

const PlanActionsDialog: React.FC<PlanActionsDialogProps> = ({ open, plan, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (plan) {
      setTitle(plan.title);
      setDescription(plan.description ?? '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [plan]);

  if (!plan) return null;

  const isCompleted = plan.state === 'completed';

  const handleSave = () => {
    onUpdate(plan.id, { title: title.trim(), description: description.trim() });
    onClose();
  };

  const handleDelete = () => {
    onDelete(plan.id);
    onClose();
  };

  const handleToggleState = () => {
    onUpdate(plan.id, { state: isCompleted ? 'planted' : 'completed' });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-garden-earth border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Plan</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update title/description, toggle state, or delete this plan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-seed-dormant border-border text-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc" className="text-foreground">Description</Label>
            <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="bg-seed-dormant border-border text-foreground" />
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button className="flex-1" onClick={handleSave} disabled={!title.trim()}>Save</Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleToggleState}>
              {isCompleted ? 'Mark as Planted' : 'Mark as Completed'}
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleDelete}>Delete</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanActionsDialog;
