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
  Text,
  // CheckBox,
  List
} from "grommet";
import axios from "axios";
import { ListItem } from "../../components";

const Register = props => {
  const [name, setName] = useState(props.setName);
  const [email, setEmail] = useState(props.setEmail);
  const [company, setCompany] = useState(props.setCompany);
  const [workshopList, setWorkshopList] = useState([]);
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [companyErr, setCompanyErr] = useState("");
  const [workshopErr, setWorkshopErr] = useState("");
  const [error, setError] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);
  const [workshopNameDesc, setWorkshopNameDesc] = useState([]);
  const [profileState, setProfileState] = useState(props);
  //SetRegisteredWorkshopList(props.registeredWorkshopList);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const getWorkshopsApi = `${apiEndpoint}/api/workshops`;
  let addCustomer;
  {
    props.showInstructions
      ? (addCustomer = `${apiEndpoint}/api/customer/edit/${props.setcustID}`)
      : (addCustomer = `${apiEndpoint}/api/customer/create`);
  }
  let method;
  {
    props.showInstructions ? (method = "PUT") : (method = "POST");
  }
  console.log("addCustomer", addCustomer);
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
  const workshopValidation = async workshopList => {
    //Notebooks List - required
    if (workshopList && workshopList.length > 0) {
      formIsValid = true;
      setWorkshopErr("");
    } else {
      formIsValid = false;
      setWorkshopErr("Please select a workshop");
    }
  };

  const handleValidation = async () => {
    //Workshop - required
    await workshopValidation(workshopList);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await handleValidation();
    if (formIsValid) {
      axios({
        method: method,
        url: addCustomer,
        data: {
          name,
          email,
          company,
          workshopList
        }
      })
        .then(response => {
          console.log("response", response);
          if (response.status >= 400) {
            return setSubmitStatus(false);
          } else if (response.status > 200) {
            if (
              response.data.message ===
              "You have already registered, please click on update to make changes!"
            ) {
              // setWorkshopNameDesc([...workshopNameDesc, ...arr]);
            }
            setError(response.data.message);
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
            {props.setTitle ? props.setTitle : "Register for Workshops"}
          </Heading>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: "xxsmall" }}
        ></Box>
        <Form onSubmit={handleSubmit}>
          <FormField label="Email" error={emailErr}>
            {props.setEmail ? (
              <Text
                margin={{
                  vertical: "xsmall",
                  horizontal: "xsmall",
                  top: "",
                  bottom: "...",
                  left: "...",
                  right: "..."
                }}
              >
                {props.setEmail}
              </Text>
            ) : (
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
            )}
          </FormField>
          <FormField label="Name" error={nameErr}>
            <TextInput
              required={true}
              placeholder="enter your name"
              value={props.setName ? props.setName : name}
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
              value={props.setCompany ? props.setCompany : company}
              onChange={event => {
                companyValidation(event.target.value);
                setCompany(event.target.value);
              }}
            />
          </FormField>
          {props.showInstructions && (
            <Box gap="medium" border pad="small">
              {/* <CheckBox
                checked
                label="Your Registered Workshops are checked"
              ></CheckBox>
              <CheckBox label="Your UnRegistered Workshops are UnChecked"></CheckBox> */}
              <List
                secondaryKey="name"
                border={false}
                // secondaryKey="percent"
                data={[
                  {
                    name: "* By default, registered workshops are autochecked"
                  },
                  {
                    name:
                      "* Please check/uncheck any available workshop to modify your registration"
                  }
                ]}
              />
              {/* <Text>
                Please check/uncheck any available workshop to modify your
                registration
              </Text> */}
            </Box>
          )}
          <FormField label="Workshops" error={workshopErr}>
            <Box pad="xsmall" gap="xsmall">
              {workshopNameDesc &&
                workshopNameDesc.length &&
                workshopNameDesc.map(workshopData => (
                  <ListItem
                    key={workshopData.name}
                    registeredWorkshopList={
                      profileState.regWkshpList
                        ? profileState.regWkshpList[0]
                        : profileState.regWkshpList
                    }
                    workshopNameDesc={workshopData}
                    setWorkshopList={setWorkshopList}
                    setWorkshopErr={setWorkshopErr}
                    workshopList={workshopList}
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
              label={
                props.showInstructions ? "Modify Registration" : "Register"
              }
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
              workshopList
              // workshop
            }
          }}
        />
      )}
    </Box>
  );
};
export default Register;
