# CSSPieChart
A CSS and JavaScript Pie Chart 

 CSS version of my SVG pie chart. <br />
 Built using conical gradients instead of SVG circles.
 
 ![css-pie-chart](css-pie-chart.png?raw=true "CSS Pie Chart")  
 
 As with the SVG version: the colours are random and change when the page is refreshed. <br />
 They can be fixed by adding a 'color' property to each entry in the JSON file: <br />
 ie. 

  { ...,    
   "color":"#00ff00"    
  }   
  or "rgba(0, 255, 0, 0.3)" for example - (low opacity of 0.3 for pastel shades here). <br />
  Use the data.json file as a template.  <br />
  Shares (percents) should add up to 100 or less. Free space is calculated.
 
