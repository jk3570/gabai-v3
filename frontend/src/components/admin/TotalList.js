/* eslint-disable no-labels */
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
  const [totalForms, setTotalForms] = useState(0);
  const [totalAccepts, setTotalAccepts] = useState(0);
  const [totalArchives, setTotalArchives] = useState(0);
  const [totalCases, setTotalCases] = useState(0);

  useEffect(() => {
    // Calculate the sum of totalForms, totalAccepts, and totalArchives
    const sum = totalForms + totalAccepts + totalArchives;
    
    // Set the sum to totalCases
    setTotalCases(sum);
  }, [totalForms, totalAccepts, totalArchives]);


//total users
  useEffect(() => {
    axios.get(`${BaseURL}/user/total`)
      .then(response => {
        setTotalUsers(response.data.totalUsers);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

//total feedbacks
  useEffect(() => {
    axios.get(`${BaseURL}/feedback/total`)
      .then(response => {
        setTotalFeedbacks(response.data.totalFeedbacks);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

//form cases
  useEffect(() => {
    axios.get(`${BaseURL}/form/total`)
      .then(response => {
        setTotalForms(response.data.totalForms);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

//accept cases
  useEffect(() => {
    axios.get(`${BaseURL}/accept/total`)
      .then(response => {
        setTotalAccepts(response.data.totalAccepts);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);

//request cases
  useEffect(() => {
    axios.get(`${BaseURL}/archive/total`)
      .then(response => {
        setTotalArchives(response.data.totalArchives);
      })
      .catch(error => {
        console.error('Error fetching total count:', error);
      });
  }, []);


  const totalNoStyle =
    "flex flex-row bg-gray-400 bg-opacity-30 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl h-auto w-full text-1xl p-5 justify-between items-center border-azure-500";

  return (
    <div className="flex flex-col md:flex-row gap-3 mx-auto justify-center shrink self-center w-full">
      {/* Start */}
      <div className={totalNoStyle}>
        <div>
          {/* User Count */}
          Total No. of Users
          <br />
          <span className="text-4xl text-azure">{totalUsers}</span>
        </div>
        <div>
          <FaRegUser className="text-6xl p-2 fill-azure" />
        </div>
      </div>
      {/* End */}

      {/* Start */}
      <div className={totalNoStyle}>
        <div>
          {/* Case Count */}
          Total No. of Cases
          <br />
          <span className="text-4xl text-azure">{totalCases}</span>
        </div>
        <div>
          <LiaBalanceScaleSolid className="text-6xl fill-azure" />
        </div>
      </div>
      {/* End */}

      {/* Start */}
      <div className={totalNoStyle}>
        <div>
          {/* Feedback Count */}
          Total No. of Feedbacks
          <br />
          <span className="text-4xl text-azure">{totalFeedbacks}</span>
        </div>
        <div>
          <VscFeedback className="text-6xl p-1 fill-azure" />
        </div>
      </div>
      {/* End */}
    </div>
  );
};

export default Counter;
