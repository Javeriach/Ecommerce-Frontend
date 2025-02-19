import { useState } from "react";

function FormSection() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phoneNumber, setphoneNumber] = useState("");
  let [country, setCountry] = useState("");
  let [city, setCityName] = useState("");
  let [streetAddress, setStreetAddress] = useState("");
  let [area, setArea] = useState("");
  let [postCode, setPostalCode] = useState("");
  let [paymentMethod, setPayment] = useState("");

  
  return (
    <div className="bg-white p-6 rounded-lg  shadow-md shadow-black flex-1">
      <h2 className="text-lg font-semibold mb-4">Billing Details</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <input
          type="text"
          placeholder="First Name"
          className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
          onChange={(e)=>setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
          onChange={(e)=>setEmail(e.target.value)}
        />

        {/* Phone Number */}
        <input
          type="text"
          placeholder="Phone Number"
          className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
          onChange={(e)=>setphoneNumber(e.target.value)}
        />

        {/* Country */}
        <input
          type="text"
          placeholder="Country"
          className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
          onChange={(e)=>setCountry(e.target.value)}
        />

        {/* City */}
        <input
          type="text"
          placeholder="City"
          className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
          onChange={(e)=>setCityName(e.target.value)}
        />

        {/* Street Address */}
        <input
          type="text"
          placeholder="Street Address"
          className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
          onChange={(e)=>setStreetAddress(e.target.value)}
        />

        {/* Area */}
        <input
          type="text"
          placeholder="Area"
          className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
          onChange={(e)=>setArea(e.target.value)}
        />

        {/* Postal Code */}
        <input
          type="text"
          placeholder="Postal Code"
          className="border-black border-1 rounded border-opacity-55 text-black bg-slate-100 p-2"
          onChange={(e)=>setPostalCode(e.target.value)}
        />

        {/* Payment Method */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-xl mb-2 font-semibold">
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
                onChange={(e)=>setPayment(e.target.value)}
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
                onChange={(e)=>setPayment(e.target.value)}
              />
              <span className="text-gray-700">Cash on Delivery</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormSection;
