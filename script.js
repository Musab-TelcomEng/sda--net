document.getElementByld("reportform").addEventListener("submit",async function(e){
    e.preventDefault();
    const name=
    document.getElementByld("name").value;
    const location=
    document.getElementByld("location").value;
    const issue=
    Document.getElementByld("issue").value
    const priority=
    document.getElementByld("priority").value
    const msg=document.getElementByld("msg");
    try{
        const redponse = await fatch("/api/report",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({name,location,issue,priority})
        });
        const data = await Response.json();
        msg.style.color="green";
        msg.textContent=data.message;
        document.getElementByld("reportform").reset();
    }catch (error){
        msg.style,color ="red";
        msg.textContent ="حدث خطأ أثناء الارسال";
    }
});