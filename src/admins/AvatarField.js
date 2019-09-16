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
import Avatar from "@material-ui/core/Avatar";

const AvatarField = ({ record, size }) => (
  <Avatar
    src={`${record.avatar}?size=${size}x${size}`}
    size={size}
    style={{ width: size, height: size }}
  />
);

AvatarField.defaultProps = {
  size: 25
};

export default AvatarField;
