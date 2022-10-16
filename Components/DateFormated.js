import React from "react";
import moment from "moment";
import "moment/locale/es";
import { Tooltip } from "@mui/material";
moment.locale();

export default function DateFormated({ date, preTexto, postTexto }) {
  if (!preTexto) preTexto = "";
  if (!postTexto) postTexto = "";
  const formatedDate = date;
  if (!date) return null;
  return (
    <Tooltip title={moment(formatedDate).format("LL")}>
      <div>
        {preTexto} {moment(new Date(formatedDate)).startOf("second").fromNow()}{" "}
        {postTexto}{" "}
      </div>
    </Tooltip>
  );
}
