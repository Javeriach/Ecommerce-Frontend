import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';

function DashboardSingleUserOrder({ item }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='w-[100px] border p-[10px] ml-[5px] mr-[5px]  border-1 bg-dark text-white text-center'>See Orders</AlertDialogTrigger>
      <AlertDialogContent className="overflow-scroll h-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[20px] mb-4">User Email:{item.customer_email}</AlertDialogTitle>
          <AlertDialogDescription >
            {item?.products?.map((product) => (
              <div className="w-[400px] text-dark flex px-[5px] w-[100%] mt-[5px]">
                <div>
                  <img
                    src={product.imageURL}
                    className="w-[140px] h-[130px] "
                  />
                </div>
                <div className="flex flex-col font-medium items-start ml-[10px]">
                  <label htmlFor="">Title: {product.name}</label>
                  <label className="text-dark">Price: {product.price}$</label>
                  <label htmlFor="">
                    Item Quantity: {product.itemQuantity}
                 </label>
                       
                        <p className='text-start'>Item Id: {product.id}</p>

                  
                </div>
              </div>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DashboardSingleUserOrder;
