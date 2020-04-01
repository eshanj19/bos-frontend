import { REQUEST_STATUS_CHOICES } from "../constants";
import { withTranslate } from "react-admin";

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

const RequestStatusField = ({ record, translate }) => {
  if (record.status === REQUEST_STATUS_CHOICES[0]["id"]) {
    return translate("ra.request.pending");
  }
  if (record.status === REQUEST_STATUS_CHOICES[1]["id"]) {
    return translate("ra.request.approved");
  }
  if (record.status === REQUEST_STATUS_CHOICES[2]["id"]) {
    return translate("ra.request.rejected");
  }
  return record.gender;
};

RequestStatusField.defaultProps = {
  addLabel: true
};

export default withTranslate(RequestStatusField);
