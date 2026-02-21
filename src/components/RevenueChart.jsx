import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data=[
    { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4780 },
  { month: "May", revenue: 5890 },
  { month: "Jun", revenue: 6390 }
]

export default function RevenueCharts(){
    return(
        <div className="chart-card">
            <ResponsiveContainer >
                <LineChart  data={data}>
                    <XAxis stroke="white" strokeWidth={2} dataKey="month"/>
                    <YAxis stroke="white" strokeWidth={2}/>
                    <Tooltip/>
                    <Line  type="monotone" dataKey="revenue" stroke="rgb(80, 80, 203)"  strokeWidth={4}/>
                </LineChart>
        
            </ResponsiveContainer>
        </div>
        
            
       
        
    )
    
}