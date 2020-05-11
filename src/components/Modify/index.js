import React, { useState, useEffect } from "react";
import axios from "axios";
import { Register } from "../../components";
const Modify = props => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const getCustomersByEmailApi = `${apiEndpoint}/api/customer/email`;
  //   const getWorkshopsCancelApi = `${apiEndpoint}/api/customer`;
  // const { email } = props.location.state;
  //   const email = "pramod-reddy.sareddy@hpe.com";
  const email = "pramod.sareddy@hpe.com";
  // const [customerList, setCustomerList] = useState([]);
  //   const [regWorkshopList, SetRegWorkshopList] = useState([]);
  // const [selectedWorkshopList, setSelectedWorkshopList] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [custID, setcustID] = useState("");
  const [company, setCompany] = useState("");
  // const [checked, setChecked] = React.useState(false);
  let regWorkshopList = [];
  useEffect(() => {
    const getCustomersByEmail = () => {
      axios({
        method: "GET",
        url: `${getCustomersByEmailApi}/${email}`
      })
        .then(response => {
          console.log("response", response);
          // Map created
          response.data.forEach(customer => {
            regWorkshopList.push(customer.workshopList);
            setName(customer.name);
            setCompany(customer.company);
            setcustID(customer.id);
            // setCustomerInfo({
            //   ...customerInfo,
            //   name: customer.name,
            //   company: customer.company
            // });
          });
          //   SetRegWorkshopList([...regWorkshopList, ...arr]);
          //   console.log("modify regWorkshopList", regWorkshopList);
        })
        .catch(error => {
          if (!error.response) {
            // network error
            setError(`Error submitting ${getCustomersByEmailApi}.`);
          } else {
            // this.errorStatus = error.response.data.message;
            setError(error.response.data.message);
          }
        });
    };
    getCustomersByEmail();
    // eslint-disable-next-line
  }, []);

  return (
    <Register
      regWkshpList={regWorkshopList}
      setEmail={email}
      setName={name}
      setcustID={custID}
      setCompany={company}
      setError={error}
      setTitle="Modify Registration"
      showInstructions={true}
      //   workshopList={workshopList}
    />
  );
};

export default Modify;
