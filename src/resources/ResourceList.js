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
  BooleanInput,
  SearchInput,
  Filter,
  DatagridBody,
  SelectInput,
  crudUpdateMany
} from "react-admin";
import { connect } from "react-redux";
import {
  Menu,
  MenuItem,
  Fade,
  Button,
  TableCell,
  TableRow,
  Checkbox
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { withDataProvider } from "ra-core";
import ResourceTypeField from "./common/ResourceTypeField";
import { withSnackbar } from "notistack";
import { translate } from "react-admin";
import {
  RESOURCE_TYPE_FILE,
  RESOURCE_TYPE_REGISTRATION_FORM,
  RESOURCE_TYPE_TRAINING_SESSION,
  RESOURCE_TYPE_CURRICULUM,
  PERMISSION_FILE_CREATE,
  PERMISSION_REGISTRATION_FORM_CREATE,
  PERMISSION_CURICULA_CREATE,
  PERMISSION_TRAINING_SESSION_CREATE
} from "../constants";
import { hasAccess } from "ra-auth-acl";

const styles = {
  nb_commands: { color: "purple" }
};

const DatagridRow = ({
  record,
  resource,
  id,
  onToggleItem,
  children,
  selected,
  basePath,
  ...props
}) => (
  <TableRow key={id}>
    <TableCell padding="none">
      {record.status !== "pending" && (
        <Checkbox checked={selected} onClick={() => onToggleItem(id)} />
      )}
    </TableCell>
    {/* data columns based on children */}
    {React.Children.map(children, field =>
      field.props.id === "edit_button" ? (
        <TableCell>
          <Button
            color="primary"
            onClick={() => {
              props.history.push({
                pathname: `/resources/edit/${record.type}/${record.key}`
              });
            }}
          >
            <span>
              <EditIcon style={{ fontSize: "20px" }} />
            </span>
            <span style={{ marginLeft: "5px" }}>Edit</span>
          </Button>
        </TableCell>
      ) : (
        <TableCell key={`${id}-${field.props.source}`}>
          {React.cloneElement(field, {
            record,
            basePath,
            resource
          })}
        </TableCell>
      )
    )}
  </TableRow>
);

const ResourceFilter = translate(({ translate, ...props }) => (
  <Filter {...props}>
    <SearchInput label={translate("ra.title.name")} source="label" alwaysOn />
    <SelectInput
      label={translate("ra.title.type")}
      source="type"
      choices={[
        { id: RESOURCE_TYPE_TRAINING_SESSION, name: "Session" },
        { id: RESOURCE_TYPE_CURRICULUM, name: "Curriculum" },
        { id: RESOURCE_TYPE_FILE, name: "File" },
        { id: RESOURCE_TYPE_REGISTRATION_FORM, name: "Registration Form" }
      ]}
      alwaysOn
    />
    <BooleanInput
      label={translate("ra.action.active")}
      source="is_active"
      alwaysOn
    />
  </Filter>
));

const CreateActions = translate(({ translate, permissions, ...props }) => {
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
  console.log(permissions);

  return (
    <>
      <Button
        color="primary"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {translate("ra.action.create")}
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {hasAccess(permissions, PERMISSION_CURICULA_CREATE) && (
          <MenuItem onClick={() => handleMenuSelect(RESOURCE_TYPE_CURRICULUM)}>
            {translate("ra.option.curriculum")}
          </MenuItem>
        )}
        {hasAccess(permissions, PERMISSION_TRAINING_SESSION_CREATE) && (
          <MenuItem
            onClick={() => handleMenuSelect(RESOURCE_TYPE_TRAINING_SESSION)}
          >
            {translate("ra.option.training_session")}
          </MenuItem>
        )}
        {hasAccess(permissions, PERMISSION_FILE_CREATE) && (
          <MenuItem onClick={() => handleMenuSelect(RESOURCE_TYPE_FILE)}>
            {translate("ra.option.file")}
          </MenuItem>
        )}

        {hasAccess(permissions, PERMISSION_REGISTRATION_FORM_CREATE) && (
          <MenuItem
            onClick={() => handleMenuSelect(RESOURCE_TYPE_REGISTRATION_FORM)}
          >
            {translate("ra.option.registration_form")}
          </MenuItem>
        )}
      </Menu>
    </>
  );
});

const BosDatagridBody = props => (
  <DatagridBody {...props} row={<DatagridRow history={props.history} />} />
);
const BosDatagrid = props => (
  <Datagrid {...props} body={<BosDatagridBody history={props.history} />} />
);

const ResourcesList = translate(({ classes, translate, ...props }) => (
  <List
    {...props}
    sort={{ field: "last_modification_time", order: "DESC" }}
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
    <BosDatagrid history={props.history}>
      <TextField
        label={translate("ra.title.label")}
        source="label"
        type="text"
      />
      <ResourceTypeField
        label={translate("ra.title.type")}
        source="type"
        type="text"
      />
      <BooleanField label={translate("ra.action.active")} source="is_active" />
      <DateField
        label={translate("ra.title.created_on")}
        source="creation_time"
        showTime
      />
      <DateField
        label={translate("ra.title.last_mod")}
        source="last_modification_time"
        showTime
      />
      <ShowButton />
      <Button id="edit_button" color="primary">
        {translate("ra.action.edit")}
      </Button>
    </BosDatagrid>
  </List>
));
const mapStateToProps = state => {
  return {
    resourceList: state.admin.resources.resources.data
  };
};
export default withSnackbar(
  connect(mapStateToProps, { crudUpdateMany })(withDataProvider(ResourcesList))
);
