import React, { useState, useEffect } from 'react';

function Practice() {
  const [topEmployees, setTopEmployees] = useState([]);
  const [salarySum, setSalarySum] = useState(0);

  const data = [
    { id: 1, name: "Vineet Pancheshwar", position: "Developer", salary: "25000" },
    { id: 2, name: "Sandesh Pancheshwar", position: "Developer", salary: "30" },
    { id: 3, name: "Harsh Pancheshwar", position: "Developer", salary: "25" },
    { id: 4, name: "Ayush Pancheshwar", position: "Developer", salary: "1000" }
  ];

  useEffect(() => {
    // Step 1: Salary ke hisaab se descending order me sort karna
    const sortedData = [...data].sort(
      (a, b) => parseFloat(b.salary) - parseFloat(a.salary)
    );

    // Step 2: Top 2 employees lena
    const topTwo = sortedData.slice(0, 2);
    setTopEmployees(topTwo);

    // Step 3: map() se salary ka sum nikalna
    let total = 0;
    topTwo.map((emp) => {
      total += parseFloat(emp.salary);
      return null; // map() ko kuch return karna padta hai, but yahan value nahi chahiye
    });

    setSalarySum(total);
  }, []);

  return (
    <div style={{ padding: "20px" }} className="mt-20">
      <h1>Top 2 Employees with Highest Salary</h1>

      {topEmployees.map((emp) => (
        <div key={emp.id}>
          <p><strong>ID:</strong> {emp.id}</p>
          <p><strong>Name:</strong> {emp.name}</p>
          <p><strong>Position:</strong> {emp.position}</p>
          <p><strong>Salary:</strong> ₹{emp.salary}</p>
          <hr />
        </div>
      ))}

      <h2>Total Salary of Top 2 Employees: ₹{salarySum}</h2>
    </div>
  );
}

export default Practice;
