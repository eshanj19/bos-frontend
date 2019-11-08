import React, { useEffect, useState } from "react";
import Session from "../common/Session";
import api from "../../api";
import uniqueId from "lodash/uniqueId";

export default function EditSession(props) {
  const [initialData, setInitialData] = useState(null);
  const [sessionName, setSessionName] = useState(null);
  const [sessionDescription, setSessionDescription] = useState(null);
  const randomId = type => uniqueId(`${type}_`);
  useEffect(() => {
    /**
     * make do server curriculum data to represent
     * internal data state
     */
    const ngoKey = localStorage.getItem("ngo_key");
    // axios.all([api.getFileDropdownOptionsForNgo(ngoKey),api.getMeasurementDropdownOptionsForNgo(ngoKey)])
    //   .then(axios.spread((fileMaster,measurementMaster) => {

    //   }))
    api.getResource(props.match.params.id).then(({ data: response }) => {
      const { data, label, description } = response;
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
          id: randomId("measurement"),
          type: 3
        };
      });
      const items = fileItems.concat(measurementItems);
      items.push({ id: 199 });
      const session = { items };
      // console.log(initialData);
      setInitialData(session);
      setSessionName(label);
      setSessionDescription(description);
    });
  }, []);
  return !initialData || !sessionName ? null : (
    <Session
      sessionName={sessionName}
      sessionDescription={sessionDescription}
      initialData={initialData}
    />
  );
}
