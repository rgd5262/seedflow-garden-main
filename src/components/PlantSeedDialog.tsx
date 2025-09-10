import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import seedIcon from '@/assets/seed.png';

interface PlantSeedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPlant: (title: string, description: string) => void;
  date: number | null;
  month: number;
  year: number;
}

const PlantSeedDialog: React.FC<PlantSeedDialogProps> = ({
  isOpen,
  onClose,
  onPlant,
  date,
  month,
  year
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onPlant(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formattedDate = date ? `${monthNames[month]} ${date}, ${year}` : '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-garden-earth border-border">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-seed-dormant rounded-full flex items-center justify-center">
              <img src={seedIcon} alt="Seed" className="w-8 h-8" />
            </div>
          </div>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Plant Your Daily Seed
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            What do you want to accomplish on {formattedDate}?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">
              Goal Title
            </Label>
            <Input
              id="title"
              placeholder="Learn something new, exercise, write..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-seed-dormant border-border text-foreground placeholder:text-muted-foreground"
              autoFocus
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description (optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Add more details about your plan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-seed-dormant border-border text-foreground placeholder:text-muted-foreground resize-none"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-plant-growing hover:bg-plant-highlight text-primary-foreground"
              disabled={!title.trim()}
            >
              Plant Seed 🌱
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlantSeedDialog;