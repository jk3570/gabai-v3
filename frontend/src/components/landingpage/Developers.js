import Joko from "../../img/developers/Joko.jpg";
import Lei from "../../img/developers/lei.png";
import Kadu from "../../img/developers/kadu.png";
import Leonard from "../../img/developers/leonard.png";
import Marot from "../../img/developers/marot.jpg";
import Nikol from "../../img/developers/nikol.jpg";
import Even from "../../img/developers/even.png";

const Developers = () => {
  const img = "w-[6rem] h-[6rem] mb-3";
  const center = "flex flex-col justify-center items-center mb-5";
  const rounded = "rounded-full border-0 border-gray-500";
  const devName = "font-bold text-azure mb-2 text-xl";
  const devPos = "text-center text-sm max-md:text-center";
  return (
    <>
      <div className="relative z-10 mt-20 flex flex-col gap-y-2 justify-center items-center text-center ">
        <center>
          <h1 className="text-4xl font-bold my-5">Team <span className="text-azure">PARAGON</span></h1>
        </center>

                  <div >
                    <div className={center}>
                      <div className={img}>
                        <img src={Joko} alt="" className={rounded} />
                      </div>
                      <h2 className={devName}>Joko Gadingan</h2>
                      <p className={devPos}
                        >Project Manager / Backend Developer</p>
                    </div>
                    
                    <div className="grid grid-cols-3 max-md:grid-cols-2 gap-5">
            <div className={center}>
              <div className={img}>
                <img src={Lei} alt="" className={rounded} />
              </div>
              <h2 className={devName}>Louise Angelo Ocopio</h2>
              <p className={devPos}>Lead Frontend Developer</p>
            </div>
            <div className={center}>
              <div className={img}>
                <img src={Kadu} alt="" className={rounded} />
              </div>
              <h2 className={devName}>Evehn Kadusale</h2>
              <p className={devPos}>Lead AI Developer</p>
            </div>
            <div className={center}>
              <div className={img}>
                <img src={Even} alt="" className={rounded} />
              </div>
              <h2 className={devName}>Evenezer Francis Basan</h2>
              <p className={devPos}>Frontend Developer / AI Prompt Engineer</p>
            </div>
            <div className={center}>
              <div className={img}>
                <img src={Nikol} alt="" className={rounded} />
              </div>
              <h2 className={devName}>Nicole Del Carmen</h2>
              <p className={devPos}>Frontend Developer / AI Prompt Engineer</p>
            </div>
            <div className={center}>
              <div className={img}>
                <img src={Marot} alt="" className={rounded} />
              </div>
              <h2 className={devName}>Mary Rose Crisostomo</h2>
              <p className={devPos}>Frontend Developer / AI Prompt Engineer</p>
            </div>
            <div className={center}>
              <div className={img}>
                <img src={Leonard} alt="" className={rounded} />
              </div>
              <h2 className={devName}>John Leonard Leano</h2>
              <p className={devPos}>UI/UX Designer / AI Prompt Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Developers;
