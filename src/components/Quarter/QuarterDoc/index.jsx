import React from "react";
import { Container, Div } from "./style";
import { useNavigate, NavLink } from "react-router-dom";
const QuarterDoc = () => {
  function getItem(label, key, children) {
    return {
      key,
      children,
      label,
    };
  }
  const items = [
    getItem("Четверть план - 2022", "sub1", [
      getItem(
        <NavLink to={`/quarter-plan/2022/1`}>I-Четверть план</NavLink>,
        "1"
      ),
      getItem(
        <NavLink to={`/quarter-plan/2022/2`}>II-Четверть план</NavLink>,
        "2"
      ),
      getItem(
        <NavLink to={`/quarter-plan/2022/3`}>III-Четверть план</NavLink>,
        "3"
      ),
      getItem(
        <NavLink to={`/quarter-plan/2022/4`}>VI-Четверть план</NavLink>,
        "4"
      ),
    ]),
    getItem("Четверть план - 2023", "sub2", [
      getItem(
        <NavLink to={`/quarter-plan/2023/1`}>I-Четверть план</NavLink>,
        "5"
      ),
      getItem(
        <NavLink to={`/quarter-plan/2023/2`}>II-Четверть план</NavLink>,
        "6"
      ),
      getItem(
        <NavLink to={`/quarter-plan/2023/3`}>III-Четверть план</NavLink>,
        "7"
      ),
      getItem(
        <NavLink to={`/quarter-plan/2023/4`}>VI-Четверть план</NavLink>,
        "8"
      ),
    ]),
  ];

  return (
    <div className="container">
      <div className="title">Четверть план</div>
      <Container>
        <Div defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Container>
    </div>
  );
};

export default QuarterDoc;
