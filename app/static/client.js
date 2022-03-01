var el = x => document.getElementById(x);
var type_lesion=''
var type_severity=''
function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function getClass(severity) {

  if(severity=='MEL'){
    return 'Melanoma';
  }
  if(severity=='NV'){
    return 'Melanocytic nevus';
  }
  if(severity=='BCC'){
    return 'Basal cell carcinoma';
  }
  if(severity=='AK'){
    return 'Actinic keratosis';
  }
  if(severity=='SCC'){
    return 'Squamous cell carcinoma';
  }
  if(severity=='VASC'){
    return 'Vascular lesion';
  }
  if(severity=='DF'){
    return 'Dermatofibroma';
  }
  if(severity=='BKL'){
    return 'Benign keratosis';
  }
  if(severity=='malignant'){
    return 'Malignant';
  }
  if(severity=='benign'){
    return 'Benign';
  }
}

function getInfo(name){
  if(name=='MEL'){
    return 'Melanoma, the most serious type of skin cancer, develops in the cells (melanocytes) that produce melanin — the pigment that gives your skin its color. Melanoma can also form in your eyes and, rarely, inside your body, such as in your nose or throat .Please consult your doctor as soon as possible';
  }
  if(name=='NV'){
    return 'A melanocytic nevus (also known as nevocytic nevus, nevus-cell nevus and commonly as a mole) is a type of melanocytic tumor that contains nevus cells. Some sources equate the term mole with "melanocytic nevus", but there are also sources that equate the term mole with any nevus form.';
  }
  if(name=='BCC'){
    return "Basal cell carcinoma is a type of skin cancer that most often develops on areas of skin exposed to the sun, such as the face. On brown and Black skin, basal cell carcinoma often looks like a bump that's brown or glossy black and has a rolled border. Basal cell carcinoma is a type of skin cancer.";
  }
  if(name=='AK'){
    return ': Also known as a solar keratosis, an actinic keratosis grows slowly and usually first appears in people over 40. You can reduce your risk of this skin condition by minimizing your sun exposure and protecting your skin from ultraviolet (UV) rays.Left untreated, the risk of actinic keratoses turning into a type of skin cancer called squamous cell carcinoma is about 5% to 10%.';
  }
  if(name=='SCC'){
    return 'Squamous cell carcinoma of the skin is usually not life-threatening, though it can be aggressive. Untreated, squamous cell carcinoma of the skin can grow large or spread to other parts of your body, causing serious complications.';
  }
  if(name=='VASC'){
    return 'Vascular lesions are relatively common abnormalities of the skin and underlying tissues, more commonly known as birthmarks.Vascular tumors may be benign (not cancer) or malignant (cancer) and can occur anywhere in the body. They may form on the skin, in the tissues below the skin, and/or in an organ.';
  }
  if(name=='DF'){
    return 'Dermatofibroma (superficial benign fibrous histiocytoma) is a common cutaneous nodule of unknown etiology that occurs more often in women. Dermatofibroma frequently develops on the extremities (mostly the lower legs) and is usually asymptomatic, although pruritus and tenderness can be present.';
  }
  if(name=='BKL'){
    return 'A seborrheic keratosis is a common noncancerous (benign) skin growth. People tend to get more of them as they get older.  The growths (lesions) look waxy or scaly and slightly raised.They are benign skin lesions and often do not require treatment. They are typically slow-growing, can increase in thickness over time, and they rarely resolve spontaneously.';
  }
  if(name=='malignant'){
    return 'Malignant tumors have cells that grow uncontrollably and spread locally and/or to distant sites. Malignant tumors are cancerous (ie, they invade other sites).Malignant tumors can spread rapidly and require treatment to avoid spread. If they are caught early, treatment is likely to be surgery with possible chemotherapy or radiotherapy. If the cancer has spread, the treatment is likely to be systemic, such as chemotherapy or immunotherapy.';
  }
  if(name=='benign'){
    return 'Benign tumors are those that stay in their primary location without invading other sites of the body. They do not spread to local structures or to distant parts of the body. Benign tumors tend to grow slowly and have distinct borders.Benign tumors are not usually problematic. However, they can become large and compress structures nearby, causing pain or other medical complications. For example, a large benign lung tumor could compress the trachea (windpipe) and cause difficulty in breathing. This would warrant urgent surgical removal. Benign tumors are unlikely to recur once removed.';
  }

}


function analyze() {
  var result;
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      result=`${response["result"]}`
      el("result-label").innerHTML=`${getClass(result)}`;
      el('result-info').innerHTML=`${getInfo(result)}` 
    }else{
      return
    }
    el("analyze-button").innerHTML = "Analyze";
    return `${result}`;
  };
  
  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

function severity() {
  var result;
  var uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/severity`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = async function(e) {
    if (this.readyState === 4) {
      var response = JSON.parse(e.target.responseText);
      result=`${response["result"]}`
      el("severity-label").innerHTML=`${getClass(result)}`; 
      el('severity-info').innerHTML=`${getInfo(result)}`;
    }
    else{
      return;
    }
    el("title-id").innerHTML='This is a pre-diagnosis report.'
    el("guidance-id").innerHTML='Your health is our most important concern.Try reaching your dermatologists and <br>make sure to have proper medications.'
    el("analyze-button").innerHTML = "Analyze";
  };
  
  var fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
  return result;
}

function run(){
  analyze()
  severity()
  el("results").classList.remove("display_none")
}
