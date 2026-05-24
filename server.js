const express =require ("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const filepath = path.join(__dirname,"reports.json");
function readReports(){
    const data = fs.readFileSync(filepath,"utf-8");
    return JSON.parse(data);
    function saveReports(reports){
        fs. writeFileSync(filepath,JSON.stringify(reports,null,
       2));
    }
    app.post("/api/report",(req,res) => {
        const{name,location,issue,priority} =req.body;
        if(!name|| !location || !issue || !priority){
            return res.status(400).json({message:"كل الحقول مطلوبه"});
        }
        const reports = readReports();
        const newreport={
            id: Date.now(),
            name,
            location,
            issue,
            priority,
            status:"قيد المعالجه",
            date: new Date().toLocaleString()
    };
        reports.push(newReport);
        saveReports(reports);
        res.json({message:"تم ارسال البلاغ بنجاح",report:
            newReport});
});
}
    app.get("/api/reports",(req,res)=>{
        const reports = readReports();
        res.json(reports);
    });
    app.put ("/api/report/:id",(req,res) => {
        const reportId =parselnt(req.params.id);
        const{status} = req.body;

        const reports = readReports();
       const report = reports.find(r => r.id === reportId);

        if (!report) {
            return res.status(404).json({message:"البلاغ غير موجود"});
    }

    report.status = status;
    saveReports(reports);
res.json({message:"تم تحديث الحاله", report});
});
app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
});
    
