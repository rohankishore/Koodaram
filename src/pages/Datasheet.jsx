import React from "react";
import "./Datasheet.css";

const Datasheet = () => (
  <div className="datasheet-container">
Total Hostels:     127
Total Colleges:    9
Male Hostels:      66
Female Hostels:    60
Gender Distribution: 66 M (51%) | 60 F (47%)
================================================================================

✓ Report exported to: c:\Users\rohan\PycharmProjects\koodaram-data\college_count_report.csv

PS C:\Users\rohan\PycharmProjects\koodaram-data&gt; & "C:/Program Files/Python311/python.exe" c:/Users/rohan/PycharmProjects/koodaram-data/college_count.py
Loading hostel data...

================================================================================
HOSTEL COUNT BY COLLEGE AND GENDER
================================================================================

College                                            Male     Female   Total
CUCEK                                              25       17       42
CUSAT                                              7        5        12
College of Engineering Trivandrum                  12       9        21
GEC Kozhikode                                      0        0        1
GEC Palakkad                                       0        7        7
GEC Thrissur                                       9        8        17
NSS College Palakkad                               1        1        2
RIT Kottayam                                       3        2        5
SCT Trivandrum                                     9        11       20
TOTAL                                              66       60       127
================================================================================

SUMMARY STATISTICS
Total Hostels:     127
Total Colleges:    9
Male Hostels:      66
Female Hostels:    60
Gender Distribution: 66 M (51%) | 60 F (47%)
================================================================================
    </pre>
    <h1>SUMMARY STATISTICS</h1>
    <div className="datasheet-summary">
      <ul>
        <li><strong>Total Hostels:</strong> 127</li>
        <li><strong>Total Colleges:</strong> 9</li>
        <li><strong>Male Hostels:</strong> 66</li>
        <li><strong>Female Hostels:</strong> 60</li>
        <li><strong>Gender Distribution:</strong> 66 M (51%) | 60 F (47%)</li>
      </ul>
      <div className="datasheet-export">✓ Report exported to:<br/><span>c:\Users\rohan\PycharmProjects\koodaram-data\college_count_report.csv</span></div>
    </div>

    <h2>Hostel Count by College and Gender</h2>
    <div className="datasheet-table-wrapper">
      <table className="datasheet-table">
        <thead>
          <tr>
            <th>College</th>
            <th>Male</th>
            <th>Female</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>CUCEK</td><td>25</td><td>17</td><td>42</td></tr>
          <tr><td>CUSAT</td><td>7</td><td>5</td><td>12</td></tr>
          <tr><td>College of Engineering Trivandrum</td><td>12</td><td>9</td><td>21</td></tr>
          <tr><td>GEC Kozhikode</td><td>0</td><td>0</td><td>1</td></tr>
          <tr><td>GEC Palakkad</td><td>0</td><td>7</td><td>7</td></tr>
          <tr><td>GEC Thrissur</td><td>9</td><td>8</td><td>17</td></tr>
          <tr><td>NSS College Palakkad</td><td>1</td><td>1</td><td>2</td></tr>
          <tr><td>RIT Kottayam</td><td>3</td><td>2</td><td>5</td></tr>
          <tr><td>SCT Trivandrum</td><td>9</td><td>11</td><td>20</td></tr>
          <tr className="datasheet-total"><td><strong>TOTAL</strong></td><td><strong>66</strong></td><td><strong>60</strong></td><td><strong>127</strong></td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default Datasheet;
