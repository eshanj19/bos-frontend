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
import api from "../api";
import { withDataProvider } from "ra-core";
import ResourceTypeField from "./common/ResourceTypeField";
import { withSnackbar } from "notistack";
import { RESOURCE_TYPE_REGISTRATION_FORM } from "../constants";
import { translate } from "react-admin";

const styles = {
  nb_commands: { color: "purple" }
};

const BulkActionButtons = props => {
  const setAsCoachRegistration = id => {
    const ngoKey = localStorage.getItem("ngo_key");
    // crudUpdateMany("ping", id, null, "/ping");
    console.log(props);
    api
      .setAsCoachRegistrationSession(ngoKey, { resource: id })
      .then(response => {
        api.handleSuccess(response, props.enqueueSnackbar);
        props.history.push(props.basePath);
      })
      .catch(error => {
        api.handleError(error, props.enqueueSnackbar);
      });
  };
  const setAsAthleteRegistration = id => {
    const ngoKey = localStorage.getItem("ngo_key");
    api
      .setAsAthleteRegistrationSession(ngoKey, { resource: id })
      .then(response => {
        api.handleSuccess(response, props.enqueueSnackbar);
      })
      .catch(error => {
        api.handleError(error, props.enqueueSnackbar);
      });
  };
  const deactivateResource = id => {
    api.deactivateResource(id).then(response => {});
  };
  const activateResource = id => {
    api.activateResource(id).then(response => {});
  };
  const { resourceList, selectedIds } = props;

  if (
    selectedIds.length === 1 &&
    resourceList[selectedIds[0]].type === RESOURCE_TYPE_REGISTRATION_FORM
  ) {
    return (
      <>
        <Button
          onClick={() => {
            setAsCoachRegistration(selectedIds[0]);
          }}
        >
          {/* Set As Coach Registration */}
          {translate("ra.Set As Coach Registration")}
        </Button>
        <Button
          onClick={() => {
            setAsAthleteRegistration(selectedIds[0]);
          }}
        >
          {/* Set As Athlete Registration */}
          {translate("ra.Set As Athlete Registration")}
        </Button>

        {resourceList[selectedIds[0]].is_active === true ? (
          <Button
            onClick={() => {
              deactivateResource(selectedIds[0]);
            }}
            color="secondary"
          >
            {translate("ra.action.deactivate")}
          </Button>
        ) : (
          <Button
            onClick={() => {
              activateResource(selectedIds[0]);
            }}
          >
            {translate("ra.action.activate")}
          </Button>
        )}
      </>
    );
  } else {
    var areAllActive = true;
    var areAllInactive = true;
    selectedIds.forEach(selectedId => {
      var resource = resourceList[selectedId];
      if (resource.is_active === true) {
        areAllInactive = false;
      } else {
        areAllActive = false;
      }
    });
    if (areAllActive === true && areAllInactive === false) {
      return (
        <Button
          onClick={() => {
            deactivateResource(selectedIds[0]);
          }}
        >
          {translate("ra.action.deactivate")}
        </Button>
      );
    } else if (areAllActive === false && areAllInactive === true) {
      return (
        <Button
          onClick={() => {
            activateResource(selectedIds[0]);
          }}
        >
          {translate("ra.action.activate")}
        </Button>
      );
    } else {
      return <div>YOLO</div>;
    }
  }
};

// const DatagridRow = withRouter(Row);

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
        { id: "session", name: "Session" },
        { id: "curriculum", name: "Curriculum" },
        { id: "file", name: "File" },
        { id: "registration", name: "Registration Form" }
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

const CreateActions = translate(({ translate, ...props }) => {
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
        <MenuItem onClick={() => handleMenuSelect("curriculum")}>
          {translate("ra.option.curriculum")}
        </MenuItem>
        <MenuItem onClick={() => handleMenuSelect("session")}>
          {translate("ra.option.training_session")}
        </MenuItem>
        <MenuItem onClick={() => handleMenuSelect("file")}>
          {translate("ra.option.file")}
        </MenuItem>
        <MenuItem onClick={() => handleMenuSelect("registration")}>
          {translate("ra.option.registration_form")}
        </MenuItem>
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
    sort={{ field: "label", order: "ASC" }}
    perPage={25}
    filters={<ResourceFilter />}
    filterDefaultValues={{ is_active: true }}
    actions={<CreateActions {...props} />}
    bulkActionButtons={<BulkActionButtons {...props} />}
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
