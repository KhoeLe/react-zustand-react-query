
import { Button } from "@/components/ui/button"
import { AlertDialog,AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

type AlertDialogMesProps = {
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    title: string;
    desc: string;
    text: string;
    handleAction: () => void;
};

function AlertDialogMes( {variant, title, desc, text, handleAction}: AlertDialogMesProps) {
    return (

        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button variant={variant}>{text}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {desc}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}



export default AlertDialogMes