import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Text, Header, Heading, Form, FormField } from "grommet";
import { Redirect } from "react-router-dom";
import { ListItem } from "../../components";

const Cancel = props => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const getCustomersByEmailApi = `${apiEndpoint}/api/customer/email`;
  const getWorkshopsCancelApi = `${apiEndpoint}/api/customer`;
  // const { email } = props.location.state;
  const email = "pramod-reddy.sareddy@hpe.com";
  // const [customerList, setCustomerList] = useState([]);
  const [workshopList, setWorkshopList] = useState([]);
  // const [selectedWorkshopList, setSelectedWorkshopList] = useState([]);
  const [error, setError] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);
  const [workshopErr, setWorkshopErr] = useState("");
  const [workshopNameDesc, setWorkshopNameDesc] = useState([]);
  // const [checked, setChecked] = React.useState(false);

  let formIsValid = false;

  useEffect(() => {
    const getCustomersByEmail = () => {
      axios({
        method: "GET",
        url: `${getCustomersByEmailApi}/${email}`
      })
        .then(response => {
          let arr = [];

          // Map created
          response.data.forEach(customer => {
            arr.push({ name: customer.workshopList });
          });

          setWorkshopNameDesc([...workshopNameDesc, ...arr]);
          // setWorkshopNameDesc({ name: })
          // setCustomerList([...customerList, ...arr]);
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
        method: "POST",
        url: getWorkshopsCancelApi,
        data: {
          email,
          workshopList
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
            setError(`Error submitting ${getWorkshopsCancelApi}.`);
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
            Cancel Registered Workshops
          </Heading>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: "xxsmall" }}
        ></Box>
        <Form onSubmit={handleSubmit}>
          <FormField label="Workshop List" error={workshopErr}>
            <Box pad="xsmall" gap="xsmall">
              {workshopNameDesc &&
                workshopNameDesc.length &&
                workshopNameDesc.map(workshopData => (
                  <ListItem
                    key={workshopData.name}
                    workshopNameDesc={workshopData}
                    setWorkshopList={setWorkshopList}
                    setWorkshopErr={setWorkshopErr}
                    workshopList={workshopList}
                  />
                  // <Box direction="row" align="center" gap="small">
                  //   <CheckBox
                  //     name={workshop}
                  //     label={workshop}
                  //     checked={checked}
                  //     onChange={event => {
                  //       setChecked(event.target.checked);
                  //       setSelectedWorkshopList([
                  //         ...props.selectedWorkshopList
                  //       ]);
                  //     }}
                  //   />
                  // </Box>
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
              label="Cancel"
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
              // name,
              email,
              // company, //startDate, endDate,
              workshopList
              // workshop
            }
          }}
        />
      )}
    </Box>
  );
};

export default Cancel;
