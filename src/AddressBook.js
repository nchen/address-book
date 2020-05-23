import React, { useState } from "react";

const addressData = [
  {
    id: 501,
    name: "Khali Zhang",
    location: "Shanghai",
    office: "C-103",
    officePhone: "x55778",
    cellphone: "650-353-1239",
  },
  {
    id: 200,
    name: "Tom Hanks",
    location: "Beijing",
    office: "A-001",
    officePhone: "y86759",
    cellphone: "138-002-93494",
  },
  {
    id: 302,
    name: "Jerry Mouse",
    location: "Shenzhen",
    office: "E-012",
    officePhone: "x29345",
    cellphone: "139-353-9999",
  },
  {
    id: 25,
    name: "Mary",
    location: "Shanghai",
    office: "B-302",
    officePhone: "z93954",
    cellphone: "185-123-4567",
  },
  {
    id: 987,
    name: "Tom Cat",
    location: "Shenzhen",
    office: "E-011",
    officePhone: "x93945",
    cellphone: "180-123-4567",
  },
  {
    id: 123,
    name: "Brandon",
    location: "Chengdu",
    office: "D-503",
    officePhone: "y20394",
    cellphone: "138-000-6666",
  },
];

const sortBy = (data, column) => {
  console.log("Ordering by: ", column);
  data.sort((a, b) => {
    if (a[column] < b[column]) {
      return -1;
    } else if (a[column] > b[column]) {
      return 1;
    }
    return 0;
  });
  return data;
};

const AddressBook = () => {
  let [column, setColumn] = useState("id");
  let data = sortBy(addressData, column);

  return (
    <table border="1" cellPadding="5">
      <tbody>
        <tr>
          <th rowSpan="2">
            <input type="checkbox" />
          </th>
          <th rowSpan="2" onClick={() => setColumn("id")}>
            ID
          </th>
          <th rowSpan="2" onClick={() => setColumn("name")}>
            Name
          </th>
          <th rowSpan="2" onClick={() => setColumn("location")}>
            Location
          </th>
          <th rowSpan="2" onClick={() => setColumn("office")}>
            Office
          </th>
          <th colSpan="2">Phone</th>
        </tr>
        <tr>
          <th onClick={() => setColumn("officePhone")}>Office</th>
          <th onClick={() => setColumn("cellphone")}>Home</th>
        </tr>
        {data.map((addr) => (
          <tr key={addr.id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{addr.id}</td>
            <td>{addr.name}</td>
            <td>{addr.location}</td>
            <td>{addr.office}</td>
            <td>{addr.officePhone}</td>
            <td>{addr.cellphone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AddressBook;
