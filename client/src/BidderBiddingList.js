import { useEffect, useState } from "react";
import { get, post } from "./TenderClient";

const BidderBiddingList = () => {
	const [loading, setLoading] = useState(true);
	const [bidderList, setBidderList] = useState([]);
	const [errorMsg, setErrorMsg] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchBidderBids = async (page) => {
		try {
			const data = await get(`api/bidder-bid?page=${page}`);
			setLoading(false);
			setBidderList(data.results);
			setTotalPages(data.pagination.totalPages);
		} catch (error) {
			setErrorMsg(error.message);
		}
	};

	useEffect(() => {
		fetchBidderBids(currentPage);
	}, [currentPage]);

	const handleStatusChange = async (bidId, status) => {
		try {
			await post(`/api/bid/${bidId}/status`, { status });
			fetchBidderBids(currentPage);
		} catch (error) {
			setErrorMsg(error.message);
		}
	};

	if (errorMsg !== null) {
		return <div>{errorMsg}</div>;
	}

	if (loading) {
		return <div>Loading!!</div>;
	}

	if (bidderList.length === 0) {
		return <div>No Bidding placed yet!!</div>;
	}

	const handlePrevious = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<main>
			<h1>Bidder Bidding List</h1>
			<div className="bids-container">
				{bidderList.map((bid) => (
					<div className="bid-card" key={bid.bid_id}>
						<p>Bid ID: {bid.bid_id}</p>
						<p>Tender ID: {bid.tender_id}</p>
						<p>Tender Title: {bid.title}</p>
						<p>
							Tender Closing Date:{" "}
							{new Date(bid.closing_date).toLocaleDateString()}
						</p>
						<p>
							Tender Announcement Date:{" "}
							{new Date(bid.announcement_date).toLocaleDateString()}
						</p>
						<p>
							Bid Submission Date:{" "}
							{new Date(bid.submission_date).toLocaleDateString()}
						</p>
						<p>Tender Status: {bid.tender_status}</p>
						<p>Bid Status: {bid.status}</p>
						<button onClick={() => handleStatusChange(bid.bid_id, "Withdrawn")}>
							Withdraw
						</button>
					</div>
				))}
			</div>
			<div className="pagination">
				{currentPage > 1 && <button onClick={handlePrevious}>Previous</button>}
				{currentPage < totalPages && <button onClick={handleNext}>Next</button>}
			</div>
		</main>
	);
};

export default BidderBiddingList;
