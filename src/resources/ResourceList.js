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
  ShowButton,
  List,
  TextField,
  Responsive,
  BooleanInput,
  SearchInput,
  Filter,
  DatagridBody,
  
  
} from "react-admin";
import { Menu, MenuItem, Fade, Button,TableCell,TableRow,Checkbox } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { RESOURCE_TYPES } from "../utils";

const styles = {
  nb_commands: { color: "purple" }
};

const DatagridRow = ({ record, resource, id, onToggleItem, children, selected, basePath, ...props }) => (
  <TableRow key={id}>
    <TableCell padding="none">
            {record.status !== 'pending' && <Checkbox
                checked={selected}
                onClick={() => onToggleItem(id)}
            />}
        </TableCell>
      {/* data columns based on children */}
      {React.Children.map(children, field => (
          <TableCell key={`${id}-${field.props.source}`}>
              {React.cloneElement(field, {
                  record,
                  basePath,
                  resource,
              })}
          </TableCell>
      ))}
      <TableCell>
        <Button onClick={() => 
          {props.history.push({ pathname: `/resources/edit/${record.type}/${record.key}` })}}>
        Edit
        </Button>
      </TableCell>
  </TableRow>
)

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
  const handleMenuSelect = item => {
    props.history.push({ pathname: `/resources/create/${item}` });
  };
  return (
    <>
      <Button
        color="primary"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
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
        <MenuItem onClick={() => handleMenuSelect("curriculum")}>
          Curriculum
        </MenuItem>
        <MenuItem onClick={() => handleMenuSelect("session")}>Session</MenuItem>
        <MenuItem onClick={() => handleMenuSelect("curriculum")}>
          Video
        </MenuItem>
      </Menu>
    </>
  );
};

const BosDatagridBody = (props) => <DatagridBody {...props} row={<DatagridRow {...props}/>}/>
const BosDatagrid = (props) => <Datagrid {...props} body={<BosDatagridBody {...props}/>}/>

const ResourcesList = ({ classes, ...props }) => (
  <List
    {...props}
    sort={{ field: "label", order: "ASC" }}
    perPage={25}
    filters={<ResourceFilter />}
    filterDefaultValues={{ is_active: true }}
    actions={<CreateActions {...props} />}
  >
    {/* <Responsive
      medium={
        <Datagrid
          {...props}
          body={
            <DatagridBody
              {...props}
              row={<DatagridRow {...props}/>}
            />
          }
        ></Datagrid>
      }
    /> */}
    <BosDatagrid {...props}>
      <TextField source="label" type="text" />
        <DateField label="Created on" source="creation_time" showTime />
        <DateField
          label="Modified on"
          source="last_modification_time"
          showTime
        />
        <BooleanField source="is_active" label="Active?" />
        <ShowButton />
    </BosDatagrid>
  </List>
);

export default withStyles(styles)(ResourcesList);
