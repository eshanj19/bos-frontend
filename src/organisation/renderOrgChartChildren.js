import React, { Component } from "react";
import OrgChartNode from "./OrgChartNode";

const renderOrgChartChildren = (
  node,
  setParentForNode,
  searchedUserList,
  onSearchUser,
  searchTerm,
  removeChildrenForNode,
  removeParentForNode
) => {
  const hasRightSibling = (childIndex) => {
    return (node.children || []).length > childIndex + 1;
  };

  const hasLeftSibling = (childIndex) => {
    return childIndex > 0;
  };

  const nodeLineBelow = (
    <td
      colSpan={(node.children || []).length * 2}
      className="nodeGroupCellLines"
    >
      <table className="nodeLineTable">
        <tbody>
          <tr>
            <td
              colSpan={2}
              className="nodeLineCell nodeGroupLineVerticalMiddle"
            />
            <td colSpan={2} className="nodeLineCell" />
          </tr>
        </tbody>
      </table>
    </td>
  );

  const childrenLinesAbove = (node.children || []).map((child, childIndex) => (
    <td colSpan="2" className="nodeGroupCellLines" key={childIndex}>
      <table className="nodeLineTable">
        <tbody>
          <tr>
            <td
              colSpan={2}
              className={
                "nodeLineCell nodeGroupLineVerticalMiddle" +
                (hasLeftSibling(childIndex) ? " nodeLineBorderTop" : "")
              }
            />
            <td
              colSpan={2}
              className={
                "nodeLineCell" +
                (hasRightSibling(childIndex) ? " nodeLineBorderTop" : "")
              }
            />
          </tr>
        </tbody>
      </table>
    </td>
  ));

  const children = (node.children || []).map((child, childIndex) => (
    <td colSpan="2" className="nodeGroupCell" key={childIndex}>
      {renderOrgChartChildren(
        child,
        setParentForNode,
        searchedUserList,
        onSearchUser,
        searchTerm,
        removeChildrenForNode,
        removeParentForNode
      )}
    </td>
  ));

  return (
    <table className="orgNodeChildGroup">
      <tbody>
        <tr>
          <td className="nodeCell" colSpan={(node.children || []).length * 2}>
            <OrgChartNode
              node={node}
              setParentForNode={setParentForNode}
              removeChildrenForNode={removeChildrenForNode}
              removeParentForNode={removeParentForNode}
              onSearchUser={onSearchUser}
              searchedUserList={searchedUserList}
              searchTerm={searchTerm}
            />
          </td>
        </tr>
        <tr>{(node.children || []).length > 0 && nodeLineBelow}</tr>
        <tr>{childrenLinesAbove}</tr>
        <tr>{children}</tr>
      </tbody>
    </table>
  );
};

export default renderOrgChartChildren;
