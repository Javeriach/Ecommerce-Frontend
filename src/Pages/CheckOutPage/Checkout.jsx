import FormSection from '@/AppComponents/checkoutSection/FormSection';

import OrderSummery from '../../AppComponents/checkoutSection/OrderSummery';

const Checkout = () => {
 

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 pb-[100px]">
      <h1 className="text-3xl font-bold text-black my-4">CHECKOUT</h1>
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
                        {/* Billing Details Form */}
        <FormSection />

                        {/* Order Summary */}
       <OrderSummery/>
      </div>
    </div>
  );
};

export default Checkout;
