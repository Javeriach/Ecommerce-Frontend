import Footer from '../../AppComponents/Footer/Footer';
import SignUpForm from '@/AppComponents/SignUpForm/SignUpForm';

function SignUpPage() {
  return (
    <div className="py-[10px]">
      <div>
        <SignUpForm />
      </div>
      <Footer />
    </div>
  );
}

export default SignUpPage;
