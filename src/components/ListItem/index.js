import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Layer,
  Heading,
  Header,
  Paragraph,
  Text,
  CheckBox
} from "grommet";
import { Close, StatusInfo } from "grommet-icons";

const ListItem = props => {
  const [open, setOpen] = useState();
  const [checked, setChecked] = React.useState(false);
  const onOpen = () => setOpen(true);
  let disabled = false;
  const [controlCheck, setControlCheck] = useState(`checked={
    props.registeredWorkshopList
      ? props.registeredWorkshopList.includes(props.workshopNameDesc.name)
      : checked
  }`);

  const onClose = () => setOpen(undefined);

  const toggle = () => {
    setControlCheck(`checked = { checked }`);
    console.log("toggle controlCheck", controlCheck);
  };

  if (props.workshopNameDesc.capacity <= 0) disabled = true;

  console.log("controlCheck", controlCheck);
  return (
    <Box direction="row" align="center" gap="small">
      <CheckBox
        name={props.workshopNameDesc.name}
        label={props.workshopNameDesc.name}
        {...controlCheck}
        disabled={
          props.registeredWorkshopList &&
          props.registeredWorkshopList.includes(props.workshopNameDesc.name)
            ? false
            : disabled
        }
        onChange={event => {
          // if (!props.registeredWorkshopList) setChecked(event.target.checked);
          // setControlCheck(`checked = { checked }`);
          toggle();
          setChecked(event.target.checked);
          props.setWorkshopList([
            ...props.workshopList,
            props.workshopNameDesc.name
          ]);
          // setWorkshopNameDesc([...workshopNameDesc, ...arr]);
          props.setWorkshopErr("");
        }}
      />
      {props.workshopNameDesc.description && (
        <Button icon={<StatusInfo />} onClick={onOpen} />
      )}
      {disabled && (
        <Text color="status-critical"> Currently unavailable. Try later</Text>
      )}
      {open && (
        <Layer
          animate={true}
          modal={true}
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            align="center"
            justify="center"
            pad="medium"
            background={{ color: "background", dark: false }}
          >
            <Header
              align="center"
              direction="row"
              flex={false}
              justify="between"
              gap="medium"
            >
              <Heading margin="none" level="3">
                {props.workshopNameDesc.name}
              </Heading>
              <Button
                icon={<Close />}
                hoverIndicator={true}
                onClick={onClose}
              />
            </Header>
            <Paragraph>{props.workshopNameDesc.description}</Paragraph>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

ListItem.propTypes = {
  workshopNameDesc: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
  })
};

export default ListItem;
