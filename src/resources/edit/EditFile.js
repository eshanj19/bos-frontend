import React, { useEffect, useState } from "react";
import File from "./../common/File";
import api from "../../api";

export default function EditFile(props) {
  const [initialData, setInitialData] = useState(null);
  useEffect(() => {
    const resourceId = props.match.params.id;
    api.getResource(resourceId).then(({ data }) => {
      const { label, description, is_active, is_shared } = data;
      setInitialData({
        selectedFileName: label,
        fileDescription: description,
        isActive: is_active,
        isShared: is_shared
      });
    });
  }, []);
  return !initialData ? null : <File initialData={initialData} />;
}
