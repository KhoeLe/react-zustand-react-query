import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import CardForm from './CardForm'
import { useState } from 'react';

type Props = {
  title: string;
  description: string;
  triggerContent: React.ReactNode;
  handleAction?: () => void;
  inputFields: {
    id: string;
    type?: string;
    label: string;
    defaultValue?: string;
  }[];
};


function CardDialogCreate({ title, description, triggerContent, inputFields }: Props) {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogTrigger data-cy="dialog-trigger-create" asChild>{triggerContent}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle >{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <CardForm
            mode='create'
            inputFields={inputFields}
            afterSave={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CardDialogCreate