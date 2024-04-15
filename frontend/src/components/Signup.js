import { useForm } from "react-hook-form";
import { React, useState, useEffect } from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { useSignup } from "../hooks/useSignup";
import Popup from "reactjs-popup";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Login from "./Login";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useNavigate } from "react-router-dom"


const Signup = ({ initialAddress }) => {

const navigate = useNavigate();
  // const notify = () =>
  //   toast.success("Account has been created successfully!", {
  //       position: "top-center",
  //       duration: 2000,
  //   });
  const [message, setMessage] = useState('');

  const [role, setRole] = useState("user");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");

  const [regionOptions, setRegionOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [barangayOptions, setBarangayOptions] = useState([]);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const passwordValue = watch("password");
  const [step, setStep] = useState(1);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const { signup, error, isLoading } = useSignup();
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
    const [isFormValid, setIsFormValid] = useState(false);

  // Toggle show/hide password
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eyeOff);
      setType("text");
    } else {
      setIcon(eye);
      setType("password");
    }
  };

  // Fetch regions on component mount
  useEffect(() => {
    regions()
      .then((regionList) => {
        console.log("Fetched regions:", regionList); // Log fetched regions
        setRegionOptions(regionList);
        if (initialAddress && initialAddress.region) {
          setSelectedRegion(initialAddress.region.region_code);
        }
      })
      .catch((error) => {
        console.error("Error fetching regions:", error);
      });
  }, [initialAddress]);

  // Fetch provinces when region changes
  useEffect(() => {
    console.log("Selected region:", selectedRegion); // Log selected region
    if (selectedRegion) {
      provinces(selectedRegion)
        .then((provinceList) => {
          console.log("Fetched provinces:", provinceList); // Log fetched provinces
          setProvinceOptions(provinceList);
          setSelectedProvince(""); // Reset selected province when region changes
        })
        .catch((error) => {
          console.error("Error fetching provinces:", error);
        });
    }
  }, [selectedRegion]);

  // Fetch cities when province changes
  useEffect(() => {
    if (selectedProvince) {
      cities(selectedProvince)
        .then((cityList) => {
          console.log("Fetched cities:", cityList); // Log fetched cities
          setCityOptions(cityList);
          setSelectedCity(""); // Reset selected city when province changes
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedProvince]);

  // Fetch barangays when city changes
  useEffect(() => {
    if (selectedCity) {
      barangays(selectedCity)
        .then((barangayList) => {
          console.log("Fetched barangays:", barangayList); // Log fetched barangays
          setBarangayOptions(barangayList);
          setSelectedBarangay(""); // Reset selected barangay when city changes
        })
        .catch((error) => {
          console.error("Error fetching barangays:", error);
        });
    }
  }, [selectedCity]);

  const nextStep = async () => {
    switch (step) {
      case 1:
        const isValidStep1 = await handleSubmit(onSubmitStep1Validation)();
        if (isValidStep1) {
          setStep(step + 1);
        }
        break;
      case 2:
        const isValidStep2 = await handleSubmit(onSubmitStep2Validation)();
        if (isValidStep2) {
          setStep(step + 1);
        }
        break;
      default:
        break;
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmitStep1Validation = async (data) => {
    const isValid = Object.keys(errors).length === 0;
    if (!isValid) {
      return false;
    }
    setStep(2); // Proceed to next step if validation passes
    return true;
  };

  const onSubmitStep2Validation = async (data) => {
    const isValid = Object.keys(errors).length === 0;
    if (!isValid) {
      return false;
    }
    setStep(3); // Proceed to next step if validation passes
    return true;
  };

  const onSubmit = async (data) => {
    
    console.log("Form Data:", data); // Log the form data
    if (data.password !== data.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);

    // Convert region code to name
    const selectedRegionName =
      regionOptions.find((region) => region.region_code === data.region)
        ?.region_name || "";

    // Convert province code to name
    const selectedProvinceName =
      provinceOptions.find(
        (province) => province.province_code === data.province
      )?.province_name || "";

    // Convert city code to name
    const selectedCityName =
      cityOptions.find((city) => city.city_code === data.city)?.city_name || "";

    // Convert barangay code to name
    const selectedBarangayName =
      barangayOptions.find((barangay) => barangay.brgy_code === data.barangay)
        ?.brgy_name || "";

    // Call signup function with converted address names
     await signup(
        role,
        data.username,
        data.firstname,
        data.lastname,
        data.gender,
        data.birthdate,
        selectedRegionName,
        selectedProvinceName,
        selectedCityName,
        selectedBarangayName,
        data.email,
        data.password
      );

      navigate("/home");
  };



useEffect(() => {
  // Check if form fields are not empty
  setIsFormValid(
    watch("email")?.trim() !== "" &&
    watch("username")?.trim() !== "" &&
    watch("password")?.trim() !== "" &&
    watch("confirmPassword")?.trim() !== ""
  );

  // Check if password and confirm password match
  if (passwordValue !== "" && passwordValue === watch("confirmPassword")) {
    setIsFormValid(true);
  } else {
    setIsFormValid(false);
  }
}, [watch, passwordValue]);

const label = "block font-normal text-sm ml-3"

const input = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const warning = "block font-normal text-sm text-red-500 error mt-1"

const button = "flex h-10 px-3 py-2 bg-azure text-white rounded-md justify-center items-center w-[50%] text-sm"


  // Start of Signup Form
  return (
    <Popup
      trigger={
        <Link to="#signup" className="flex w-full h-full items-center justify-center">
        Sign up
        </Link>
      }
      modal
    >
      {(close) => (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-25 bg-black">
            <form className="signup" id="signup" onSubmit={handleSubmit(onSubmit)}>

              {step === 1 && (
                <>
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
                    `{" "}
                    <div className="modal relative h-auto w-[72%] sm:w-[57%] md:w-[52%] lg:w-[47%] xl:w-[37%] 2xl:w-[40%] rounded-2xl bg-white flex flex-col pt-7 py-10 p-3">
                      <Link to="#" className="absolute flex align-center p-1 inset-y-0 right-0">
                        <IoIosCloseCircleOutline
                          className="text-3xl cursor-pointer"
                          onClick={() => close()}/>
                      </Link>

                      <div className="w-full h-full flex flex-col-1 justify-center px-4">
                      <div className="w-full h-full grid grid-cols-1 gap-4">
                        <div className="flex flex-col items-center justify-center">
                          <h1 className="font-bold text-3xl m-0">
                            Sign Up to <span className="text-azure">GabAi</span>
                          </h1>
                          <p className="block font-normal text-sm">
                            Register now for a richer, more empowered journey!
                          </p>
                          
                        </div>
                      
                      <span className="font-medium justify-center flex text-azure">
                              Personal Information 
                      </span>

                      <div className="bg-gray-200 rounded-lg h-2 w-full">
                        <div className="bg-azure-200 rounded-lg h-2 w-1/3"></div>
                      </div>

                      {/* Firstname*/}
                      <div>
                        <label htmlFor="firstname" className={label}>First Name</label>
                        <input
                          type="text"
                          name="firstname"
                          placeholder="Juan"
                          {...register("firstname", {
                            required: true,
                            pattern: /^[A-Za-zñÑ\s]+$/,

                          })}
                          className={input}
                          onKeyDown={handleKeyDown}
                        />
                        {errors.firstname &&
                          errors.firstname.type === "required" && (
                            <span className={warning}>
                              First Name is required
                            </span>
                          )}
                        {errors.firstname &&
                          errors.firstname.type === "pattern" && (
                            <span className={warning}>
                              First Name must contain only letters
                            </span>
                          )}
                      </div>  
                      
                      {/* Lastname*/}
                      <div>
                        <label htmlFor="lastname" className={label}>Last Name</label>
                        <input
                          type="text"
                          name="lastname"
                          placeholder="Dela Cruz"
                          {...register("lastname", {
                            required: true,
                            pattern: /^[A-Za-zñÑ\s]+$/,
                          })}
                          className={input}
                          onKeyDown={handleKeyDown}
                        />
                        {errors.lastname && errors.lastname.type === "required" && (
                          <span className={warning}>
                            Last Name is required
                          </span>
                        )}
                        {errors.lastname && errors.lastname.type === "pattern" && (
                          <span className={warning}>
                            Last Name must contain only letters
                          </span>
                        )}
                      </div>
                      
                      {/* Gender */}
                      <div className="flex flex-col">
                          <label htmlFor="gender" className={label}>Gender</label>
                          <select
                            name="gender"
                            id="gender"
                            {...register("gender", { required: true })}
                            className={input}
                            onKeyDown={handleKeyDown}
                          >
                            <option value="">- Select Gender -</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="LGBTQ">LGBTQ</option>
                            <option value="Prefer not to say">
                              Prefer not to say
                            </option>
                          </select>
                          {errors.gender && (
                            <span  className={warning}>
                              Gender is required
                            </span>
                          )}
                      </div>

                      {/* Birthdate*/}
                      <div>
                        <label htmlFor="birthdate" className={label}>Birthdate</label>
                        <input
                          type="date"
                          name="birthdate"
                          placeholder="mm/dd/yyyy"
                          {...register("birthdate", {
                            required: true,
                            validate: {
                              validAge: (value) => {
                                const currentDate = new Date();
                                const selectedDate = new Date(value);
                                let age =
                                  currentDate.getFullYear() -
                                  selectedDate.getFullYear();
                                const monthDiff =
                                  currentDate.getMonth() - selectedDate.getMonth();
                                const dayDiff =
                                  currentDate.getDate() - selectedDate.getDate();
                                if (
                                  monthDiff < 0 ||
                                  (monthDiff === 0 && dayDiff < 0)
                                ) {
                                  age--;
                                }
                                return age >= 18;
                              },
                            },
                          })}
                          className={input}
                          onKeyDown={handleKeyDown}
                        />
                        {errors.birthdate &&
                          errors.birthdate.type === "required" && (
                            <span className={warning}>
                              Birthdate is required
                            </span>
                          )}
                        {errors.birthdate &&
                          errors.birthdate.type === "validAge" && (
                            <span className={warning}>
                              You must be 18 years old or above
                            </span>
                          )}
                      </div>

                        {/* Next button */}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className={button}
                          onClick={nextStep}
                        >
                          Next {">"}
                        </button>
                      </div>  
                      </div>
                    </div>
                  </div>
                </div>
                </>
              )}
              

              {step === 2 && (
                <>
                  {/* Your fields for Address here */}

                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
                    `{" "}
                    <div className="modal relative h-auto w-[72%] sm:w-[57%] md:w-[52%] lg:w-[47%] xl:w-[37%] 2xl:w-[40%] rounded-2xl bg-white flex flex-col pt-7 py-10 p-3">
                    <Link to="#" className="absolute flex align-center p-1 inset-y-0 right-0">
                        <IoIosCloseCircleOutline
                          className="text-3xl cursor-pointer"
                          onClick={() => close()}/>
                      </Link>

                      <div className="w-full h-full flex flex-col-1 justify-center px-4">
                      <div className="w-full h-full grid grid-cols-1 gap-4">
                        <div className="flex flex-col items-center justify-center">
                          <h1 className="font-bold text-3xl m-0">
                            Sign Up to <span className="text-azure">GabAi</span>
                          </h1>
                          <p className="block font-normal text-sm">
                            Register now for a richer, more empowered journey!
                          </p>
                          
                        </div>
                        <span className="font-medium justify-center flex text-azure">
                              Address Information 
                        </span>

                        <div className="bg-gray-200 rounded-lg h-2 w-full">
                          <div className="bg-azure-200 rounded-lg h-2 w-2/3"></div>
                        </div>

                          {/* Region */}
                          <div>
                          <div className="flex flex-col">
                            <label htmlFor="region" className={label}>Region</label>
                            <select
                              name="region"
                              id="region"
                              {...register("region", { required: true })}
                              className={input}
                              onKeyDown={handleKeyDown}
                              value={selectedRegion}
                              onChange={(e) => setSelectedRegion(e.target.value)}
                            >
                              <option value="">-- Select Region --</option>
                              {regionOptions.map((region) => (
                                <option
                                  key={region.region_code}
                                  value={region.region_code}
                                >
                                  {region.region_name}
                                </option>
                              ))}
                            </select>
                            {errors.region && (
                              <span className={warning}>
                                Region is required
                              </span>
                            )}
                          </div>
                          </div>

                          {/* Province */}
                          <div>
                          <div className="flex flex-col">
                            <label htmlFor="province" className={label}>Province</label>
                            <select
                              name="province"
                              id="province"
                              {...register("province", { required: true })}
                              className={input}
                              onKeyDown={handleKeyDown}
                              value={selectedProvince}
                              onChange={(e) => setSelectedProvince(e.target.value)}
                            >
                              <option value="">-- Select Province --</option>
                              {provinceOptions.map((province) => (
                                <option
                                  key={province.province_code}
                                  value={province.province_code}
                                >
                                  {province.province_name}
                                </option>
                              ))}
                            </select>
                            {errors.province && (
                              <span className={warning}>
                                Province is required
                              </span>
                            )}
                          </div>
                          </div>

                          {/* City */}
                          <div>
                          <div className="flex flex-col">
                            <label htmlFor="city" className={label}>City</label>
                            <select
                              name="city"
                              id="city"
                              {...register("city", { required: true })}
                              className={input}
                              onKeyDown={handleKeyDown}
                              value={selectedCity}
                              onChange={(e) => setSelectedCity(e.target.value)}
                            >
                              <option value="">-- Select City --</option>
                              {cityOptions.map((city) => (
                                <option key={city.city_code} value={city.city_code}>
                                  {city.city_name}
                                </option>
                              ))}
                            </select>
                            {errors.city && (
                              <span className={warning}>
                                City is required
                              </span>
                            )}
                          </div>
                          </div>

                          {/* Barangay */}
                          <div>
                          <div className="flex flex-col">
                            <label htmlFor="barangay" className={label}>Barangay</label>
                            <select
                              name="barangay"
                              id="barangay"
                              {...register("barangay", { required: true })}
                              className={input}
                              onKeyDown={handleKeyDown}
                              value={selectedBarangay}
                              onChange={(e) => setSelectedBarangay(e.target.value)}
                            >
                              <option value="">-- Select Barangay --</option>
                              {barangayOptions.map((barangay) => (
                                <option
                                  key={barangay.brgy_code}
                                  value={barangay.brgy_code}
                                >
                                  {barangay.brgy_name}
                                </option>
                              ))}
                            </select>
                            {errors.barangay && (
                              <span className={warning}>
                                Barangay is required
                              </span>
                            )}
                          </div>
                          </div>
                          
                          <div
                            className="justify-between flex gap-2"
                          >
                            <a
                              href="#"
                              className={button}
                              onClick={prevStep}
                            >
                              {" "}
                              {"<"} Previous
                            </a>

                            <button
                              type="button"
                              className={button}
                              onClick={nextStep}
                            >
                              Next {">"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
                    {/* <div>
                      <Toaster
                          position="top-center"
                        />
                    </div> */}


                    <div className="modal relative h-auto w-[72%] sm:w-[57%] md:w-[52%] lg:w-[47%] xl:w-[37%] 2xl:w-[40%] rounded-2xl bg-white flex flex-col pt-7 py-10 p-3">
                    <Link to="#" className="absolute flex align-center p-1 inset-y-0 right-0">
                        <IoIosCloseCircleOutline
                          className="text-3xl cursor-pointer"
                          onClick={() => close()}/>
                      </Link>

                      <div className="w-full h-full flex flex-col-1 justify-center px-4">
                      <div className="w-full h-full grid grid-cols-1 gap-4">
                        <div className="flex flex-col items-center justify-center">
                          <h1 className="font-bold text-3xl m-0">
                            Sign Up to <span className="text-azure">GabAi</span>
                          </h1>
                          <p className="block font-normal text-sm">
                            Register now for a richer, more empowered journey!
                          </p>
                        </div>

                        <span className="font-medium justify-center flex text-azure">
                              Account Information 
                        </span>
                        <div className="bg-gray-200 rounded-lg h-2 w-full">
                          <div className="bg-azure-200 rounded-lg h-2 w-full"></div>
                        </div>

                         {/* {message && <div>{message}</div>} */}

                       {/*  Username */}
                          <div className="flex flex-col">
                            <label htmlFor="username" className={label}>Username</label>
                            <input
                              type="text"
                              name="username"
                              placeholder="juandelacruz123"
                              {...register("username", {
                                required: true,
                                minLength: 6,
                                maxLength: 24,
                                pattern: /^(?=.*[a-z\d.])(?=.*\d)[a-z\d]+$/i,
                              })}
                              className={input}
                              onKeyDown={handleKeyDown}
                            />
                            {errors.username &&
                              errors.username.type === "required" && (
                                <span className={warning}>
                                  Username is required
                                </span>
                              )}
                            {errors.username &&
                              errors.username.type === "minLength" && (
                                <span className={warning}>
                                  Username must be at least 6 characters
                                </span>
                              )}
                            {errors.username &&
                              errors.username.type === "maxLength" && (
                                <span className={warning}>
                                  Username cannot exceed 12 characters
                                </span>
                              )}
                            {errors.username &&
                              errors.username.type === "pattern" && (
                                <span className={warning}>
                                  Username must contain only lowercase letters{" "}
                                   and at least one number
                                </span>
                              )}
                       </div>

                            {/* Email */}
                            <div>
                            <label htmlFor="email" className={label}>Email</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="juandelacruz@domain.com"
                              {...register("email", {
                                required: true,
                                pattern:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regular expression for email validation
                              })}
                              className={input}
                              onKeyDown={handleKeyDown}
                            />
                            {errors.email && errors.email.type === "required" && (
                              <span className={warning}>
                                Email is required
                              </span>
                            )}
                            {error && (
                              <div className={warning}>{error}</div>
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                              <span className={warning}>
                                Invalid email address
                              </span>
                            )}
                            </div>

                            {/* Password */}
                            <div>
                            <label htmlFor="password" className={label}>Password</label>
                            <div className="relative flex flex-row w-full">
                              <input
                                id="password"
                                type={type}
                                name="password"
                                placeholder="●●●●●●●●"
                                {...register("password", {
                                  required: true,
                                  minLength: 8,
                                  maxLength: 24,
                                  pattern:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,24}$/,
                                })}
                                className={input}
                                onKeyDown={handleKeyDown}
                              />
                              <span
                                class="absolute inset-y-0 right-0 flex items-center justify-end mr-4"
                                onClick={handleToggle}
                              >
                                <Icon
                                  class=""
                                  icon={icon}
                                  size={15}
                                />
                              </span>
                            </div>

                            {errors.password &&
                              errors.password.type === "required" && (
                                <span className={warning}>
                                  Password is required
                                </span>
                              )}
                            {errors.password &&
                              errors.password.type === "minLength" && (
                                <span className={warning}>
                                  Password must be at least 8 characters
                                </span>
                              )}
                            {errors.password &&
                              errors.password.type === "maxLength" && (
                                <span className={warning}>
                                  Password cannot exceed 24 characters
                                </span>
                              )}
                            {errors.password &&
                              errors.password.type === "pattern" && (
                                <span className={warning}>
                                  Password must contain at least one number, 
                                  one capital letter, one small letter, and one{" "}
                                   special character
                                </span>
                              )}
                          </div>

                          {/* Confirm Password */}
                          <div>
                          <label htmlFor="confirmPassword" className={label}>Confirm Password</label>
                          <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="●●●●●●●●"
                            {...register("confirmPassword", {
                              required: true,
                              validate: {
                                passwordMatch: (value) => value === passwordValue
                              }
                            })}
                            className={input}
                            onKeyDown={handleKeyDown}
                          />
                          {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                            <span className={warning}>Confirm Password is required</span>
                          )}
                          {errors.confirmPassword && errors.confirmPassword.type === "passwordMatch" && (
                            <span className={warning}>Passwords do not match</span>
                          )}
                          </div>

                        <div className="w-full justfy-between flex gap-2">
                          <a href="#" className={button} onClick={prevStep}> {"<"} Previous</a>

                          <button type="submit" className={button}  >
                            Sign Up!
                          </button>
                        </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </>
              )}

              {passwordMatchError && (
                <span className={warning}>Passwords do not match</span>
              )}
            </form>
          </div>  
      )}
    </Popup>
  );
};

export default Signup;
