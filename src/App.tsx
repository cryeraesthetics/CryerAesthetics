import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MemberDataProvider } from './context/MemberDataContext';
import { CheckoutProvider } from './context/CheckoutContext';
import TabbedLayout from './layouts/TabbedLayout';
import PlainLayout from './layouts/PlainLayout';

import Home from './screens/Home';
import SkinGuideList from './screens/SkinGuideList';
import SkinGuideDetail from './screens/SkinGuideDetail';
import Faq from './screens/Faq';
import More from './screens/More';
import About from './screens/About';
import Contact from './screens/Contact';
import Reviews from './screens/Reviews';
import Tips from './screens/Tips';
import MyBooks from './screens/MyBooks';
import BookNow from './screens/BookNow';
import Subscribe from './screens/Subscribe';
import Payment from './screens/Payment';
import PaymentSuccess from './screens/PaymentSuccess';
import Login from './screens/Login';
import Signup from './screens/Signup';

import MySkin from './screens/myskin/MySkin';
import Diary from './screens/myskin/Diary';
import Layering from './screens/myskin/Layering';
import Tutorials from './screens/myskin/Tutorials';
import Kits from './screens/myskin/Kits';

import Quiz from './quiz/Quiz';

export default function App() {
  return (
    <AuthProvider>
      <MemberDataProvider>
        <CheckoutProvider>
          <Routes>
            <Route element={<TabbedLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/guide" element={<SkinGuideList />} />
              <Route path="/guide/:id" element={<SkinGuideDetail />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/me" element={<MySkin />} />
              <Route path="/more" element={<More />} />
            </Route>

            <Route element={<PlainLayout />}>
              <Route path="/more/about" element={<About />} />
              <Route path="/more/contact" element={<Contact />} />
              <Route path="/more/reviews" element={<Reviews />} />
              <Route path="/more/tips" element={<Tips />} />
              <Route path="/more/books" element={<MyBooks />} />
              <Route path="/book-now" element={<BookNow />} />
              <Route path="/me/diary" element={<Diary />} />
              <Route path="/me/layering" element={<Layering />} />
              <Route path="/me/tutorials" element={<Tutorials />} />
              <Route path="/me/kits" element={<Kits />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </CheckoutProvider>
      </MemberDataProvider>
    </AuthProvider>
  );
}
