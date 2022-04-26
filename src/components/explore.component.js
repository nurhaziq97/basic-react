import { FilterMatchMode, FilterOperator } from "primereact/api";
import React, { useState } from "react";

const ExplorePage = () => {
    const [blogs, setBlogList] = useState(null);

     const[filters, setFilters] = useState({
         'global'   : {value: null, matchMode: FilterMatchMode.CONTAINS},
         'title'    : {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
         'content'  : {operator: FilterOperator.AND, constraints: [{value: null, }]}
     });
}