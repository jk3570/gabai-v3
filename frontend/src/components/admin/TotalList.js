//icon sets
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { VscFeedback } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import { BaseURL } from "../../BaseURL"

const Counter = () => {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  // const [totalCases, setTotalCases] = useState(0);
  const [totalCases, setTotalCases] = useState("1");

  useEffect(() => {
    axios.get(`${BaseURL}/user/total`)
      .then(response => {
        setTotalUsers(response.data.totalUsers);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${BaseURL}/accept/total`)
      .then(response => {
        setTotalCases(response.data.totalCases);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${BaseURL}/feedback/total`)
      .then(response => {
        setTotalFeedbacks(response.data.totalFeedbacks);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

    useEffect(() => {
    axios.get(`${BaseURL}/accept/totalFeedbacks`)
      .then(response => {
        setTotalFeedbacks(response.data.totalFeedbacks);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

  const totalNoStyle =
    "flex flex-row bg-gray-400 bg-opacity-30 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl h-auto w-[35%] text-1xl p-5 justify-between items-center border-azure-500";

  return (
    <div className="flex flex-row gap-3 mx-auto justify-center shrink self-center w-full">
      {/* Start */}
      <div className={totalNoStyle}>
        <div>
          {/* User Count */}
          Total No. of Users
          <br />
          <span className="text-5xl text-azure">{totalUsers}</span>
        </div>
        <div>
          <FaRegUser className="h-[4rem] w-[4rem] p-2 fill-azure" />
        </div>
      </div>
      {/* End */}

      {/* Start */}
      <div className={totalNoStyle}>
        <div>
          {/* Case Count */}
          Total No. of Cases
          <br />
          <span className="text-5xl text-azure">{totalCases}</span>
        </div>
        <div>
          <LiaBalanceScaleSolid className="h-[4rem] w-[4rem] fill-azure" />
        </div>
      </div>
      {/* End */}

      {/* Start */}
      <div className={totalNoStyle}>
        <div>
          {/* Feedback Count */}
          Total No. of Feedbacks
          <br />
          <span className="text-5xl text-azure">{totalFeedbacks}</span>
        </div>
        <div>
          <VscFeedback className="h-[4rem] w-[4rem] p-1 fill-azure" />
        </div>
      </div>
      {/* End */}
    </div>
  );
};

export default Counter;
