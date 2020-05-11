import React from "react";
import axios from "axios";
import { Box, Button, Table, TableBody, TableCell, TableRow } from "grommet";
import { Link } from "react-router-dom";

const Success = props => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const getWorkshopsCancelApi = `${apiEndpoint}/api/workshops`;
  const { name, company, email, workshopList } = props.location.state;
  const cancelWorkshop = () => {
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
      })
      .catch(error => {
        // if (!error.response) {
        //   // network error
        //   setError(`Error submitting ${getWorkshopsCancelApi}.`);
        // } else {
        //   // this.errorStatus = error.response.data.message;
        //   setError(error.response.data.message);
        // }
      });
  };
  return (
    <Box
      align="stretch"
      justify="center"
      direction="column"
      // round="medium"
      background={{ color: "background-front" }}
      pad="xsmall"
      fill={true}
    >
      {/* <Box
        align="center"
        justify="between"
        direction="column"
        margin={{ top: "large" }}
        gap="small"
        fill={true}
      >
        <Box
          align="center"
          justify="center"
          direction="row"
          gap="xlarge"
          fill={true}
        >
          <Box align="center" justify="center" basis="1/2" direction="row">
            <Text>Name</Text>
          </Box>
          <Box align="center" justify="center" basis="1/2" direction="row">
            <Text>{props.location.state.name}</Text>
          </Box>
        </Box>

        <Box
          align="center"
          justify="center"
          direction="row"
          gap="xlarge"
          fill={true}
        >
          <Box align="center" justify="center" basis="1/2" direction="row">
            <Text>Company</Text>
          </Box>
          <Box align="center" justify="center" basis="1/2" direction="row">
            <Text>{props.location.state.company}</Text>
          </Box>
        </Box>

        <Box
          align="center"
          justify="center"
          direction="row"
          gap="xlarge"
          fill={true}
        >
          <Box align="start" justify="center" basis="1/2" direction="row">
            <Text>Email</Text>
          </Box>
          <Box align="start" justify="center" basis="1/2" direction="row">
            <Text>{props.location.state.email}</Text>
          </Box>
        </Box>

        <Box
          align="center"
          justify="center"
          direction="row"
          gap="xlarge"
          fill={true}
        >
          <Box align="start" justify="center" basis="1/2" direction="row">
            <Text>Workshop List</Text>
          </Box>
          <Box align="start" justify="center" basis="1/2" direction="row">
            <Text>{props.location.state.workshopList.join(", ")}</Text>
          </Box>
        </Box>
      </Box> */}
      <Box align="center" justify="center" gap="small" pad="medium">
        <Table>
          <TableBody
            align="center"
            pad={{
              horizontal: "xlarge",
              vertical: "small",
              top: "small",
              bottom: "small"
            }}
          >
            <TableRow>
              <TableCell scope="row">
                <strong>Name</strong>
              </TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">
                <strong>Company</strong>
              </TableCell>
              <TableCell>{company}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">
                <strong>Email</strong>
              </TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell scope="row">
                <strong>Workshop List</strong>
              </TableCell>
              <TableCell>{workshopList.join(", ")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Box
        align="start"
        direction="row"
        justify="center"
        gap="small"
        pad="medium"
      >
        <Link to="/">
          <Button label="Register More Workshops" primary={true} />
        </Link>
        <Link to="/">
          <Button
            label="Cancel Workshops"
            primary={true}
            onClick={cancelWorkshop}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Success;
