import React from "react";
import "./Datasheet.css";

const Datasheet = () => (
  <div className="datasheet-container">
    <h1>SUMMARY STATISTICS</h1>
    <pre className="datasheet-block">
--------------------------------------------------------------------------------
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
--------------------------------------------------------------------------------
CUCEK                                              25       17       42
CUSAT                                              7        5        12
College of Engineering Trivandrum                  12       9        21
GEC Kozhikode                                      0        0        1
GEC Palakkad                                       0        7        7
GEC Thrissur                                       9        8        17
NSS College Palakkad                               1        1        2
RIT Kottayam                                       3        2        5
SCT Trivandrum                                     9        11       20
--------------------------------------------------------------------------------
TOTAL                                              66       60       127
================================================================================

SUMMARY STATISTICS
--------------------------------------------------------------------------------
Total Hostels:     127
Total Colleges:    9
Male Hostels:      66
Female Hostels:    60
Gender Distribution: 66 M (51%) | 60 F (47%)
================================================================================
    </pre>
  </div>
);

export default Datasheet;
