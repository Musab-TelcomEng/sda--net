async function loadReports() {
    const reportsList =
    document.getElementByld("reportsList");
    const response = await fetch("/api/reports");
    const reports = await response.json();
    if (reports.length===0) {
        reportsList.innerHTML ="<p>لا توجد بلاغات حاليا</p>";
        return;
    }
    reportsList.innerHTML ="";
    reports.reverse().forEach(report =>{
        const div =document.createElement("div");
        div.style.border ="1px solid #ccc";
        div.style.padding ="10px";
        div.style.marginTop ="10px";
        div.style.borderRadius ="10px";
        div.innerHTML =`
        <p><b>الاسم:</b>${report.name}</p>
        <p><b>الموقع:</b>${report.location}</p>
        <p><b>المشكلة:</b>${report.issue}</p>
        <p><b>الأولوية:</b>${report.priority}</p>
        <p><b>التاريخ:</b>${report.date}</p>
        <p><b>الحالة:</b> <span style="color:blue">${report.status}</span></p>
        <select onchange="updateStatus(${report.id},
        this.value)">
        <option value="قيد المعالجة"<قيد المعالجة</option>
        <option value="تم الحل"<تم الحل</option>
        <option value="مرفوض"<مرفوض</option>
        </select>
        `;
        reportsList.appendChild(div);
    });
}
async function updateStatus(id,status){
    await fetch(`/api/report/${id}`,{
        method:"PUT",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({status})
    });
    loadReports();
}
loadReports();