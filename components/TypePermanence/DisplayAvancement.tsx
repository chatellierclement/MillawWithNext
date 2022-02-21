import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { nanoid } from "nanoid";
import Link from "next/link";

export default function DisplayAvancement(props) {
  const [planning, setPlanning] = useState();

  let [result, setResult] = useState(0);

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
        // (10/moment(selectedDate).daysInMonth() * 100).toFixed(2)
      });

  }, [props.month]);

  return (
    <>
   
  <span className="badge bg-teal-50 text-teal-500">{result}%</span>;
    </>
  ) 
  
  
}
