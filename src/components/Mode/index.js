import React, { useState } from "react";
import { Box, Button } from "grommet";
import { Actions, StatusInfo } from "grommet-icons";

const Mode = () => {
  // const [mode, setMode] = useState("dark");
  let modeName = "Dark Mode";
  const changeMode = () => {};
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  let disabled = false;

  const onClose = () => setOpen(undefined);

  return (
    <Box direction="row" align="center" gap="small">
      <Box>
        <Button icon={Actions} onClick={changeMode}>
          Dark Mode
        </Button>
      </Box>
      <Button icon={<StatusInfo />} onClick={onOpen} />
    </Box>
  );
};

export default Mode;
