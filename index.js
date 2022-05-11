console.log('this is project 6 about postmaster');

let addedParamsCount = 0;
let paramsBox = document.getElementById('parametersBox');
paramsBox.style.display = 'none';

let reqJsonBox = document.getElementById('reqJsonBox');

let json = document.getElementById('json');
json.addEventListener('click',()=>{
    reqJsonBox.style.display = 'block';
    paramsBox.style.display = 'none';
});

function strToElement(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let params = document.getElementById('params');
params.addEventListener('click',()=>{
    paramsBox.style.display = 'block';
    reqJsonBox.style.display = 'none';
    
    let addBtn = document.getElementById('addBtn'); 
    addBtn.addEventListener('click',()=>{
        let addParams = document.getElementById('addParams');
        let string = `<div class="row g-3 my-2">
                        <legend class="col-form-label col-sm-2 pt-8">Parameter ${addedParamsCount+2} </legend>
                        <div class="col">
                             <input type="text" class="form-control" placeholder="enter Parameter ${addedParamsCount+2} Key" id="parameterKey${addedParamsCount+2}">
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="enter Parameter ${addedParamsCount+2} Value" id="parameterValue${addedParamsCount+2}">
                        </div>
                        <div class="col">
                            <button class="btn btn-primary removeParams">-</button>
                        </div>
                      </div>`;
      
      let reqParams = strToElement(string);
    //   console.log(reqParams);
      addParams.appendChild(reqParams);

    let deleteParam = document.getElementsByClassName('removeParams');
    for(item of deleteParam){
        item.addEventListener('click',(e)=>{
                e.target.parentElement.parentElement.remove();
        })
    }
    addedParamsCount++;
    })
})

let submit = document.getElementById('submitBtn');
submit.addEventListener('click',()=>{
    document.getElementById('responsePrism').innerHTML = "Please Wait...fetching response!";
    Prism.highlightAll();

    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    
    if(contentType == 'PARAMS'){
         data = {};
        for (let i = 0; i < addedParamsCount+1; i++) {
            if(document.getElementById('parameterKey'+(i+1))!=undefined)
            {
                let key = document.getElementById('parameterKey'+(i+1)).value;
                let value = document.getElementById('parameterValue'+(i+1)).value;
                data[key] = value;
            }

        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('reqJsonTxt').value;
    }
    console.log('url is',url);
    console.log('requestType is',requestType);
    console.log('contentType is',contentType);
    console.log("data is",data);

    if(requestType == 'GET'){
        fetch(url,{
            method:'GET',
        })
        .then(response =>response.text())
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{
                'Content-type':'application/json;charset=UTF-8'
            }
        })
        .then(response =>response.text())
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
})