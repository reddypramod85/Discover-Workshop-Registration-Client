import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Box,
  Form,
  FormField,
  TextInput,
  Button,
  Heading,
  Header,
  Text
} from "grommet";
import axios from "axios";
import { ListItem } from "../../components";

const Register = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [companyErr, setCompanyErr] = useState("");
  const [workshopErr, setWorkshopErr] = useState("");
  const [error, setError] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);
  const [workshopNameDesc, setWorkshopNameDesc] = useState([]);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const getWorkshopsApi = `${apiEndpoint}/api/workshops`;
  const addCustomer = `${apiEndpoint}/api/customer/create`;

  let formIsValid = false;

  useEffect(() => {
    const getWorkshops = () => {
      axios({
        method: "GET",
        url: getWorkshopsApi
      })
        .then(response => {
          let arr = [];

          // Map created
          response.data.forEach(workshop => {
            arr.push({ ...workshop });
          });
          setWorkshopNameDesc([...workshopNameDesc, ...arr]);
        })
        .catch(error => {
          if (!error.response) {
            // network error
            setError(`Error submitting ${getWorkshopsApi}.`);
          } else {
            // this.errorStatus = error.response.data.message;
            setError(error.response.data.message);
          }
        });
    };
    getWorkshops();
    // eslint-disable-next-line
  }, []);

  const nameValidation = name => {
    //Name - only letters and space
    if (name) {
      if (!name.match(/^[a-zA-Z\s]+$/)) {
        setNameErr("Only letters and space");
      } else {
        setNameErr("");
      }
    } else {
      setNameErr("Please enter your name");
    }
  };
  const companyValidation = company => {
    //Company - only letters and space
    if (company) {
      if (!company.match(/^[a-zA-Z\s]+$/)) {
        setCompanyErr("Only letters and space");
      } else {
        setCompanyErr("");
      }
    } else {
      setCompanyErr("Please enter your company name");
    }
  };
  const emailValidation = email => {
    //Email
    if (email) {
      const emailtemp = email;
      let lastAtPos = emailtemp.lastIndexOf("@");
      let lastDotPos = emailtemp.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          emailtemp.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          emailtemp.length - lastDotPos > 2
        )
      ) {
        setEmailErr("Email is not valid");
      } else {
        setEmailErr("");
      }
    } else {
      setEmailErr("Please enter your company email");
    }
  };
  const workshopValidation = async workshop => {
    //Notebooks List - required
    if (workshop) {
      formIsValid = true;
      setWorkshopErr("");
    } else {
      formIsValid = false;
      setWorkshopErr("Please select a workshop");
    }
  };

  const handleValidation = async () => {
    //Workshop - required
    await workshopValidation(workshop);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await handleValidation();
    if (formIsValid) {
      axios({
        method: "POST",
        url: addCustomer,
        data: {
          name,
          email,
          company,
          workshop
        }
      })
        .then(response => {
          console.log("response", response);
          if (response.status >= 400) {
            return setSubmitStatus(false);
          } else if (response.status > 200) {
            setError(response.data);
            return setSubmitStatus(false);
          }
          setSubmitStatus(true);
        })
        .catch(error => {
          if (!error.response) {
            // network error
            setError(`Error submitting ${addCustomer}.`);
          } else {
            // this.errorStatus = error.response.data.message;
            setError(error.response.data.message);
          }
        });
    }
  };

  return (
    <Box
      align="center"
      justify="between"
      direction="row-responsive"
      background="background-front"
      border
      wrap={false}
      overflow="auto"
      fill="horizontal"
      flex="grow"
      pad={{ horizontal: "medium", vertical: "medium" }}
    >
      <Box
        align="center"
        justify="center"
        fill={true}
        // direction="column"
        pad="medium"
      >
        <Header
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: "xxsmall" }}
        >
          <Heading level={3} margin="none">
            Register for a Workshop
          </Heading>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: "xxsmall" }}
        ></Box>
        <Form onSubmit={handleSubmit}>
          <FormField label="Email" error={emailErr}>
            <TextInput
              type="text"
              required={true}
              placeholder="enter your company email"
              value={email}
              onChange={event => {
                emailValidation(event.target.value);
                setEmail(event.target.value);
              }}
            />
          </FormField>
          <FormField label="Name" error={nameErr}>
            <TextInput
              required={true}
              placeholder="enter your name"
              value={name}
              onChange={event => {
                nameValidation(event.target.value);
                setName(event.target.value);
              }}
            />
          </FormField>
          <FormField label="Company" error={companyErr}>
            <TextInput
              required={true}
              placeholder="enter your company name"
              value={company}
              onChange={event => {
                companyValidation(event.target.value);
                setCompany(event.target.value);
              }}
            />
          </FormField>
          <FormField label="Workshops" error={workshopErr}>
            <Box pad="xsmall" gap="xsmall">
              {workshopNameDesc &&
                workshopNameDesc.length &&
                workshopNameDesc.map(workshopData => (
                  <ListItem
                    key={workshopData.name}
                    workshopNameDesc={workshopData}
                    setWorkshop={setWorkshop}
                    setWorkshopErr={setWorkshopErr}
                    workshop={workshop}
                  />
                ))}
            </Box>
          </FormField>
          {error && (
            <Box
              align="center"
              justify="center"
              direction="row-responsive"
              pad="small"
              background="status-critical"
            >
              <Text>{error}</Text>
            </Box>
          )}
          <Box
            align="start"
            justify="center"
            direction="row-responsive"
            gap="medium"
            pad="small"
          >
            <Button
              label="Register"
              type="submit"
              hoverIndicator={true}
              primary={true}
              reverse={false}
              active={false}
            />
          </Box>
        </Form>
      </Box>
      {/* <Box
        align="center"
        justify="center"
        direction="column"
        fill={true}
        flex={true}
        round="medium"
      >
        <Image src="/img/gremlin-rockin.svg" />
      </Box> */}

      {submitStatus && (
        <Redirect
          to={{
            pathname: "/success",
            state: {
              name,
              email,
              company, //startDate, endDate,
              //workshopList,
              workshop
            }
          }}
        />
      )}
    </Box>
  );
};
export default Register;
