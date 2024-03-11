//icon sets

import { LiaBalanceScaleSolid } from "react-icons/lia";
import { VscFeedback } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";

const Counter = () => {
  const userCount = 0;
  const caseCount = 0;
  const feedbackCount = 0;

  const totalNoStyle =
    "flex flex-row border-2 rounded-xl h-[8rem] w-[16rem] p-3 justify-between items-center border-black";

  return (
    <div className="flex flex-row gap-1 items-center justify-center self-center w-[75vw]">
      {/* Start */}
      <div className={totalNoStyle}>
        <div>
          {/* User Count */}
          Total No. of Users
          <br />
          <span className="text-5xl">{userCount}</span>
        </div>
        <div>
          <FaRegUser className="text-7xl" />
        </div>
      </div>
      {/* End */}

      {/* Start */}
      <div className={totalNoStyle}>
        <div>
          {/* Case Count */}
          Total No. of Cases
          <br />
          <span className="text-5xl">{caseCount}</span>
        </div>
        <div>
          <LiaBalanceScaleSolid className="text-7xl" />
        </div>
      </div>
      {/* End */}

      {/* Start */}
      <div className={totalNoStyle}>
        <div>
          {/* Feedback Count */}
          Total No. of Feedback
          <br />
          <span className="text-5xl">{feedbackCount}</span>
        </div>
        <div>
          <VscFeedback className="text-7xl" />
        </div>
      </div>
      {/* End */}
    </div>
  );
};

export default Counter;
