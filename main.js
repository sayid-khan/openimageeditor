const fileinput = document.querySelector(".file-input"),
chooseimgbtn = document.querySelector(".choose-img");
previewimg= document.querySelector(".preview img");
filteroptions = document.querySelectorAll(".filter button");
filtername= document.querySelector(".filter-info .name");
filterslider= document.querySelector(".slider input");
filtervalue= document.querySelector(".filter-info .value");
rotateoptions= document.querySelectorAll(".rotate button");
resetfilterbtn= document.querySelector(".reset-filter");
saveimgbtn= document.querySelector(".save-img");


let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate =0 , fliphorizontal= 1 , flipvertical =1;


const applyfilters = ()=>{
    previewimg.style.transform = `rotate(${rotate}deg) scale(${fliphorizontal}, ${flipvertical})`
    previewimg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}




const loadimg = ()=>{
    let files = fileinput.files[0]; //getting user selected files
    if(!files) return  //return if user does not choose the image
    previewimg.src= URL.createObjectURL(files)   //URL.createObjectURL creates a url of passed file object
    previewimg.addEventListener('load',()=>{
        resetfilterbtn.click(); // clicking reset btn, so the filter value reset if the user select new img
        document.querySelector('.container').classList.remove('disable')
    })
}


filteroptions.forEach(options => {
    options.addEventListener("click",()=>{
        document.querySelector(".filter .active").classList.remove('active')
        options.classList.add('active')
        filtername.innerText = options.innerText

        if(options.id === "brightness"){
            filterslider.max ='200'
            filterslider.value = brightness;
            filtervalue.innerText = `${brightness}%`
        }
        else if (options.id === "saturation"){
            filterslider.max ='200'
            filterslider.value = saturation;
            filtervalue.innerText = `${saturation}%`
        }
        else if (options.id === "inversion"){
            filterslider.max ='100'
            filterslider.value = inversion;
            filtervalue.innerText = `${inversion}%`
        }
        else{
            filterslider.max ='100'
            filterslider.value = grayscale;
            filtervalue.innerText = `${grayscale}%`
        }
            
            
    })
});

const updatefilter = ()=>{
    filtervalue.innerText = `${filterslider.value}%`
    const selectedfilter = document.querySelector('.filter .active')   //getting selected filter button

    if(selectedfilter.id === 'brightness'){
        brightness=filterslider.value
    }
    else if(selectedfilter.id === 'saturation'){
        saturation=filterslider.value
    }
    else if(selectedfilter.id === 'inversion'){
        inversion=filterslider.value
    }
    else{
        grayscale=filterslider.value
    }

    applyfilters();
}


rotateoptions.forEach(options =>{
    options.addEventListener('click',()=>{
        if(options.id === 'left'){
            rotate -= 90;
        }
        else if(options.id === 'right'){
            rotate += 90;
        }
        else if(options.id === 'horizontal'){
            fliphorizontal = fliphorizontal === 1? -1 : 1
        }
        else{
            flipvertical = flipvertical === 1? -1 : 1

        }
        applyfilters()
    })
})

const resetfilter = ()=>{
        brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
        rotate =0 , fliphorizontal= 1 , flipvertical =1;
        filteroptions[0].click(); // clicking brightness btn, so the brightness selected by default
        applyfilters()
}


const saveimg = ()=>{
    
    const canvas = document.createElement('canvas') // creating canvas element
    const ctx =canvas.getContext('2d')  // canvas.getcontextretuen a drawing contsxt on the canvas
    canvas.width = previewimg.naturalWidth
    canvas.height = previewimg.naturalHeight
    // apply user selected filter to canvas filter
    ctx.filter =`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    // translating canvas from center
    ctx.translate(canvas.width / 2, canvas.height / 2)
    //if rotate value isnt 0 rotate the canvas
    if(rotate !==0){
        ctx.rotate(rotate * Math.PI / 180)
    } 
    // apply user selected flip to camvas
    ctx.scale(fliphorizontal,flipvertical)   
    //drawImage provides different ways to draw an image onto the canvas
    //drawImage(image to draw, dx, dy, dWidth, dHeight)
    ctx.drawImage(previewimg,-canvas.width / 2, -canvas.height / 2,canvas.width,canvas.height)

    const link =document.createElement('a')  // creating element <a>
    link.download = "image.jpg"; // passing <a> tag download value to "image.jpg"
    //toDataURL returns a data URL containing a representation of image
    link.href = canvas.toDataURL(); // passing <a> tag href value to canvas data url
    link.click() //clicking the <a> tag so that the image gets downloaded
}




fileinput.addEventListener('change',loadimg)
filterslider.addEventListener("input",updatefilter)
resetfilterbtn.addEventListener("click",resetfilter)
chooseimgbtn.addEventListener('click', ()=> fileinput.click())
saveimgbtn.addEventListener("click",saveimg)
