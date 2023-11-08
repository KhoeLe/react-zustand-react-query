import AlertDialogMes from "./AlertDialogMes";
import DialogCloseButton from "./DialogCloseButton";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useToast } from "./ui/use-toast";

function CardBox() {

  const { toast } = useToast()

  const handleAction = () => {
    toast({
      variant: "destructive",
      title: "Account deleted.",
      description: "We've permanently deleted your account.",
    })

  };
  return (
    <div className="flex justify-center ">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            className="border rounded-md"
            src="https://media.istockphoto.com/id/1129342275/photo/enjoying-his-favorite-music.jpg?s=612x612&w=0&k=20&c=_ZQGnCMOJNB1AplPnmzu8wQbpetH-n5wX8Ex3TD4YRI="
            alt=""
          />
        </CardContent>

        <div className="flex justify-between px-2 mx-2 py-4 lg:px-4">
          {/* <DialogCloseButton  /> */}
          <DialogCloseButton
            title="Edit Profile"
            description="Make changes to your profile here. Click save when you're done."
            triggerContent={<Button variant="outline">Edit</Button>}
            inputFields={[
              { label: 'Name', id: 'name', defaultValue: 'Pedro Duarte' },
              { label: 'Username', id: 'username', defaultValue: '@peduarte' },
              { label: 'Password', id: 'password', defaultValue: '@peduarte', type: 'password' },
              // Add more input field configurations as needed
            ]}
          />
          <AlertDialogMes handleAction={handleAction} text="Delete" variant="destructive" title="Are you absolutely sure?" desc="This action cannot be undone. This will permanently delete your
          account and remove your data from our servers."/>
        </div>
      </Card>
    </div>



  );
}

export default CardBox;
