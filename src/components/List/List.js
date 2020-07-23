import React from "react";
import "./List.scss"
import ListItem from "./__item/__item";

const List = ({list}) => {

    return (
        <div className={`list`}>
            {list}
        </div>
    )
}

List.Item = ListItem

export default List