import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PublishTenderForm from "./PublishTenderForm";
import BuyerTenderList from "./BuyerTenderList";
import BidderBiddingList from "./BidderBiddingList";
import SignUp from "./pages/SignUp";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/publish-tender" element={<PublishTenderForm />} />
		<Route path="/BuyerTenderList" element={<BuyerTenderList />} />
		<Route path="/BidderBiddingList" element={<BidderBiddingList />} />
		<Route path="/signup" element={<SignUp />} />
	</Routes>
);

export default App;
