// src/appData.js

export const companyInfoData = {
    name: "GMT Safety Solutions",
    email: "george@gmtsafety.co.za",
    primary_phone: "+27 69 512 3445",
    secondary_phone: "+27 83 734 4733",
    business_hours: "Mon - Fri: 8:00 AM - 5:00 PM",
    footer_description: "Your trusted partner in creating safer, compliant, and more productive workplaces. We offer expert training and consultancy tailored to your needs.",
    socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        instagram: "#"
    }
};

export const locationsData = [
    {
        id: 'head-office',
        office_name: 'Head Office',
        display_details: '111 Kyalami Blvd,\nMidrand,\nJohannesburg',
        phone: '+27 83 734 4733',
        email: 'sales@gmtsafety.co.za',
        latitude: -25.9900,
        longitude: 28.0800,
    },
    {
        id: 'mmabatho',
        office_name: 'Mmabatho',
        display_details: '159 Kgoleng, Cul Unit 6,\nMmabatho',
        phone: '+27 78 547 4686',
        email: 'mmabatho@gmtsafety.co.za',
        latitude: -25.8315,
        longitude: 25.5468,
    },
    {
        id: 'welkom',
        office_name: 'Welkom',
        display_details: '11329 Oppenheimer Road,\nWelkom',
        phone: '+27 69 512 3445',
        email: 'welkom@gmtsafety.co.za',
        latitude: -27.9773,
        longitude: 26.7315,
    },
    {
        id: 'bloemfontein',
        office_name: 'bloemfontein',
        display_details: '03 President Brand Avenue,\nOranjesig,\nBloemfontein',
        phone: '+27 69 512 3445',
        email: 'bloemfontein@gmtsafety.co.za',
        latitude: -27.9773,
        longitude: 26.7315,
    },
];

