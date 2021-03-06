import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { nanoid } from "nanoid";
import Link from "next/link";
import moment from 'moment';

export default function DisplayAvancement(props) {
  const [planning, setPlanning] = useState();

  const { selectedDate } = props;
  
  const { setPermanences, permanences, id } = props;

  let [result, setResult] = useState("0");

  useEffect(() => {
    axios
      .get("/api/planning", {
        params: {
          month: props.month + 1,
          year: props.year,
          permanenceId: props.permanenceId,
        },
      })
      .then(function (response) {
        setPlanning(response.data);
        let value = "0"
        if (response.data !== "") {
           value = (response.data.event.length/moment(selectedDate).daysInMonth() * 100).toFixed(2)
        }         
        setResult(value)
      });

  }, [props.month, permanences]);

  return (
    <>
   
  <span className="badge bg-teal-50 text-teal-500">{result}%</span>
    </>
  ) 
  
  
}
