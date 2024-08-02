
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/Components/ui/accordion';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
function Footer() {
  return (
    <div className="bg-black">
      <div
        className={` py-5 bg-black flex flex-col md:flex-row text-white w-screen  justify-around`}
      >
        <div className=' w-screen flex flex-col items-center md:hidden'>
          <div className="md:hidden w-[90%] ">
            <Accordion type="single" collapsible className=''>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                <h4 className="font-medium text-[20px]">ESHOP</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <p  className='font-[500]' >Summer Collection</p>
                  <p  className='font-[500]'  >Summer Sale</p>
                  <p  className='font-[500]' >Contact Us</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
 
          <div className="md:hidden w-[90%]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                <h4 className="font-medium text-[20px]">INFORMATION</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <p  className='font-[500]' >Privay Policy</p>
                  <p className='font-[500]'  >Term And Conditions</p>
                  <p  className='font-[500]' >Return And Exchange Policy</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* --------------Customer Service */}
          <div className="md:hidden w-[90%]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                <h4 className="font-medium text-[20px]">CUSTOMER SERVICE</h4>
                </AccordionTrigger>
                <AccordionContent>
                  <p   className='font-[500]'>Contact US</p>
                  <p    className='font-[500]' >Account</p>
                  <p    className='font-[500]' >Checkout</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="md:hidden w-[90%]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger><h4 className="font-medium text-[20px]">SOCAIL LINKS</h4></AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-row'>
                  <FacebookIcon sx={{ fontSize: 30 }} />
          <LinkedInIcon sx={{ fontSize: 30 }} />
          <InstagramIcon sx={{ fontSize: 30 }} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="hidden md:block">
        <h4 className="font-medium text-[25px]">ESHOP</h4>
          <p>Summer Collection</p>
          <p>Summer Sale</p>
          <p>Sale</p>
          <p>Contact Us</p>
        </div>

        <div className="hidden md:block">
          <h4 className="font-medium text-[25px]">INFORMATION</h4>

          <p>Privay Policy</p>
          <p>Term And Conditions</p>
          <p>Return And Exchange Policy</p>
        </div>

        <div className="hidden md:block">
          <h4 className="font-medium text-[25px] ">CUSTOMER SERVICES</h4>
          <p>Contact US</p>
          <p>Account</p>
          <p>Checkout</p>
        </div>

        <div className="hidden md:block">
          <h4 className="font-medium text-[25px] ">SOCIAL LINKS</h4>
          <FacebookIcon sx={{ fontSize: 40 }} />
          <LinkedInIcon sx={{ fontSize: 40 }} />
          <InstagramIcon sx={{ fontSize: 40 }} />
        </div>
        {/* -------------------- */}
      </div>
      <div className="h-[1px]  bg-white"></div>

      <div className="w-screen text-center bg-black  text-white pb-4">
        <p className="mt-1">
          Developed by Javeria Kanwal 2008-2024 © EShopStore™ Ltd.
          All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
