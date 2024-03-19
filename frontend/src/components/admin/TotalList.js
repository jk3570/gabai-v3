//icon sets

import { LiaBalanceScaleSolid } from "react-icons/lia";
import { VscFeedback } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";

const Counter = () => {
  const userCount = 0;
  const caseCount = 0;
  const feedbackCount = 0;

  const totalNoStyle =
    "flex flex-row bg-gray-200 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl h-auto w-[35%] text-1xl p-5 justify-between items-center border-azure-500";

  return (
    <div className="flex flex-row gap-3 mt-5 mx-auto justify-center shrink self-center w-full">
      {/* Start */}
      <div className={totalNoStyle}>
        <div>
          {/* User Count */}
          Total No. of Users
          <br />
          <span className="text-5xl text-azure">{userCount}</span>
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
          <span className="text-5xl text-azure">{caseCount}</span>
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
          Total No. of Feedback
          <br />
          <span className="text-5xl text-azure">{feedbackCount}</span>
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
