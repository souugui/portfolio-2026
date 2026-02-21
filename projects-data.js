const projects = [
    {
        title: "pineapple jar",
        client: "personal project",
        year: 2023,
        image: "assets/abacaxi.jpg",
        category: "personal",
        services: ["3D modeling", "lookdev"],
        description: "I was starting to study geometry nodes in blender and used a common known object in Brazil, the Pineapple jar - found primarly in our grandma's houses - to exercise procedural modeling and lookdev",
        credits: [
            { role: "modeling", name: "gui sousa" },
            { role: "lookdev", name: "gui sousa" }
        ],
        gallery: ["assets/abacaxi.jpg", "assets/project_square_1.png", "assets/project_wide_1.png"]
    },
    {
        title: "air diffuser",
        client: "personal project",
        year: 2023,
        image: "assets/akira.jpg",
        category: "personal",
        services: ["modeling", "lookdev", "animation"],
        description: "project developed with the intention to get better understanding of modeling and shading as well as animation",
        credits: [
            { role: "modeling", name: "gui sousa" },
            { role: "lookdev", name: "gui sousa" },
            { role: "animation", name: "gui sousa" }
        ],
        gallery: ["assets/akira.jpg", "assets/project_tall_1.png"]
    },
    {
        title: "pedal",
        client: "personal project",
        year: 2025,
        image: "assets/bike.jpg",
        category: "personal",
        services: ["product visualization", "animation"],
        description: "Product visualization showcasing the sleek design and engineering of urban cycling. Dynamic camera movements highlight every detail of the bike's frame and components.",
        credits: [
            { role: "modeling", name: "gui sousa" },
            { role: "lookdev", name: "gui sousa" }
        ],
        gallery: ["assets/bike.jpg", "assets/project_square_1.png"]
    },
    {
        title: "rampage rally",
        client: "clint jones (aka pwnisher)",
        year: 2025,
        image: "assets/carrin.jpg",
        category: "commercial",
        services: ["animation", "lookdev"],
        description: "clinton jones, aka pwnisher, does this 1-month challenges regularly to gather the 3d community to exercise their skills and create 6 seconds animations with the provided template. the name of this challenge was rampage rally, mine was inspired by my childhood, when i used to play in my backyard with my toys.",
        credits: [
            { role: "layout", name: "clinton jones" },
            { role: "base animation", name: "clinton jones" },
            { role: "animation", name: "gui sousa" },
            { role: "lookdev", name: "gui sousa" }
        ],
        gallery: ["assets/carrin.jpg", "assets/project_wide_1.png"]
    },
    {
        title: "ps3 headset",
        client: "personal project",
        year: 2024,
        image: "assets/djully.jpg",
        category: "personal",
        services: ["modeling", "lookdev"],
        description: "project developed to exercise modeling and lookdev",
        credits: [
            { role: "modeling", name: "gui sousa" },
            { role: "lookdev", name: "gui sousa" }
        ],
        gallery: ["assets/djully.jpg", "assets/project_tall_1.png"]
    },
    {
        title: "36 days of type",
        client: "personal project",
        year: 2023,
        image: "assets/domingo.jpg",
        category: "personal",
        services: ["layout", "lookdev", "compositing"],
        description: "36 days of type is an annual project that invites designers, illustrator and visual artists to express their unique interpretation of the letters and numbers of the latin alphabet. in 2023 I created my version around the theme 'football', in which i assembled the scenes using pre-made assets, set up lighting, and handled final compositing with a time limit to finish each letter within 3˜5 hours, which didn't work for every letter, but it was a great challenge to be part of.",
        credits: [
            { role: "layout", name: "gui sousa" },
            { role: "lookdev", name: "gui sousa" },
            { role: "compositing", name: "gui sousa" }
        ],
        gallery: ["assets/domingo.jpg", "assets/project_square_1.png", "assets/project_wide_1.png"]
    },
    {
        title: "life lately",
        client: "personal project",
        year: 2025,
        image: "assets/life-lately.jpg",
        category: "personal",
        services: ["layout", "lookdev", "animation"],
        description: "short animations exploring different geometry nodes, using pre made assets to express a busy moment in my life",
        credits: [
            { role: "layout", name: "gui sousa" },
            { role: "lookdev", name: "gui sousa" },
            { role: "animation", name: "gui sousa" }
        ],
        gallery: ["assets/life-lately.jpg", "assets/project_tall_1.png"]
    },
    {
        title: "mega builds",
        client: "personal project",
        year: 2024,
        image: "assets/ps3-fone.jpg",
        category: "personal",
        services: ["modeling", "lookdev", "animation", "compositing"],
        description: "I was at the mall with my girlfriend when we passed by the toys store and imediately saw this box of 'Mega Construções', a toy we used to play a lot when we were kids and I knew I had to create something about it that week.",
        credits: [
            { role: "modeling", name: "gui sousa" },
            { role: "lookdev", name: "gui sousa" },
            { role: "animation", name: "gui sousa" },
            { role: "compositing", name: "gui sousa" }
        ],
        gallery: ["assets/ps3-fone.jpg", "assets/project_square_1.png"]
    },
    {
        title: "halftime show twisted tea",
        client: "twisted tea",
        year: 2024,
        image: "assets/twisted.jpg",
        category: "commercial",
        services: ["lookdev", "animation"],
        company: "twisted tea",
        description: "twisted tea was the sponsor for the 2024 Grey Cup Halftime Show and 647 media contacted me to create an animated 3d asset they could use in the video they were animating for the client, so we decided for a 360 animation of their can to provide flexibility for the editors and quickness to deliver, as it took only two days from contact to render.",
        credits: [
            { role: "lookdev", name: "gui sousa" },
            { role: "animation", name: "gui sousa" },
            { role: "art direction", name: "thiago nunes" }
        ],
        gallery: ["assets/twisted.jpg", "assets/project_wide_1.png", "assets/project_tall_1.png"]
    },
    {
        title: "causos",
        client: "personal project",
        year: 2022,
        image: "assets/project_tall_1.png",
        category: "personal",
        services: ["modeling", "lookdev", "animation"],
        description: "This project was idealized by Vitória Coelho, who wanted to team up to create a title design based on an urban legend called 'loira do banheiro'(bathroom blonde - a legend that, through her research, originated in a small town called Guaratinguetá involving a famous family from the city and a runway daughter). I was responsible for the 3d side of it (modeling, lookdev, animation) while she directed the final look and added the sound design, 2d animations and video edited.",
        credits: [
            { role: "modeling", name: "gui sousa" },
            { role: "lookdev", name: "gui sousa" },
            { role: "animation", name: "gui sousa" },
            { role: "sound design", name: "vitória coelho" },
            { role: "video editing", name: "vitória coelho" },
            { role: "art direction", name: "vitória coelho" },
            { role: "2d motion", name: "vitória coelho" }
        ],
        gallery: ["assets/project_tall_1.png", "assets/project_square_1.png"]
    },
    {
        title: "led screen scenarios",
        client: "hora 1 - globo tv",
        year: 2024,
        image: "assets/project_wide_1.png",
        category: "commercial",
        services: ["layout", "animation", "compositing", "2d motion", "content research"],
        company: "Globo TV",
        description: "environments for broadcasting that I had the opportunity to create for the new LED screen debuted by TV Globo on March 24, while working with the Hora 1 team. the goal on the first one was to create an immersive scene to illustrate middle east conflicts, so the host could introduce different stories about the topic, it was done within 3 hours from start to finish (with overnight rendering), using pre made assets, geometry nodes and compositing to unify the final look. the second one was created within two hours using geometry nodes in blender to create the destruction levels of the house's ceilling and help explain different grades of hurricanes when Hurricane Milton, a Category 3 storm, made landfall on Florida's west coast with winds reaching 120 mph",
        credits: [
            { role: "layout", name: "gui sousa" },
            { role: "animation", name: "gui sousa" },
            { role: "compositing", name: "gui sousa" },
            { role: "2d motion", name: "gui sousa" },
            { role: "content research", name: "gui sousa" }
        ],
        gallery: ["assets/project_wide_1.png", "assets/project_tall_1.png"]
    },
    {
        title: "weather explainer",
        client: "hora 1 - globo tv",
        year: 2024,
        image: "assets/project_square_1.png",
        category: "commercial",
        services: ["layout", "camera animation", "compositing", "2d motion"],
        company: "Globo TV",
        description: "environments for the weather report moment that I had the opportunity to create for the new LED screen debuted by TV Globo on March 24, while working with the Hora 1 team. the first one is about animal care, so I got animated assets to created the environment based on the meteorologist request. the second one is about the difference between two temperature measurement methods",
        credits: [
            { role: "layout", name: "gui sousa" },
            { role: "camera animation", name: "gui sousa" },
            { role: "compositing", name: "gui sousa" },
            { role: "2d motion", name: "gui sousa" }
        ],
        gallery: ["assets/project_square_1.png", "assets/project_wide_1.png"]
    },
    {
        title: "led screen r&d",
        client: "hora 1 - globo tv",
        year: 2024,
        image: "assets/project_wide_1.png",
        category: "commercial",
        services: ["layout", "animation", "compositing", "2d motion", "content research"],
        company: "Globo TV",
        description: "r&d I did for environments to hora 1 LED screen scenario debuted by TV Globo on March 24. the goal on the first one was to create an immersive scene to illustrate the 2024 american elections, so the host could introduce different stories about the topic, using pre made assets to get full accuracy from the research I did on different versions of the oval office. the second one was modeled almost entirely by me, and the goal was to be thematic scenario for volleyball topics. the third was created when we thought Vinicius Jr was going to win the ballon do'r, so we got it done before to be the possible scenario in case it happened (it should've happen actually)",
        credits: [
            { role: "layout", name: "gui sousa" },
            { role: "animation", name: "gui sousa" },
            { role: "compositing", name: "gui sousa" },
            { role: "2d motion", name: "gui sousa" },
            { role: "content research", name: "gui sousa" }
        ],
        gallery: ["assets/project_wide_1.png", "assets/project_tall_1.png"]
    },
    {
        title: "voepass airplane crash",
        client: "g1 news portal",
        year: 2025,
        image: "assets/project_wide_1.png",
        category: "commercial",
        services: ["modeling", "lookdev", "animation", "video editing", "2d motion", "content research"],
        company: "Globo TV",
        description: "animation created for G1's special page marking the one-year anniversary of the Voepass airplane crash in Vinhedo, São Paulo. We bought the airplane model and recreated the shader as well as the animation following the steps of the accident, from outside to inside of the plane using flight radar and black box records",
        credits: [
            { role: "modeling", name: "gui sousa" },
            { role: "lookdev", name: "gui sousa" },
            { role: "animation", name: "gui sousa" },
            { role: "video editing", name: "gui sousa" },
            { role: "2d motion", name: "gui sousa" },
            { role: "content research", name: "gui sousa" }
        ],
        gallery: ["assets/project_wide_1.png", "assets/project_tall_1.png"]
    },
    {
        title: "beverage can animation",
        client: "truly",
        year: 2024,
        image: "assets/twisted.jpg",
        category: "commercial",
        services: ["lookdev", "animation"],
        company: "truly",
        description: "647 media contacted me to create an animated 3d asset they could use in the video they were animating for the client, so we decided for a 360 animation of their can to provide flexibility for the editors and quickness to deliver, as it took only two days from contact to render.",
        credits: [
            { role: "lookdev", name: "gui sousa" },
            { role: "animation", name: "gui sousa" },
            { role: "art direction", name: "thiago nunes" }
        ],
        gallery: ["assets/twisted.jpg", "assets/project_wide_1.png", "assets/project_tall_1.png"]
    },
    {
        title: "beverage can viz",
        client: "giovanni flores",
        year: 2026,
        image: "assets/twisted.jpg",
        category: "commercial",
        services: ["lookdev", "animation"],
        company: "marienbad",
        description: "giovanni contacted me to created some product viz for a fictional brand of beer idealized by him, Marienbad. the goal was to produce fun compositions to visualize how this brand would communicate.",
        credits: [
            { role: "lookdev", name: "gui sousa" },
            { role: "illustration", name: "giovanni flores" },
            { role: "art direction", name: "gui sousa & giovanni flores" }
        ],
        gallery: ["assets/twisted.jpg", "assets/project_wide_1.png", "assets/project_tall_1.png"]
    }
];

// Initialize the portfolio when DOM is ready (to ensure script.js has loaded and defined initPortfolio)
document.addEventListener('DOMContentLoaded', () => {
    if (window.initPortfolio) {
        window.initPortfolio(projects);
    } else {
        console.error("initPortfolio not found in window");
    }
});