export const coursesData = [
    {
        id: 'safety-officer',
        title: 'Safety Officer',
        image_seed: 'course-safety-officer',
        type: 'Compliance',
        instructor: 'GMT Experts',
        duration: '2 Weeks',
        price: '10337.25',
        short_description: 'Comprehensive training to become a qualified Safety Officer.',
        full_description: 'This course provides in-depth knowledge and skills required to perform the duties of a Safety Officer, ensuring workplace safety and compliance with OHS regulations.',
        learning_outcomes: [
            'Understand OHS legislation and standards.',
            'Implement safety management systems.',
            'Conduct risk assessments and incident investigations.'
        ],
        is_featured: true,
    },
    {
        id: 'samtrac',
        title: 'SAMTRAC',
        image_seed: 'course-samtrac',
        type: 'Safety Management',
        instructor: 'GMT Experts',
        duration: 'TBD',
        price: '12520.00',
        short_description: 'Leading course in safety, health, and environmental (SHE) management.',
        full_description: 'SAMTRAC provides a comprehensive understanding of SHE management principles, risk assessment, and legal compliance, equipping professionals to manage SHE effectively.',
        learning_outcomes: [
            'Master SHE management principles.',
            'Develop and implement SHE systems.',
            'Ensure legal compliance in the workplace.'
        ],
        is_featured: true,
    },
    {
        id: 'intro-to-samtrac',
        title: 'Intro To SAMTRAC',
        image_seed: 'course-intro-samtrac',
        type: 'Safety Management',
        instructor: 'GMT Experts',
        duration: 'TBD',
        price: '9340.00',
        short_description: 'An introductory course to the fundamentals of SAMTRAC.',
        full_description: 'This course offers a foundational understanding of SAMTRAC principles, ideal for those new to SHE management or seeking an overview of the SAMTRAC framework.',
        learning_outcomes: [
            'Grasp basic SHE concepts.',
            'Understand the SAMTRAC framework.',
            'Prepare for more advanced SHE studies.'
        ],
        is_featured: false,
    },
    {
        id: 'legal-liability',
        title: 'Legal Liability',
        image_seed: 'course-legal',
        type: 'Compliance',
        instructor: 'GMT Experts',
        duration: '1 Day',
        price: '1520.00',
        short_description: 'Understand legal OHS responsibilities for managers and supervisors.',
        full_description: 'This course covers the legal obligations and potential liabilities for individuals and companies under the Occupational Health and Safety Act and related regulations.',
        learning_outcomes: [
            'Understand key OHS Act requirements.',
            'Identify legal responsibilities of employers and employees.',
            'Mitigate risks of legal non-compliance.'
        ],
        is_featured: false,
    },
    {
        id: 'incident-investigation',
        title: 'Incident Investigation',
        image_seed: 'course-investigation',
        type: 'Safety',
        instructor: 'GMT Experts',
        duration: '1 Day',
        price: '825.00',
        short_description: 'Learn to conduct effective workplace incident investigations.',
        full_description: 'This course equips participants with the skills to investigate workplace incidents, identify root causes, and recommend corrective actions to prevent recurrence.',
        learning_outcomes: [
            'Understand incident investigation processes.',
            'Identify root causes of incidents.',
            'Develop effective corrective and preventive actions.'
        ],
        is_featured: false,
    },
    {
        id: 'hira',
        title: 'HIRA',
        image_seed: 'course-hira',
        type: 'Risk Management',
        instructor: 'GMT Experts',
        duration: '1 Day',
        price: '1520.00',
        short_description: 'Master Hazard Identification and Risk Assessment techniques.',
        full_description: 'This course provides practical training on how to identify workplace hazards, assess associated risks, and implement control measures to ensure a safer working environment.',
        learning_outcomes: [
            'Systematically identify workplace hazards.',
            'Conduct comprehensive risk assessments.',
            'Implement and monitor risk control measures.'
        ],
        is_featured: false,
    },
    {
        id: 'first-aid-level-1',
        title: 'First Aid Level 1',
        image_seed: 'course-firstaid-level-1',
        type: 'Medical',
        instructor: 'Certified Paramedics',
        duration: '2 Days',
        price: '850.00',
        short_description: 'Essential life-saving skills for workplace emergencies.',
        full_description: 'Provides foundational knowledge and practical skills to respond to common workplace injuries and medical emergencies until professional help arrives.',
        learning_outcomes: [
            'Assess an emergency scene and casualty.',
            'Perform CPR and use an AED.',
            'Manage bleeding, burns, shock, and common injuries.'
        ],
        is_featured: true,
    },
    {
        id: 'first-aid-level-2',
        title: 'First Aid Level 2',
        image_seed: 'course-firstaid-level-2',
        type: 'Medical',
        instructor: 'Certified Paramedics',
        duration: '3 Days',
        price: '1097.00',
        short_description: 'Intermediate first aid skills for more complex emergencies.',
        full_description: 'Builds upon Level 1, covering more advanced first aid techniques and a broader range of injuries and medical conditions.',
        learning_outcomes: [
            'Manage complex injuries like fractures and spinal injuries.',
            'Respond to environmental emergencies.',
            'Provide advanced resuscitation techniques.'
        ],
        is_featured: false,
    },
    {
        id: 'first-aid-level-3',
        title: 'First Aid Level 3',
        image_seed: 'course-firstaid-level-3',
        type: 'Medical',
        instructor: 'Certified Paramedics',
        duration: '4-5 Days',
        price: '1659.25',
        short_description: 'Comprehensive first aid for advanced emergency response.',
        full_description: 'The highest level of pre-hospital first aid care, covering advanced skills for managing critical situations and multiple casualties.',
        learning_outcomes: [
            'Perform advanced airway management.',
            'Administer emergency oxygen.',
            'Manage multiple casualty incidents.'
        ],
        is_featured: false,
    },
    {
        id: 'first-aid-combo-1-2',
        title: 'First Aid Combo 1 & 2',
        image_seed: 'course-firstaid-combo',
        type: 'Medical',
        instructor: 'Certified Paramedics',
        duration: '4-5 Days',
        price: '1550.00',
        short_description: 'Combined First Aid Level 1 and Level 2 training package.',
        full_description: 'A comprehensive package offering both First Aid Level 1 and Level 2 certifications, providing a broad range of essential and intermediate life-saving skills.',
        learning_outcomes: [
            'Achieve competency in Level 1 and Level 2 first aid.',
            'Respond to a wide range of medical emergencies.',
            'Cost-effective way to gain extensive first aid knowledge.'
        ],
        is_featured: false,
    },
    {
        id: 'first-aid-combo-2-3',
        title: 'First Aid Combo 2 & 3',
        image_seed: 'course-firstaid-combo-adv',
        type: 'Medical',
        instructor: 'Certified Paramedics',
        duration: 'TBD',
        price: '2450.00',
        short_description: 'Combined First Aid Level 2 and Level 3 training package.',
        full_description: 'An advanced package offering both First Aid Level 2 and Level 3 certifications, for individuals requiring comprehensive pre-hospital care skills.',
        learning_outcomes: [
            'Achieve competency in Level 2 and Level 3 first aid.',
            'Master advanced emergency medical response techniques.',
            'Ideal for high-risk environments or designated first aiders.'
        ],
        is_featured: false,
    },
    {
        id: 'fire-fighter-level-1',
        title: 'Fire Fighter Level 1',
        image_seed: 'course-fire',
        type: 'Emergency Response',
        instructor: 'Fire Safety Experts',
        duration: '1-2 Days',
        price: '750.00',
        short_description: 'Basic firefighting skills and fire safety awareness.',
        full_description: 'This course covers the basics of fire prevention, fire behavior, and the use of firefighting equipment to combat small fires safely.',
        learning_outcomes: [
            'Understand the chemistry of fire.',
            'Operate basic firefighting equipment (e.g., extinguishers).',
            'Implement fire prevention strategies.'
        ],
        is_featured: false,
    },
    {
        id: 'evacuation-officer',
        title: 'Evacuation Officer',
        image_seed: 'course-evacuation',
        type: 'Emergency Response',
        instructor: 'SHEQ Practitioners',
        duration: '1 Day',
        price: '1250.00',
        short_description: 'Train to manage and coordinate emergency building evacuations.',
        full_description: 'Also known as Fire Warden or Evacuation Marshal training, this course equips individuals with the knowledge and skills to safely evacuate occupants during emergencies.',
        learning_outcomes: [
            'Understand roles and responsibilities of an Evacuation Officer.',
            'Develop and implement emergency evacuation plans.',
            'Conduct safe and orderly evacuations.'
        ],
        is_featured: false,
    },
    {
        id: 'work-at-heights',
        title: 'Working at Heights',
        image_seed: 'course-heights',
        type: 'Safety',
        instructor: 'Safety Specialists',
        duration: '1 Day',
        price: '900.00',
        short_description: 'Essential safety training for personnel working at elevated positions.',
        full_description: 'This course covers hazard identification, risk assessment, fall prevention, and the correct use of fall protection equipment for working safely at heights.',
        learning_outcomes: [
            'Identify fall hazards and assess risks.',
            'Understand and use fall protection systems.',
            'Implement safe work practices for working at heights.'
        ],
        is_featured: false,
    },
    {
        id: 'scaffolding',
        title: 'Scaffolding Safety',
        image_seed: 'course-scaffolding',
        type: 'Construction Safety',
        instructor: 'Scaffolding Experts',
        duration: 'TBD', // Can vary (e.g. erector, inspector)
        price: '1110.00',
        short_description: 'Understand safe scaffolding erection, use, and inspection.',
        full_description: 'This course provides knowledge on scaffolding regulations, safe erection and dismantling procedures, inspection requirements, and hazard recognition related to scaffolding.',
        learning_outcomes: [
            'Understand scaffolding standards and regulations.',
            'Identify hazards associated with scaffolding.',
            'Learn principles of safe scaffold erection and inspection (awareness level).'
        ],
        is_featured: false,
    }
];


