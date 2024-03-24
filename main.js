let arrayofworks = []
arrayofworks.push(["static/images/TwoYoungWomen20958.jpg 3.75x", 20958])
arrayofworks.push(["static/images/Yui2920.jpg 3.75x", 2920])
arrayofworks.push(["static/images/SnowyLandscape36315.jpg 3.75x", 36315])
arrayofworks.push(["static/images/ShowerBelow87008.jpg 2.60x", 87008])
arrayofworks.push(["static/images/Shirasuka18307.jpg 2.5x", 8307])
arrayofworks.push(["static/images/Seba11054.jpg 2.38x", 11054])
arrayofworks.push(["static/images/Nakamura12760.jpg 3.75x", 12760])
arrayofworks.push(["static/images/Kameyama3028.jpg 3.75x", 3028])
arrayofworks.push(["static/images/Hamamatsu4371.jpg 2.8x", 4371])
arrayofworks.push(["static/images/Arai4378.jpg 2.73x", 4378])

let workcounter = 0

const getData = async(artid) => {
    const result = await fetch(`https://api.artic.edu/api/v1/artworks/${artid}`, {
        method: 'GET',
        headers: {
            'AIC-User-Agent' : 'aic-bash (thebotanist856@gmail.com)'
        },
    });
    let paintobject = await result.json();
    return paintobject
};

let artist = "Artist Name: ".bold()
let artdate = "Date of Art Release: ".bold()
let description = "Description: ".bold()
let awt = "Artwork Type Title: ".bold()
let classiff = "Classification Title: ".bold()

function APIData(artid){
    getData(artid).then(artwork =>{
        var artistname = artwork.data.artist_title
        var newdate = artwork.data.date_display
        var descript = artwork.data.description
        var artworktype = artwork.data.artwork_type_title
    
        if (descript != null && descript[0] == "<"){
            descript = descript.slice(3, 871)
        }
    
        var arttitle = artwork.data.title
        var classification = artwork.data.classification_title
    
        arttit = document.getElementById("arttitle")
        arttit.innerHTML = arttitle
    
        newname = document.getElementById("artist_name")
        newname.innerHTML = artist + artistname
    
        ddisplay = document.getElementById("date_display")
        ddisplay.innerHTML = artdate + newdate
    
        desc = document.getElementById("description")
        desc.innerHTML = description + descript
    
        aworktype = document.getElementById("artworktype")
        aworktype.innerHTML = awt + artworktype
    
        classif = document.getElementById("classification_title")
        classif.innerHTML = classiff + classification
    
        poo = document.getElementById("place_of_origin")
    })
}

function nextWork(){
    var img = document.getElementById('photo')
    img.srcset = " "
    if (workcounter == 9){
        workcounter =  -1
    }
    workcounter += 1
    img.srcset = arrayofworks[workcounter][0]
    console.log(arrayofworks[workcounter][0])
    APIData(arrayofworks[workcounter][1])
}

function previousWork(){
    var img = document.getElementById('photo')
    img.srcset = " "
    if (workcounter == 0){
        workcounter =  10
    }
    workcounter -= 1
    img.srcset = arrayofworks[workcounter][0]
    console.log(arrayofworks[workcounter][0])
    APIData(arrayofworks[workcounter][1])
}

function fixInstruct(){
    instructext = document.getElementById("instructions")
    newinstruct = 'Please use the "Previous Work" and "Next Work" buttons below to cycle through the paintings. All information provided by '
    let annex = 'the Art Institute of Chicago API.'
    annex = annex.link('https://api.artic.edu/docs/')
    instructext.innerHTML = newinstruct + annex
}

fixInstruct()
APIData(20958)

