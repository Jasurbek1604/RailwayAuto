import React, { useEffect, useState } from "react";
import {
  Table as T,
  Tr,
  Th,
  Td,
  Button,
  Container,
  Icon1,
  Icon2,
  Icon3,
  Header,
  Btn,
  Title,
  Epig,
} from "./style";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { months } from "../../../mock/mock";
import Cookies from "js-cookie";
import html2pdf from "html2pdf.js";

const Table = () => {
  const [body, setBody] = useState({
    information_confirmed_date: "2023-12-11T06:20:13.919Z",
    month_plan: {
      yanvar: 0,
      fevral: 0,
      mart: 0,
      aprel: 0,
      may: 0,
      iyun: 0,
      iyul: 0,
      avgust: 0,
      sentyabr: 0,
      oktyabr: 0,
      noyabr: 0,
      dekabr: 0,
    },
  });
  const [data, setData] = useState([]);

  const [edit, setEdit] = useState(false);

  const year = new Date().getFullYear();

  const getData = () => {
    fetch(`/api/anualyplan/getallanualyplanone?year=${year}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  const refresh = () => {
    fetch(`/api/anualyplan/createanualyplanone?year=${year}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((res) => res.json());
  };

  useEffect(() => {
    getData();
    refresh();
  }, [year]);

  const a = (number) => {
    switch (number) {
      case 1:
        return "Elektrovoz";
      case 2:
        return "Teplovoz";
      case 3:
        return "Drezina";
    }
  };

  const wrapper = document.getElementById("wrapper");
  const convertToPdf = () => {
    if (wrapper) {
      const pdfOptions = {
        margin: 5,
        filename: `plan${year}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      };

      document.querySelectorAll(".p").forEach((e) => {
        e.style.fontFamily = "Times New Roman";
      });

      html2pdf().from(wrapper).set(pdfOptions).save();
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    setBody({
      ...body,
      month_plan: {
        ...body?.month_plan,
        [name]: value,
      },
    });
  };

  const onSave = async (id) => {
    await fetch(`/api/anualyplan/updateanualyplanone/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(body),
    });
    setEdit(false);
    getData();
  };

  let tep = 0;
  return (
    <div className="container">
      <Header>
        <div className="title">Yillik Jadval 1.1 - {year}</div>
      </Header>
      <Container>
        <Epig>
          <div>
            <p>"TASDIQLAYMAN"</p>
            <p>"O'zbekiston temir yo'llari" AJ</p>
            <p>Boshqaruv raisi</p>
            <p>_________________ K. U. Xalikov </p>
            <p>"___"_________________2024-yil</p>
          </div>
        </Epig>
        <Title>
          "O'ztemiryolmashta'mir"AJsida teplovozlar, elektrovozlarni ta'mirdan
          chiqarish bo'yicha <div>2024 yil rejasi</div>
        </Title>
        <T className="table" border={1}>
          <thead>
            <Tr>
              <Th rowSpan={2}></Th>
              <Th rowSpan={2}>Lokomativ seriasi</Th>
              <Th rowSpan={2}>Ta'mirlash turi</Th>
              <Th rowSpan={2}>2024 yil reja</Th>
              {months.map((item) => (
                <Th key={item.value}>{item.label}</Th>
              ))}
              <Th rowSpan={2}>Tahrirlash</Th>
            </Tr>

            <Tr>
              {months.map((item) => (
                <Th key={item.value}>rejasi</Th>
              ))}
            </Tr>
          </thead>
          <tbody>
            <Tr style={{ background: "rgb(233, 233, 233)" }}>
              <Td
                style={{ maxWidth: "120px", background: "#fff" }}
                rowSpan={data.length + 2}
              >
                Lokomativlardan foydalanish boshqarmasi
              </Td>
              <Th colSpan={2}>Jami elektrovozlar</Th>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
            </Tr>
            {data.length !== 0 ? (
              data.map(
                ({ a_o_id, locomative_name, reprairtype, month_plan }) => {
                  let count = 0;
                  for (let i in month_plan) {
                    count += month_plan[i];
                  }
                  tep += count;
                  return (
                    <Tr key={a_o_id}>
                      <Th>{locomative_name.name}</Th>
                      <Th>{reprairtype}</Th>
                      <Th>{count}</Th>
                      {months.map((item) => {
                        return (
                          <Td key={item.value}>
                            {edit === a_o_id ? (
                              <Input
                                type="text"
                                name={item.label}
                                style={{ width: "50px" }}
                                onChange={handleChange}
                                defaultValue={month_plan[item.label]}
                              />
                            ) : month_plan[item.label] == "0" ? null : (
                              month_plan[item.label]
                            )}
                          </Td>
                        );
                      })}

                      <Td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "5px",
                            width: "100%",
                          }}
                        >
                          {edit === a_o_id ? (
                            <>
                              <Button
                                type="green"
                                onClick={() => onSave(a_o_id)}
                              >
                                <Icon2 />
                              </Button>
                              <Button type="red" onClick={() => setEdit(false)}>
                                <Icon3 />
                              </Button>
                            </>
                          ) : (
                            <Button type="gold" onClick={() => setEdit(a_o_id)}>
                              <Icon1 />
                            </Button>
                          )}
                        </div>
                      </Td>
                    </Tr>
                  );
                }
              )
            ) : (
              <Tr>
                <Td colSpan={5}>hech narsa topilmadi</Td>
              </Tr>
            )}
            <Tr style={{ background: "rgb(233, 233, 233)" }}>
              <Th colSpan={2}>Jami teplovozlar</Th>
              <Td>{tep}</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
            </Tr>
            <Tr style={{ background: "rgb(173, 173, 173)" }}>
              <Th colSpan={3}>Jami lokomativlar</Th>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td>0</Td>
              <Td></Td>
            </Tr>
            <tr>
              <td colSpan={20}>
                <div className="bottom">
                  <div className="bottomName">
                    Ishlab chiqarish boyicha direktor o'rinbosari:
                  </div>
                  <div className="bottomName">N.O.Ramatov</div>
                </div>
                <div className="bottom">
                  <div className="bottomName">
                    Ishlab chiqarish boyicha bosh distpecherlik bo'lim boshligi:
                  </div>
                  <div className="bottomName">J.Y.Shomurodov</div>
                </div>
              </td>
            </tr>
          </tbody>
        </T>
        <div className="footer">
          <Btn type="green" onClick={convertToPdf}>
            hujjatni saqlash
          </Btn>
        </div>
      </Container>
      <div style={{ display: "none" }}>
        <Container id="wrapper" style={{ border: "none" }}>
          <Epig>
            <div>
              <p className="p">"TASDIQLAYMAN"</p>
              <p className="p">"O'zbekiston temir yo'llari" AJ</p>
              <p className="p">Boshqaruv raisi</p>
              <p className="p">_________________ K. U. Xalikov </p>
              <p className="p">"___"_________________ yil</p>
            </div>
          </Epig>
          <Title className="p">
            "O'ztemiryolmashta'mir"AJsida teplovozlar, elektrovozlarni ta'mirdan
            chiqarish bo'yicha <div className="p">2024 yil rejasi</div>
          </Title>
          <T className="table" border={1}>
            <thead>
              <Tr>
                <Th className="p" rowSpan={2}></Th>
                <Th className="p" rowSpan={2}>
                  Lokomativ seriasi
                </Th>
                <Th className="p" rowSpan={2}>
                  Ta'mirlash turi
                </Th>
                <Th className="p" rowSpan={2}>
                  2023 yil reja
                </Th>
                {months.map((item, index) => (
                  <Th key={index} className="p">
                    {item.value}
                  </Th>
                ))}
              </Tr>

              <Tr>
                {months.map((item, index) => (
                  <Th key={index} className="p">
                    rejasi
                  </Th>
                ))}
              </Tr>
            </thead>
            <tbody>
              <Tr style={{ background: "rgb(233, 233, 233)" }}>
                <Td
                  style={{ maxWidth: "120px", background: "#fff" }}
                  rowSpan={data.length + 2}
                  className="p"
                >
                  Lokomativlardan foydalanish boshqarmasi
                </Td>
                <Th className="p" colSpan={2}>
                  Jami elektrovozlar
                </Th>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
              </Tr>
              {data.length !== 0 ? (
                data.map(
                  ({ a_o_id, locomative_name, reprairtype, month_plan }) => {
                    let count = 0;
                    for (let i in month_plan) {
                      count += month_plan[i];
                    }
                    tep += count;
                    return (
                      <Tr key={a_o_id}>
                        <Th className="p">{locomative_name.name}</Th>
                        <Th className="p">{reprairtype}</Th>
                        <Th className="p">{count}</Th>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.yanvar
                          )}
                        </Td>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.fevral
                          )}
                        </Td>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.mart
                          )}
                        </Td>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.aprel
                          )}
                        </Td>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.may
                          )}
                        </Td>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.iyun
                          )}
                        </Td>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.iyul
                          )}
                        </Td>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.avgust
                          )}
                        </Td>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.sentyabr
                          )}
                        </Td>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.oktyabr
                          )}
                        </Td>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.noyabr
                          )}
                        </Td>
                        <Td className="p">
                          {edit === a_o_id ? (
                            <Input type="text" style={{ width: "50px" }} />
                          ) : (
                            month_plan.dekabr
                          )}
                        </Td>
                      </Tr>
                    );
                  }
                )
              ) : (
                <Tr>
                  <Td className="p" colSpan={12}>
                    hech narsa topilmadi
                  </Td>
                </Tr>
              )}
              <Tr>
                <Th
                  style={{ background: "rgb(233, 233, 233)" }}
                  className="p"
                  colSpan={2}
                >
                  Jami teplovozlar
                </Th>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  {tep}
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
                <Td style={{ background: "rgb(233, 233, 233)" }} className="p">
                  0
                </Td>
              </Tr>
              <Tr style={{ background: "rgb(233, 233, 233)" }}>
                <Th className="p" colSpan={3}>
                  Jami lokomativlar
                </Th>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
                <Td className="p">0</Td>
              </Tr>
              <tr>
                <td colSpan={20}>
                  <div className="bottom">
                    <div className="p bottomName">
                      Ishlab chiqarish boyicha direktor o'rinbosari:
                    </div>
                    <div className="p bottomName">N.O.Ramatov</div>
                  </div>
                  <div className="bottom">
                    <div className="p bottomName">
                      Ishlab chiqarish boyicha bosh distpecherlik bo'lim
                      boshligi:
                    </div>
                    <div className="p bottomName">J.Y.Shomurodov</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </T>
        </Container>
      </div>
    </div>
  );
};

export default Table;
