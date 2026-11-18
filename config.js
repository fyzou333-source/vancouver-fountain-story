var config = {
    // A pale basemap keeps the fountain colors visible. The basemap style. OpenFreeMap's styles need no account and no key.
    style: "https://tiles.openfreemap.org/styles/positron",

    // No centre markers, don't want to be misundertand as a drinking fountain.
    showMarkers: false,

    // No overview map anywhere
    inset: false,

    // The colour of the story panels is "light"
    theme: "light",

    // 3D terrain (off here)
    use3dTerrain: false,

    // Move through the chapters by itself (off here)
    auto: false,

    title: "Finding Water in Vancouver",
    subtitle: "Explore fountain locations, parks, and reported operating seasons.",
    byline: "By Fengyu Zou",
    footer: "Fountain data: <a href='https://opendata.vancouver.ca/explore/assets/drinking-fountains/' target='_blank'>City of Vancouver</a>. Locations are approximate and records do not show live working status. Basemap: OpenFreeMap, OpenMapTiles, and openStreetMap contributors. Adapted from the <a href='https://github.com/FoldingSpace/maplibre-storymap' target='_blank'>FoldingSpace class storymap template</a>, based on MapLibre Storytelling by opengeos. Reuses fountain data from my Exploratory Lab 1.", 

    // The layers your story can show. Each layer starts invisible.
    // A chapter shows a layer when the layer's id is in the chapter's show list.
    layers: [
        {
            id: "my_fountains",
            type: "circle",
            data: "./drinking-fountains.geojson",
            paint: {
                // colors represent reported operating seasons. Blue for Year Round, Orange for May to October, if not then gray.
                "circle-color": ["match", ["get", "in_operation"],
                    ["year-round", "Year Round"], "#0077B6",
                    ["spring to fall", "May-October"], "#D55E00", 
                    "#707070"
                 ],
                "circle-radius": 5,
                "circle-stroke-color": "#FFFFFF",
                "circle-stroke-width": 1
            },
            // Fountain information shown when hovering over a point.
            popup: ["name", "location", "in_operation", "maintainer"],
        }
    ],

    // The chapters, in the order a reader scrolls through them
    chapters: [
        {
            alignment: "left",
            title: "Where are Vancouver's drinking fountains?",
            description: "Where could you find drinking water while exploring Vancouver? Each dot represents a fountain in the City's records. Hover over a dot for details. Blue means reported year-round operation, orange means seasonal operation, and gray means the season is not specified. These records do not show whether a fountain is working right now. For more information, visit the <a href='https://vancouver.ca/home-property-development/water-fountains.aspx' target='_blank' rel='noopener noreferrer'>City of Vancouver's drinking fountain information</a>.",
            location: { center: [-123.12, 49.26], zoom: 11, pitch: 0, bearing: 0 }
        },
        {
            alignment: "left",
            title: "Explore fountains around Stanley Park",
            description: "Look at the fountain locations around Stanley Park and the surrounding waterfront. Which are reported as year-round, and which are seasonal? Drag the map to explore and hover over the dots for details.",
            location: { center: [49.299999, -123.139999], zoom: 13, pitch: 0, bearing: 0 },
            
            legend: [
                { color: "#0077B6", label: "Year-round" },
                { color: "#D55E00", label: "Seasonal" },
                { color: "#707070", label: "Season not specified" },
            ],
            
            show: ["my_fountains"],
            // The reader can move and zoom the map in this chapter
            exploreAllowed: true
        },
        {
            alignment: "left",
            title: "Compare a different part of Vancouver",
            description: "Now explore Mount Pleasant and its surroundings. How does the pattern of fountain locations compare with the Stanley Park view? Both cahpters sue the same zoom level to support comparison. You can drag and zoom the map and hover over fountains for details.",
            location: { center: [49.259762, -123.107590], zoom: 13, pitch: 0, bearing: 0 },
            legend: [
                { color: "#0077B6", label: "Year-round" },
                { color: "#D55E00", label: "Seasonal" },
                { color: "#707070", label: "Season not specified" },
            ],
            show: ["my_fountains"],
            // The reader can move and zoom the map in this chapter
            exploreAllowed: true
        },
        {
            alignment: "left",
            title: "Elevation and the colours of the imagery",
            description: "Chapter four. This chapter uses the same satellite style as chapter three. The chart below is calculated from the map's view. Each row of the chart is a range of elevation. The colours in a row are the most common colours of the imagery at that elevation. Each colour in a row is clearly different from the others.",
            location: { center: [-123.2580, 49.2690], zoom: 14.5, pitch: 0, bearing: 0 },
            style: "./satellite-style.json",
            exploreAllowed: true,
            showMarker: false,
            // Another web page, shown in the panel
            embed: "./elevation-colours.html",
            embedHeight: 150,
            descriptionAfter: "Move the mouse over the elevation of a row. The map turns almost white outside that range of elevation. Move the mouse over a colour. Only the pixels close to that colour, at that elevation, keep their colour. The chart then shows the hex code of that colour, for example #4a5d3b. On a touch screen, tap an elevation or a colour. Drag the slider to change the saturation of the imagery on the map and in the chart. Saturation is how strong the colours are. The slider starts at +60 %, so the colours are stronger than in chapters three, five and six. In this chapter, you can also drag the map and zoom with the + and − buttons. The chart then changes."
        },
        {
            alignment: "left",
            title: "The Musqueam Declaration",
            description: "Chapter five. In 1976, Musqueam Elders and leaders signed the Musqueam Declaration. In it, the Musqueam people declare that they “hold aboriginal title to our land”. On 10 June 2026, Musqueam marked the Declaration's 50th anniversary. The map's view includes the lands and waters that the Declaration describes, from Howe Sound to the south bank of the Fraser River and out to the centre of Georgia Strait.",
            location: { center: [-123.1996, 49.2303], zoom: 9.3, pitch: 0, bearing: 0 },
            style: "./satellite-style.json",
            showMarker: false,
            showInset: false,
            // A video from Vimeo, shown in the panel
            embed: "https://player.vimeo.com/video/1200153323?dnt=1",
            embedHeight: 215,
            descriptionAfter: "Video: Musqueam Indian Band, <i>Celebrating The 50th Anniversary Of The Musqueam Declaration</i> (2026). Read more on Musqueam's page about <a href='https://www.musqueam.bc.ca/celebrating-the-50th-anniversary-of-the-musqueam-declaration/' target='_blank'>the 50th anniversary</a>, or read <a href='https://www.musqueam.bc.ca/wp-content/uploads/2018/06/musqueam_declaration.pdf' target='_blank'>the Declaration</a> (PDF)."
        },
        {
            alignment: "right",
            title: "Pacific Spirit Regional Park",
            description: "Chapter six. Pacific Spirit Regional Park lies between the campus and the City of Vancouver. Its forests, bog, creeks and beaches are habitat for many plants and animals.",
            location: { center: [-123.2295, 49.2575], zoom: 12.6, pitch: 0, bearing: 0 },
            style: "./satellite-style.json",
            showMarker: false,
            embed: "https://player.vimeo.com/video/490043811?h=45151a6105",
            embedHeight: 215,
            descriptionAfter: "Video: Metro Vancouver, <i>Pacific Spirit Regional Park Profile</i> (2020)."
        }
    ]
};

// Your own functions go below this line (see "Run your own code at a chapter" in README.md).
