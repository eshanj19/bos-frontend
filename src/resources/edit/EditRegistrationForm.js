import React, { useEffect, useState } from "react";
import Session from "../common/Session";
import api from "../../api";
import uniqueId from "lodash/uniqueId";
import { LOCAL_STORAGE_NGO_KEY } from "../../constants";

export default function EditRegistrationForm(props) {
  const [initialData, setInitialData] = useState(null);
  const randomId = type => uniqueId(`${type}_`);
  useEffect(() => {
    /**
     * make do server curriculum data to represent
     * internal data state
     */
    const ngoKey = localStorage.getItem(LOCAL_STORAGE_NGO_KEY);
    // axios.all([api.getFileDropdownOptionsForNgo(ngoKey),api.getMeasurementDropdownOptionsForNgo(ngoKey)])
    //   .then(axios.spread((fileMaster,measurementMaster) => {

    //   }))
    api.getResource(props.match.params.id).then(({ data: response }) => {
      const {
        data,
        label: sessionName,
        description: sessionDescription
      } = response;
      const { files, measurements } = data;
      const fileItems = files.map(file => {
        return {
          key: file.key,
          id: randomId("file"),
          type: 4
        };
      });
      const measurementItems = measurements.map(measurement => {
        return {
          key: measurement.key,
          is_required: measurement.is_required,
          id: randomId("measurement"),
          type: 3
        };
      });
      const items = fileItems.concat(measurementItems);
      items.push({ id: 199 });
      const session = { items };
      setInitialData({ session, sessionName, sessionDescription });
    });
  }, []);
  return !initialData ? null : (
    <Session initialData={initialData} isRegistrationForm={true} />
  );
}