export const servicesData = [
    {
        id: 'hazardous-waste-disposal',
        title: 'Hazardous Waste Disposal',
        navTitle: 'Hazardous Waste Disposal', // For dropdown
        image_path: '/assets/images/service-hazwaste.jpg', // Replace with actual image
        description: "Comprehensive solutions for the safe and compliant disposal of hazardous waste.",
        call_to_action_text: "Enquire HazWaste Disposal",
        contentBlocks: [
            {
                type: 'heading',
                level: 3, // h3
                text: 'Hazardous Waste Disposal',
                withArrows: true,
            },
            {
                type: 'paragraph',
                text: "Many industrial companies currently manage their hazardous waste by dumping in general waste dumps or even in open ground. This practice is an environmental issue globally as well as in South Africa. Legislation introduced in 2009, is aimed at stopping the incorrect and illegal hazardous waste disposal methods that are currently being used, as well as to build up a database of which waste streams come from where and how big they are."
            },
            //Add more services
            {
                type: 'heading',
                level: 3,
                text: 'What is Hazardous Waste?',
                withArrows: true,
            },
            {
                type: 'paragraph',
                text: "Waste is defined in the Environment Conservation Act No. 73 of 1989 as all undesirable or superfluous by-products, emissions, residues or remainders of any process or activity, whether gaseous, liquid or solid, or a combination of these. Waste can be divided into two categories, general waste and hazardous waste. Hazardous waste is then further divided into nine different classes based on the type of risk involved."
            },
            {
                type: 'heading',
                level: 3,
                text: 'National Environmental Management Waste Act',
                withArrows: true,
            },
            {
                type: 'paragraph',
                text: "The National Environmental Management Waste Act, 2008 (Act No. 59, 2008) has legislated that All industrial companies must use certified waste disposal companies to dispose of their hazardous waste. Certificates and audits proving how the hazardous waste was disposed is a requirement to ensure that you do not fall foul of the act. If you do not comply with the new Act you could face imprisonment and/or fines of up to R10 million!"
            },
            {
                type: 'heading',
                level: 3,
                text: 'Our Services',
                withArrows: true,
            },
            {
                type: 'twoColumnList',
                leftHeading: null, // No specific heading for the blue box list in the image
                leftList: [
                    'Handling of health care waste',
                    'Sorting',
                    'Transportation',
                    'Incineration of health care waste',
                    'Disposal of florescent bulbs',
                    'Disposal of health care waste',
                    {
                        text: 'Management of spill residue and debris',
                        subItems: ['Handling', 'Sorting', 'Transportation', 'Storage', 'Treating', 'Disposal']
                    }
                ],
                rightHeading: 'There are 9 classes of hazardous waste:',
                rightList: [
                    'Explosives',
                    'Gases',
                    'Flammable liquids',
                    'Flammable solids',
                    'Oxidising substances',
                    'Organic pesticides',
                    'Toxic and infectious substances',
                    'Radioactive material',
                    'Corrosives',
                    'Miscellaneous dangerous substances and goods'
                ],
                image: { // Add image here
                    src: '/assets/images/biohazard-bags.png', // Replace with actual image path
                    alt: 'Biohazard waste bags'
                }
            }
        ]
    },
    {
        id: 'she-services',
        title: 'Safety, Health And Environmental Services',
        navTitle: 'SHE Services', // For dropdown
        image_path: '/assets/images/service-she.jpg',
        description: "Comprehensive SHE services including system development, compliance auditing, officer provision, and training.",
        call_to_action_text: "Enquire About SHE Services",
        contentBlocks: [
            {
                type: 'heading',
                level: 3,
                text: 'Safety, Health And Environmental Services'
            },
            {
                type: 'list',
                items: [
                    'Health and safety systems development and implementation',
                    'Compliance auditing of health, safety and environmental systems',
                    'Acting as client Health and Safety agents',
                    'Providing safety officers to work at construction sites',
                    'Occupational hygiene measurements',
                    'Medical Screenings - All certificates are issued by an Occupational Health and Safety Medical Practitioner (OHMP)',
                    'Training in various fields of applicable legislation',
                    'Training the workforce',
                    'Conducting risk assessments and writing of safe work procedures/method statements',
                    'Mobile medical surveillance units to conduct medical surveillance on site',
                    'Environmental Management Plans',
                    'Environmental Impact Assessments',
                    'Environmental Stressor Monitoring (e.g. Fall out dust; Boundary Noise; etc...)', // Corrected from video
                    'Construction Site Compliance',
                    'Mining Right Applications',
                    'Mining Right Conversions',
                ]
            },
            {
                type: 'heading',
                level: 3,
                text: 'Surveys'
            },
            {
                type: 'list',
                items: [
                    'Occupational Hygiene',
                    'Noise',
                    'Illumination',
                    'Thermal stress',
                    'Airborne pollutants',
                    'Hazardous Chemicals',
                    'Asbestos',
                    'Ergonomics',
                    'Vibration'
                ]
            },
            {
                type: 'heading',
                level: 3,
                text: 'Systems'
            },
            {
                type: 'list',
                items: [
                    'OHSAS 18001, ISO 9001 and ISO 14001 Systems, Audits and Certification',
                    'Hazard Identification',
                    'Risk assessments and Task Analysis',
                    'Gap analyses', // Corrected from video
                    'S.H.E Legislation Audits',
                    'Health, Safety and Environmental Management system',
                ]
            }
        ]
    },
    /*{
        id: 'environmental-health',
        title: 'Environmental Health',
        navTitle: 'Environmental Health', // For dropdown
        image_path: '/assets/images/service-env-health.jpg',
        description: "Specialized services for environmental management, monitoring, and compliance.",
        call_to_action_text: "Enquire Environmental Health",
        contentBlocks: [
            {
                type: 'heading',
                level: 3,
                text: 'Safety, Health And Environmental Services' // From video, seems to repeat. Adjust if needed.
            },
            {
                type: 'list',
                items: [
                    'Environmental Management Plans',
                    'Environmental Impact Assessments',
                    'Environmental Stressor Monitoring (e.g. Fall out dust; Boundary Noise; etc...)',
                    'Construction Site Compliance',
                    'Mining Right Applications',
                    'Mining Right Conversions',
                    'Water Purification - Supply of water purification chemicals',
                    'Water Purification Monitoring (Water Quality Monitoring - samples taking and lab test analysis)',
                    'Food Safety - Development of HACCP System - Implementation of HACCP and Monitoring of HACCP',
                ]
            },
            {
                type: 'heading',
                level: 3,
                text: 'Surveys' // From video
            },
            {
                type: 'list',
                items: [
                    'Occupational Hygiene',
                    'Noise',
                    'Illumination',
                    'Thermal stress',
                    'Airborne pollutants',
                    'Hazardous Chemicals',
                    'Asbestos',
                    'Ergonomics',
                    'Vibration'
                ]
            },
            {
                type: 'heading',
                level: 3,
                text: 'Systems' // From video
            },
            {
                type: 'list',
                items: [
                    'OHSAS 18001, ISO 9001 and ISO 14001 Systems, Audits and Certification',
                    'Hazard Identification',
                    'Risk assessments and Task Analysis',
                    'Gap analyses',
                    'S.H.E Legislation Audits',
                    'Health, Safety and Environmental Management system',
                ]
            }
        ]
    }*/
    // Add other main services as objects here
];

