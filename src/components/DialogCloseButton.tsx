import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'
import { useToast } from './ui/use-toast'

type Props = {
    title: string,
    description: string,
    triggerContent: React.ReactNode,
    handleAction?: () => void,
    inputFields: {
        id: string,
        type?: string,
        label: string,
        defaultValue?: string,
    }[]
}


function DialogCloseButton({ title, description, triggerContent, inputFields }: Props) {

    const { toast } = useToast()
    const [open, setOpen] = useState(false);

    const [formValues, setFormValues] = useState<Record<string, string>>(
        inputFields.reduce((acc: Record<string, string>, field) => {
            acc[field.id] = field.defaultValue || '';
            return acc;
        }, {})
    );

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // You can access the form values from the formValues state
        console.log('Form values:', formValues);
        // Add logic to submit the form data to your backend or perform other actions here

        try {
            // throw 500; 
            setOpen(false);
            toast({
                variant: "success",
                title: "Updated Profile",
                description: "We've updated your profile",
            })
        } catch (error) {
            
            // setOpen(false);

            toast({
                variant: "destructive",
                title: "Update Failed",
                description: "We've failed to update your profile",
            })

           

        } finally {
            setOpen(false);

            console.log('finally')
        }
        
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [id]: value,
        }));


        console.log('formChange', `${[id]}: ${value}`)
    };



    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                {triggerContent}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleFormSubmit}>
                    <div className="grid gap-4 py-4">
                        {inputFields.map((input, index) => (
                            <div key={index} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={input.id} className="text-right">
                                    {input.label}
                                </Label>
                                <Input
                                    type={input.type || 'text'}
                                    id={input.id}
                                    // defaultValue={input.defaultValue || ''}
                                    className="col-span-3"
                                    value={formValues[input.id]}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DialogCloseButton