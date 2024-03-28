//======== DARK MODE =====================================

const switchBtn = document.querySelector('#switchBtn');
const bodyRef = document.querySelector('body');
const darkModeKey = 'theme-dark';
const darkModeValue = 'active';
const cards = document.querySelector('.cards');
const heading = document.querySelector('#heading');
const aliasInput = document.querySelector('.text-input');
const sendBtn = document.querySelector('#send-btn');

//============**** FORMULÄR ****================================================

//Lyssnare som lyssnar efte när user släpper upp en key
aliasInput.addEventListener('keyup', () => {
    // VAd ska hända när user släpper upp en key
    // console.log('Du skrev något i input');
    //HÄmta värdet i input.
    // console.log(aliasInput.value);
    //Hämta längden på värdet i input
    // console.log(aliasInput.value.length);
    let getValueLength = aliasInput.value.length;
    //Kontrollera så att user skrivit 4 tecken
    //Villkoret om getValueLength är större än 3
    if (getValueLength > 3){
        //Om antalet tecken är större än 3
        // console.log('Det är mer än tecken');
        // Btn ska bli enabled
        sendBtn.disabled = false;
    }else{
        //Om antalet tecken är mindre än 3
        // console.log('Det är mindre än 3 tecken');
        sendBtn.disabled = true;
    }
}); 

//Lyssnare som lyssnar efter när input är i focus
aliasInput.addEventListener('focus' , () =>{
    // console.log('du står i input');
    //Lägga till klassen focusBorder
    aliasInput.classList.toggle('focusBorder');
});

//Lyssnare som lyssnar efter när input är i focus
aliasInput.addEventListener('blur' , () =>{
    // console.log('du står utanför input');
    //Lägga till klassen focusBorder
    aliasInput.classList.toggle('focusBorder');
});

//När vi klickar på 'show my name' så ska vi hämta innehållet i input och skriva ut det i rubriken under

sendBtn.addEventListener('click', () => {
    //Vad är det som ska hända när vi klickar på btn
    console.log('Du klickade på add');
    const inputText = document.querySelector('#aliasName');
    console.log(inputText.value);
    //HÄmtar inputs värde och sätter text inne i h1
    heading.textContent = inputText.value;
    // Rensa input från text
    inputText.value = '';
});



//======*** NASA FETCH API **=======================================================================================
//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=DEMO_KEY/7U6bHJkDZJWsKvYkGbi6ccowQrl3cyvDyuhkb5Mh

const apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=7U6bHJkDZJWsKvYkGbi6ccowQrl3cyvDyuhkb5Mh';


fetch(apiUrl)
    .then(response => response.json())
    .then (data => {
        const photos = data.photos;
        const photoContainer = document.querySelector('#mars');

        if(photos.length !== 0){
            // console.log('det finns data');

            //Loop för att loopa igenom data
            photos.forEach(photo =>{
                // console.log(photo.id);

                const newCard = createCard(photo);
                //Lägger till det nya kortet i container
                photoContainer.append(newCard);
            })
        }else{
            //Om det inte finns data skrivs console.log
            // console.log('Det finns ingen');
        }
    }).catch(error => console.log(`Detta är felet: ${error}`))

function createCard(photo){
    // console.log('createCard körs');

    const article = document.createElement('article');
    const h3 = document.createElement('h3');
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    const h4 = document.createElement('h4');

    article.classList.add('card');
    imgContainer.classList.add('mars-img');

    h3.textContent = photo.camera.name;
    h4.textContent = photo.rover.landing_date;

    //Sätta src på img
    img.setAttribute('src', `${photo.img_src}`);
    // img.setAttribute('src', `https://images-api.nasa.gov/search?media_type=${photo.img_src}`);

 
    //Lägger till element i article
    imgContainer.append(img);
    article.append(h3,imgContainer,h4);

    // console.log(article);

    //Skicka tillbaka till DOM
    return article; 
}

//======== DARK MODE ===================================================================================

//Kontrollera om det finns något i localStorage
if(localStorage.getItem(darkModeKey) === darkModeValue){
    //Om detta är sant så är localStorage satt och dark sak läggas till på body
    // console.log('Det finns ett localStorage satt');
    enabledDarkmode();
}

//Lägga till en lyssnare som lyssnar efter klick
switchBtn.addEventListener('click', () => {
    //Vad ska hända när vi klickar
    // console.log('Du klickade på switch');
    // bodyRef.classList.toggle('dark');
    //Anropa en funktion
    toggleDarkmode();
});

function toggleDarkmode(){
    //kontrollera om body har klassen dark
    // console.log('Nu körs toggle darkmode');
    //Kontrollera om body har klassen dark
    if(bodyRef.classList.contains('dark')){
        //Om body har klassen dark
        // console.log('klassen dark finns');
        disabledDarkmode();
    }else{
        console.log('Klassen dark finns inte');
        //Om klassen inte finns så vill vi lägga till klassen
        enabledDarkmode();
        
    }
}

function enabledDarkmode(){
    //Funktion för att lägga till dark klass
    // console.log('enabledDarkmode körs');
    switchBtn.checked = true;
    //Lägga till dark på body
    bodyRef.classList.add('dark');
    //Sätta localStorage
    setLocalstorage();
}

function disabledDarkmode(){
    //Funktion för att ta bort klassen dark
    // console.log('DisbleDarkmode körs');
    bodyRef.classList.remove('dark');
    //Funktion för att ta bort localstorage
    removeLocalStorage();
}

function setLocalstorage (){
    //funktion för att sätta localStorage
    // console.log('Sätt localstorage körs');
    //Sätter localStorage med en key och value
    localStorage.setItem(darkModeKey , darkModeValue);
}

function removeLocalStorage(){
    //Funktion för att ta bort localStorage
    // console.log('Removelocalstorage körs');
    //Ta bort satt localStorage
    localStorage.removeItem(darkModeKey);
}