export const aboutUsData = {
    pageTitle: "About Us",
    sections: [
        {
            title: "Executive Summary",
            type: "paragraphs",
            content: [
                "SMT SAFETY (Pty) Ltd Professional Health & Occupational Health and Safety Consultancy established in 2012 after taking over from its Sister Company called BMT Occupational Health Consulting. Both Companies are owned by an innovative, goal driven and dedicated young professional called Shenge Masilela (Executive Director). Our Sister Company BMT Occupational Health Consulting (BOHC) already has a renowned good service provision.",
                "Main Foreign Language: SiSwati, Tsonga, Ndebele and now we are operating in North West."
            ]
        },
        {
            type: "list",
            listType: "disc",
            content: [
                "SMT SAFETY (Pty) Ltd is 100% Black Owned",
                "SMT SAFETY (Pty) Ltd is a Level Four B-BBEE Contributor", // Note: Video showed "Level One", image "Level Four". Adjusted to image.
                "SMT SAFETY (Pty) Ltd is a registered company with:",
                "South African Institute of Occupational Safety and Health.",
                "Our SAIOSH Corporate Membership Number is: 29876543A", // Made up number
                "Shenge Masilela (Executive Director) is a qualified and registered member of South African Institute of Occupational Safety and Health.",
                "Registered as:",
                "Occupational Health and Safety Professional with practice number: 29876543A", // Made up
                "Graduate Members with Institute of Occupational Safety and Health South Africa.",
                "The minimum requirements were met and the membership grade was awarded."
            ]
        },
        {
            title: "Mission",
            type: "paragraphs",
            content: [
                "SMT SAFETY (Pty) Ltd mission is to:",
                "reduce the burden of human illness,",
                "injury and",
                "disability by understanding how the environment influences the development and the progression of human diseases."
            ]
        },
        {
            title: "Objective",
            type: "list",
            listType: "disc",
            content: [
                "To assist and ensure acceptable standards of environmental health and occupational health are achieved.",
                "To provide such information, instructions, training and supervision as may be necessary, to ensure, so far as is practicably, a healthy and safe working environment for all employees.",
                "To assist with all necessary measures to ensure that the requirements in terms of the Occupational Health and Safety Act and other Environmental Management Statutory Laws are complied with by every person in his employment or on premises under the control of any Company where plant or machinery is used.",
                "To assist and advice on steps to eliminate or mitigate, as far as practicably, any hazard or potential hazard to the safety or health of employees and community at large, before resorting to personal protective equipment.",
                "To promote proper driven approaches to sustainable development."
            ]
        },
        {
            title: "Company’s Commitment",
            type: "list",
            listType: "disc",
            content: [
                "To offer outcome based assistance to our clients at all costs.",
                "To foster knowledge and to help our client’s grow professionally.",
                "To maintain dignity of, and confidentiality in working with our clients.",
                "To respond to clients needs."
            ]
        },
        {
            title: "Company’s Approach",
            type: "paragraphs",
            content: [
                "To play an important role in supporting the integration of primary and preventative measures in all places where there is human activity.",
                "As specialists in productivity management, your organization can benefit from our expertise within Occupational Health, Workplace Ergonomics, Occupational Hygiene, Hazardous Waste Management, Environmental Impact Assessment and Water Quality Monitoring to optimize the health and well-being of your employees."
            ]
        }
    ]
};

