import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PublishTenderForm from "./PublishTenderForm";
import BuyerTenderList from "./BuyerTenderList";
import BidderBiddingList from "./BidderBiddingList";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import TendersList from "./TenderList";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/publish-tender" element={<PublishTenderForm />} />
		<Route path="/BuyerTenderList" element={<BuyerTenderList />} />
		<Route path="/BidderBiddingList" element={<BidderBiddingList />} />
		<Route path="/signup" element={<SignUp />} />
		<Route path="/admin-dashboard" element={<AdminDashboard />} />
		<Route path="/buyer-dashboard" element={<BuyerDashboard />} />
		<Route path="/list-tenders" element={<TendersList />} />
        <Route path="/list-tenders/page/:pageNumber" element={<TendersList />} />
	</Routes>
);

export default App;
