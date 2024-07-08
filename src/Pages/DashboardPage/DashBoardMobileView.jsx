import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Terminal } from "lucide-react";
function DashBoardMobileView() {
  return (
    <div className="w-screen flex justify-center items-center">
      <Alert className="h-[100px] w-[300px] mt-[200px]" >
        <Terminal />
        <AlertTitle>Alert!</AlertTitle>
        <AlertDescription>
         Use Laptop to view this Admin Page
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default DashBoardMobileView;
