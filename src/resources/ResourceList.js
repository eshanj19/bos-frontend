/*
 *  Copyright (c) 2019 Maverick Labs
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as,
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  List,
  TextField,
  Responsive,
  BooleanInput,
  SearchInput,
  Filter
} from "react-admin";
import {Menu,MenuItem,Fade,Button} from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import { RESOURCE_TYPES } from "../utils";

const styles = {
  nb_commands: { color: "purple" }
};

const ResourceFilter = props => (
  <Filter {...props}>
    <SearchInput label="Name" source="name" alwaysOn />
    <BooleanInput source="is_active" alwaysOn />
  </Filter>
);

const CreateActions = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuSelect = (item) => {
    console.log(props);
    props.history.push({pathname:`/resources/create/${item}`,
      state:{type : RESOURCE_TYPES.CIRRICULUM}});
  }
  return(
    <>
      <Button color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        Create
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleMenuSelect('curriculum')}>Curriculum</MenuItem>
        <MenuItem onClick={() => handleMenuSelect('session')}>Session</MenuItem>
        <MenuItem onClick={() => handleMenuSelect('curriculum')}>Video</MenuItem>
      </Menu>
    </>
  )
}

const ResourcesList = ({ classes, ...props }) => (
  <List
    {...props}
    sort={{ field: "label", order: "ASC" }}
    perPage={25}
    filters={<ResourceFilter />}
    filterDefaultValues={{ is_active: true }}
    actions={<CreateActions {...props}/>}
  >
    <Responsive
      medium={
        <Datagrid>
          <TextField source="label" type="text" />
          <DateField label="Created on" source="creation_time" showTime />
          <DateField
            label="Modified on"
            source="last_modification_time"
            showTime
          />
          <BooleanField source="is_active" label="Active?" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

export default withStyles(styles)(ResourcesList);
