import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/Components/ui/accordion';
import { currentOrderDetailsSetter } from '@/Redux/Slices/orders';
import { useDispatch } from 'react-redux';

function FormSection() {

  // ------ALL THE REQUIRED STATES---------
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [phoneNumber, setphoneNumber] = useState('');
  let [country, setCountry] = useState('');
  let [city, setCityName] = useState('');
  let [streetAddress, setStreetAddress] = useState('');
  let [area, setArea] = useState('');
  let [postCode, setPostalCode] = useState('');
  let [paymentMethod, setPayment] = useState('');
  let [addAddress, setNewAddressAdder] = useState(false);
  let [addressList, setAddressList] = useState([]);
  let [currentAddressId, setCurrentAddressId] = useState("");
  // =======DISPATCH STATE
  let dispatch = useDispatch();

  let fetchAlladdress = async () => {
    try {
      let response = await axios.get(BASE_URL + '/allAddress', {
        withCredentials: true,
      });
      setAddressList(response.data.addressList);
      console.log(response);
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong!');
    }
  };

  useEffect(() => {
    fetchAlladdress();
  }, []);

  let newAddressAdditionHandler = async () => {
    if (!country || !city || !streetAddress || !area || !postCode)
      toast.error('Enter all the fields..');
    try {
      let response = await axios.post(
        BASE_URL + '/addAddress',
        { country, city, streetAddress, area, postCode },
        { withCredentials: true }
      );
      setAddressList((ps) => {
        return [...ps, response.data.address];
      });
    } catch (error) {}
  };

  console.log(addressList);
  return (
    <div className="bg-white p-6 rounded-lg  shadow-md shadow-black flex-1">
      <h2 className="text-lg font-semibold mb-4">Billing Details</h2>

      <form >
        {/* First Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
        <input
          type="text"
          placeholder="First Name"
          className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Phone Number */}
        <input
          type="text"
          placeholder="Phone Number"
          className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
          onChange={(e) => setphoneNumber(e.target.value)}
        />

</div>
        {/* -------ADDRESS POTION */}
        <div className='mt-4'>
          <hr />
          <h1 className='w-full font-semibold text-[20px] mt-3'>Address</h1>
          <div >
          {!addAddress && (
          <>
            <br></br>
            <div className="flex  flex-col w-[100%]  ">
              <div className=" flex flex-col items-start">
              {addressList?.map((address, index) => {
                return <div className="flex justify-center   ">
                  <div className='flex items-start '>
                  <input type="radio" name='address' className="h-[17px] w-[17px]" onChange={(e) => {setCurrentAddressId(address._id)}}/>  

                  </div>
                <div>
                  <Accordion type="single" collapsible className="">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <label className="font-medium text-[17px] ms-2">Address {index + 1}</label>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="font-[500]">Street Address : {address.streetAddress}</p>
                        <p className="font-[500]">Area: {address.area}</p>
                        <p className="font-[500]">Postal Code: {address.postalCode}</p>
                        <p className="font-[500]">City: {address.city}</p>
                        <p className="font-[500]">Country: {address.country}</p>
                   
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                    </div>
                </div>;
              })}
                </div>
              <h1 className='text-center m-2'>Or</h1>
              <button
                className="bg-black text-white p-1 text-[15px] rounded flex justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  setNewAddressAdder(true);
                }}
              >
                {' '}
                <Plus /> Add Address
              </button>
            </div>
          </>
        )}
        {addAddress && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {/* Country */}
            <input
              type="text"
              placeholder="Country"
              className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
              onChange={(e) => setCountry(e.target.value)}
            />

            {/* City */}
            <input
              type="text"
              placeholder="City"
              className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
              onChange={(e) => setCityName(e.target.value)}
            />

            {/* Street Address */}
            <input
              type="text"
              placeholder="Street Address"
              className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
              onChange={(e) => setStreetAddress(e.target.value)}
            />

            {/* Area */}
            <input
              type="text"
              placeholder="Area"
              className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
              onChange={(e) => setArea(e.target.value)}
            />

            {/* Postal Code */}
            <input
              type="text"
              placeholder="Postal Code"
              className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <br></br>
            <div className="flex justify-between">
              <button
                className="bg-red-500 p-2 rounded text-white "
                onClick={(e) => {
                  e.preventDefault();
                  setNewAddressAdder(false);
                }}
              >
                {' '}
                Cancel
              </button>
              <button
                className="text-white bg-green-700 px-2 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  newAddressAdditionHandler();
                  setNewAddressAdder(false);
                }}
              >
                {' '}
                Save Address
              </button>
            </div>
          </div>
        )}
          </div>
     </div>
        

        {/* Payment Method */}
        
        
        <div className="col-span-1 md:col-span-2 mt-3">
          <hr />
          <label className="block text-xl mb-2 font-semibold mt-3">
            Payment Method
          </label>
          <div className="space-y-2">
            {/* <!-- Credit/Debit Card Option --> */}
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="creditDebitCard"
                className="form-radio text-blue-600 focus:ring-blue-500"
                onChange={(e) => setPayment(e.target.value)}
              />
              <span className="text-gray-700">Credit/Debit Card</span>
            </label>

            {/* <!-- Cash on Delivery Option --> */}
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cashOnDelivery"
                className="form-radio text-blue-600 focus:ring-blue-500"
                onChange={(e) => setPayment(e.target.value)}
              />
              <span className="text-gray-700">Cash on Delivery</span>
            </label>
          </div>
        </div>
      </form>

      <div className='w-full flex justify-center'>
      <button className='bg-green-800 text-white p-2 px-5 rounded mt-3' onClick={()=>dispatch(currentOrderDetailsSetter({name,phoneNumber,email,addressId:currentAddressId,paymentMethod}))}>Submit Details</button>

      </div>

    </div>
  );
}

export default FormSection;
