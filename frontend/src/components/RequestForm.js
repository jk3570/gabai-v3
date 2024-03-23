import React from "react";
import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react";

const RequestForm = () => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const inputs = Array.from(event.target.form.elements);
            const currentIndex = inputs.indexOf(event.target);
            const nextIndex = currentIndex + 1;

            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();
            }
        }
    };

    const input = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const summary = "flex h-52 w-full rounded-md border bg-gray rounded-md px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const button = "flex h-10 px-3 py-2 bg-azure text-white rounded-md justify-center items-center w-full text-sm";
    const label = "block font-normal text-sm";

    return (
        <Popup
            trigger={<button className={button}>Request Form</button>}
            modal
            nested
            closeOnDocumentClick={false}
        >
            {(close) => (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-25 bg-black">
                    <div className="modal relative h-auto w-[70%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-2xl bg-white flex flex-col justify-center items-center pt-7 py-10 p-6">
                        <div className="w-full max-w-md bg-white rounded-lg">
                            <div className="w-full h-full grid grid-cols-1 gap-2">
                                <div className="flex flex-col justify-center">
                                    <h1 className="font-bold text-3xl m-0">
                                        Request Form
                                    </h1>
                                    <p className={label}>Request <span className="text-azure font-medium">Online Meeting</span> to a lawyer</p>
                                </div>
                                <form className="flex flex-col gap-2">
                                    <div className="flex flex-row-1 gap-2">
                                        <input type="text" className={input} onKeyDown={handleKeyDown} placeholder="First Name" />
                                        <input type="text" className={input} onKeyDown={handleKeyDown} placeholder="Last Name" />
                                    </div>
                                    <input type="email" className={input} onKeyDown={handleKeyDown} placeholder="Email" />
                                    <input type="text" className={input} onKeyDown={handleKeyDown} placeholder="Address Number" />
                                    <textarea
                                        name="cover_letter"
                                        className={summary}
                                        placeholder="Case Summary"
                                    ></textarea>
                                    <button type="submit" className={button}>
                                        Submit
                                    </button>
                                    <button onClick={close} className={button}>
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default RequestForm;
