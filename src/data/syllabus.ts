export interface Chapter {
  id: string;
  name: string;
  topics: string[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  chapters: Chapter[];
  color: string;
}

export interface Chapter {
  id: string;
  name: string;
  topics: string[];
  content: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  chapters: Chapter[];
  color: string;
}

export const SYLLABUS_DATA: Subject[] = [
  {
    id: 'maths',
    name: 'Mathematics',
    description: 'Complete Class 10 Mathematics syllabus covering Algebra, Geometry, Trigonometry, and Statistics.',
    color: '#00ffff',
    chapters: [
      { 
        id: 'm1', 
        name: 'Real Numbers', 
        topics: ['Fundamental Theorem of Arithmetic', 'Irrational Numbers'],
        content: 'The Fundamental Theorem of Arithmetic states that every composite number can be expressed as a product of primes. This factorization is unique. We also explore the proof of irrationality for numbers like √2, √3, and √5.'
      },
      { 
        id: 'm2', 
        name: 'Polynomials', 
        topics: ['Zeros of a Polynomial', 'Relationship between Zeros and Coefficients'],
        content: 'A polynomial is an expression consisting of variables and coefficients. We focus on quadratic polynomials, their zeros (roots), and the relationship between these zeros and the coefficients (Sum of zeros = -b/a, Product of zeros = c/a).'
      },
      { 
        id: 'm3', 
        name: 'Pair of Linear Equations in Two Variables', 
        topics: ['Graphical Method', 'Substitution Method', 'Elimination Method'],
        content: 'Linear equations represent straight lines. A pair of such equations can be solved graphically (finding the intersection) or algebraically using substitution or elimination methods. We also study consistency and inconsistency of equations.'
      },
      { 
        id: 'm4', 
        name: 'Quadratic Equations', 
        topics: ['Standard Form', 'Solution by Factoring', 'Quadratic Formula'],
        content: 'Standard form: ax² + bx + c = 0. Solutions can be found by splitting the middle term (factoring) or using the Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a. The discriminant (D = b² - 4ac) determines the nature of roots.'
      },
      { 
        id: 'm5', 
        name: 'Arithmetic Progressions', 
        topics: ['nth Term of an AP', 'Sum of First n Terms'],
        content: 'An AP is a sequence where the difference between consecutive terms is constant (d). The nth term is a + (n-1)d. The sum of first n terms is (n/2)[2a + (n-1)d].'
      },
      { 
        id: 'm6', 
        name: 'Triangles', 
        topics: ['Similarity of Triangles', 'BPT Theorem', 'Criteria for Similarity'],
        content: 'Two triangles are similar if their corresponding angles are equal and sides are proportional. Basic Proportionality Theorem (BPT) states that a line parallel to one side of a triangle divides the other two sides proportionally.'
      },
      { 
        id: 'm7', 
        name: 'Coordinate Geometry', 
        topics: ['Distance Formula', 'Section Formula'],
        content: 'Distance between (x1, y1) and (x2, y2) is √[(x2-x1)² + (y2-y1)²]. Section formula finds the coordinates of a point dividing a line segment in ratio m:n.'
      },
      { 
        id: 'm8', 
        name: 'Introduction to Trigonometry', 
        topics: ['Trigonometric Ratios', 'Ratios of Specific Angles', 'Trigonometric Identities'],
        content: 'Trigonometry deals with ratios of sides in a right-angled triangle: sin, cos, tan, cosec, sec, cot. Key identity: sin²θ + cos²θ = 1.'
      },
      { 
        id: 'm9', 
        name: 'Some Applications of Trigonometry', 
        topics: ['Heights and Distances', 'Angle of Elevation/Depression'],
        content: 'Using trigonometric ratios to find heights of towers or distances between objects. Angle of elevation is looking up; angle of depression is looking down.'
      },
      { 
        id: 'm10', 
        name: 'Circles', 
        topics: ['Tangent to a Circle', 'Theorems on Tangents'],
        content: 'A tangent touches the circle at exactly one point. The tangent at any point is perpendicular to the radius through the point of contact. Lengths of tangents from an external point are equal.'
      },
      { 
        id: 'm11', 
        name: 'Areas Related to Circles', 
        topics: ['Area of Sector', 'Area of Segment'],
        content: 'Area of sector = (θ/360) × πr². Area of segment = Area of sector - Area of corresponding triangle.'
      },
      { 
        id: 'm12', 
        name: 'Surface Areas and Volumes', 
        topics: ['Surface Area of Combinations', 'Volume of Combinations'],
        content: 'Calculating total surface area and volume when different solids (like cylinder, cone, hemisphere) are joined together.'
      },
      { 
        id: 'm13', 
        name: 'Statistics', 
        topics: ['Mean, Median, Mode of Grouped Data'],
        content: 'Mean (Average), Median (Middle value), and Mode (Most frequent value) for grouped data using formulas like Assumed Mean method or Step Deviation.'
      },
      { 
        id: 'm14', 
        name: 'Probability', 
        topics: ['Theoretical Probability', 'Simple Events'],
        content: 'Probability of an event E = (Number of outcomes favorable to E) / (Total number of possible outcomes). The value lies between 0 and 1.'
      }
    ]
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Full Science curriculum including Physics, Chemistry, and Biology as per NCERT.',
    color: '#00ff80',
    chapters: [
      { 
        id: 's1', 
        name: 'Chemical Reactions and Equations', 
        topics: ['Balanced Equations', 'Types of Reactions', 'Oxidation & Reduction'],
        content: 'Chemical reactions involve breaking and making of bonds. Types include Combination, Decomposition, Displacement, and Double Displacement. Redox reactions involve simultaneous oxidation and reduction.'
      },
      { 
        id: 's2', 
        name: 'Acids, Bases and Salts', 
        topics: ['Indicators', 'pH Scale', 'Common Salt Derivatives'],
        content: 'Acids are sour and turn blue litmus red. Bases are bitter and turn red litmus blue. pH scale (0-14) measures acidity. Salts like Baking Soda, Bleaching Powder are derived from common salt.'
      },
      { 
        id: 's3', 
        name: 'Metals and Non-metals', 
        topics: ['Properties', 'Ionic Bonding', 'Metallurgy', 'Corrosion'],
        content: 'Metals are lustrous, malleable, and ductile. Non-metals are the opposite. Ionic compounds are formed by transfer of electrons. Metallurgy is the process of extracting metals from ores.'
      },
      { 
        id: 's4', 
        name: 'Carbon and its Compounds', 
        topics: ['Covalent Bonding', 'Saturated/Unsaturated', 'Functional Groups', 'Soaps & Detergents'],
        content: 'Carbon forms covalent bonds due to its tetravalency. Saturated compounds have single bonds (alkanes); unsaturated have double/triple bonds (alkenes/alkynes). Soaps are sodium salts of fatty acids.'
      },
      { 
        id: 's5', 
        name: 'Life Processes', 
        topics: ['Nutrition', 'Respiration', 'Circulation', 'Excretion'],
        content: 'Basic functions performed by living organisms to maintain life. Nutrition (Autotrophic/Heterotrophic), Respiration (Aerobic/Anaerobic), Transportation in humans/plants, and Excretion.'
      },
      { 
        id: 's6', 
        name: 'Control and Coordination', 
        topics: ['Nervous System', 'Reflex Action', 'Plant Hormones', 'Animal Hormones'],
        content: 'Nervous system and endocrine system work together. Reflex action is an involuntary response. Plant hormones like Auxins, Gibberellins control growth. Animal hormones like Insulin, Adrenaline regulate body functions.'
      },
      { 
        id: 's7', 
        name: 'How do Organisms Reproduce?', 
        topics: ['Asexual Methods', 'Sexual Reproduction', 'Human Reproductive System'],
        content: 'Reproduction ensures continuity of species. Asexual methods include Fission, Budding, Fragmentation. Sexual reproduction involves gametes. Human system includes male/female organs and fertilization.'
      },
      { 
        id: 's8', 
        name: 'Heredity', 
        topics: ['Mendelian Inheritance', 'Sex Determination'],
        content: 'Heredity is the transmission of traits. Mendel studied pea plants to establish laws of inheritance. Sex in humans is determined by X and Y chromosomes.'
      },
      { 
        id: 's9', 
        name: 'Light - Reflection and Refraction', 
        topics: ['Mirror Formula', 'Refractive Index', 'Lens Formula', 'Power of Lens'],
        content: 'Reflection follows laws (i=r). Spherical mirrors (Concave/Convex) form images. Refraction is bending of light. Power of lens P = 1/f (in meters).'
      },
      { 
        id: 's10', 
        name: 'The Human Eye and the Colourful World', 
        topics: ['Eye Defects', 'Prism Dispersion', 'Atmospheric Refraction', 'Scattering'],
        content: 'Eye defects include Myopia, Hypermetropia, Presbyopia. Prism splits white light into VIBGYOR. Atmospheric refraction causes twinkling of stars. Scattering causes blue sky.'
      },
      { 
        id: 's11', 
        name: 'Electricity', 
        topics: ['Ohm\'s Law', 'Resistance in Series/Parallel', 'Joule\'s Heating', 'Electric Power'],
        content: 'V = IR (Ohm\'s Law). Resistance depends on length, area, material. Series: R = R1+R2. Parallel: 1/R = 1/R1 + 1/R2. Heating effect H = I²Rt.'
      },
      { 
        id: 's12', 
        name: 'Magnetic Effects of Electric Current', 
        topics: ['Magnetic Field Lines', 'Solenoid', 'Fleming\'s Rules', 'Domestic Circuits'],
        content: 'Current carrying wire produces magnetic field. Solenoid acts like a bar magnet. Fleming\'s Left Hand Rule for motor; Right Hand Rule for generator. Domestic circuits use parallel connection and earthing.'
      },
      { 
        id: 's13', 
        name: 'Our Environment', 
        topics: ['Eco-system', 'Ozone Depletion', 'Waste Management'],
        content: 'Eco-system consists of biotic and abiotic components. Food chains show energy flow (10% law). Ozone layer protects from UV rays. Waste should be segregated into biodegradable and non-biodegradable.'
      }
    ]
  },
  {
    id: 'sst',
    name: 'Social Science',
    description: 'Complete Social Science syllabus covering History, Geography, Civics, and Economics.',
    color: '#ff8000',
    chapters: [
      { 
        id: 'sst1', 
        name: 'The Rise of Nationalism in Europe', 
        topics: ['French Revolution', 'Napoleon', 'Unification of Italy/Germany'],
        content: 'Nationalism emerged in the 19th century. The French Revolution spread ideas of liberty. Napoleon\'s code modernized administration. Italy was unified by Cavour/Garibaldi; Germany by Bismarck.'
      },
      { 
        id: 'sst2', 
        name: 'Nationalism in India', 
        topics: ['Non-Cooperation', 'Civil Disobedience', 'Quit India Movement'],
        content: 'Mahatma Gandhi led the struggle using Satyagraha. Rowlatt Act and Jallianwala Bagh led to Non-Cooperation. Salt March started Civil Disobedience. Quit India was the final call for independence.'
      },
      { 
        id: 'sst3', 
        name: 'The Making of a Global World', 
        topics: ['Pre-modern World', '19th Century Economy', 'Inter-war Economy'],
        content: 'Silk routes linked the world. Colonization led to global trade. The Great Depression of 1929 impacted the world. Post-war institutions like IMF and World Bank were established.'
      },
      { 
        id: 'sst4', 
        name: 'The Age of Industrialization', 
        topics: ['Before Industrial Revolution', 'Hand Labour', 'Industrialization in Colonies'],
        content: 'Proto-industrialization preceded factories. Steam engine changed production. In India, textile industry faced challenges from British imports but later grew.'
      },
      { 
        id: 'sst5', 
        name: 'Print Culture and the Modern World', 
        topics: ['First Printed Books', 'Print in India', 'Religious Reform'],
        content: 'Print started in East Asia. Gutenberg invented the printing press. In India, print helped spread ideas of reform and nationalism.'
      },
      { 
        id: 'sst6', 
        name: 'Resources and Development', 
        topics: ['Classification', 'Soil Types', 'Land Degradation'],
        content: 'Resources are classified as Biotic/Abiotic, Renewable/Non-renewable. India has diverse soils: Alluvial, Black, Red, Laterite. Resource planning is essential for sustainability.'
      },
      { 
        id: 'sst7', 
        name: 'Forest and Wildlife Resources', 
        topics: ['Biodiversity', 'Conservation', 'Community Involvement'],
        content: 'India is rich in flora and fauna. Project Tiger and other initiatives protect wildlife. Sacred groves and Chipko movement show community participation.'
      },
      { 
        id: 'sst8', 
        name: 'Water Resources', 
        topics: ['Dams', 'Rainwater Harvesting', 'Multipurpose Projects'],
        content: 'Dams are "Temples of Modern India" but face opposition. Rainwater harvesting is a traditional and effective method for water conservation.'
      },
      { 
        id: 'sst9', 
        name: 'Agriculture', 
        topics: ['Farming Types', 'Major Crops', 'Technological Reforms'],
        content: 'Types: Primitive, Intensive, Commercial. Major crops: Rice, Wheat, Millets, Tea, Coffee. Green Revolution improved productivity.'
      },
      { 
        id: 'sst10', 
        name: 'Minerals and Energy Resources', 
        topics: ['Metallic/Non-metallic', 'Conventional/Non-conventional Energy'],
        content: 'Minerals occur in ores. Conventional energy: Coal, Petroleum. Non-conventional: Solar, Wind, Nuclear. Conservation of energy is vital.'
      },
      { 
        id: 'sst11', 
        name: 'Lifelines of National Economy', 
        topics: ['Roadways', 'Railways', 'Waterways', 'Communication'],
        content: 'Transport and communication are lifelines. Roadways include Golden Quadrilateral. Railways are the principal mode. Digital India is transforming communication.'
      },
      { 
        id: 'sst12', 
        name: 'Power Sharing', 
        topics: ['Belgium & Sri Lanka', 'Forms of Power Sharing'],
        content: 'Belgium shared power among linguistic groups. Sri Lanka faced civil war due to majoritarianism. Power can be shared horizontally (Organs) or vertically (Levels).'
      },
      { 
        id: 'sst13', 
        name: 'Federalism', 
        topics: ['Features', 'Decentralization in India'],
        content: 'Federalism has two or more levels of government. India is a federal country with a strong center. Panchayati Raj is the third tier of democracy.'
      },
      { 
        id: 'sst14', 
        name: 'Gender, Religion and Caste', 
        topics: ['Women Representation', 'Communalism', 'Caste in Politics'],
        content: 'Social divisions impact politics. Women need more representation. Communalism is a threat to democracy. Caste plays a role in voting but politics also influences caste.'
      },
      { 
        id: 'sst15', 
        name: 'Political Parties', 
        topics: ['Functions', 'National/Regional Parties', 'Challenges'],
        content: 'Parties contest elections and form government. India has a multi-party system. Challenges include lack of internal democracy and money/muscle power.'
      },
      { 
        id: 'sst16', 
        name: 'Outcomes of Democracy', 
        topics: ['Accountability', 'Economic Growth', 'Social Diversity'],
        content: 'Democracy is better than other forms. It ensures accountability, legitimate government, and accommodation of social diversity.'
      },
      { 
        id: 'sst17', 
        name: 'Development', 
        topics: ['PCI', 'HDI', 'Sustainability'],
        content: 'Development means different things to different people. Per Capita Income (PCI) and Human Development Index (HDI) are key indicators. Sustainable development is the need of the hour.'
      },
      { 
        id: 'sst18', 
        name: 'Sectors of the Indian Economy', 
        topics: ['Primary/Secondary/Tertiary', 'GDP', 'MGNREGA'],
        content: 'Primary (Agriculture), Secondary (Manufacturing), Tertiary (Services). Tertiary sector is growing fastest. MGNREGA provides 100 days of guaranteed work.'
      },
      { 
        id: 'sst19', 
        name: 'Money and Credit', 
        topics: ['Barter System', 'Formal/Informal Credit', 'SHGs'],
        content: 'Money acts as a medium of exchange. Formal sector (Banks) is cheaper than informal. Self Help Groups (SHGs) help the poor, especially women.'
      },
      { 
        id: 'sst20', 
        name: 'Globalization and the Indian Economy', 
        topics: ['MNCs', 'Foreign Trade', 'Impact of Globalization'],
        content: 'MNCs link production across countries. Globalization has increased competition and choice for consumers but impacted small producers.'
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    description: 'Language and Literature - First Flight and Footprints Without Feet.',
    color: '#ff00ff',
    chapters: [
      { 
        id: 'e1', 
        name: 'A Letter to God', 
        topics: ['Lencho\'s Faith', 'Postmaster\'s Kindness'],
        content: 'Lencho, a poor farmer, has immense faith in God. When his crops are destroyed, he writes a letter to God asking for 100 pesos. The postmaster, moved by his faith, collects money to help him.'
      },
      { 
        id: 'e2', 
        name: 'Nelson Mandela: Long Walk to Freedom', 
        topics: ['Apartheid', 'Inauguration Ceremony'],
        content: 'Mandela describes the historic inauguration as South Africa\'s first black president. He reflects on the struggle against apartheid and the meaning of true freedom and courage.'
      },
      { 
        id: 'e3', 
        name: 'Two Stories about Flying', 
        topics: ['His First Flight', 'The Black Aeroplane'],
        content: 'A young seagull overcomes his fear of flying. In the second story, a pilot is guided through a storm by a mysterious black aeroplane.'
      },
      { 
        id: 'e4', 
        name: 'From the Diary of Anne Frank', 
        topics: ['Kitty', 'Life in Hiding'],
        content: 'Anne Frank shares her thoughts and feelings while hiding from the Nazis. She considers her diary, "Kitty," her truest friend.'
      },
      { 
        id: 'e5', 
        name: 'Glimpses of India', 
        topics: ['A Baker from Goa', 'Coorg', 'Tea from Assam'],
        content: 'Three stories showcasing India\'s cultural diversity: the traditional bakers of Goa, the brave people of Coorg, and the tea legends of Assam.'
      },
      { 
        id: 'e6', 
        name: 'Mijbil the Otter', 
        topics: ['Maxwell\'s Pet', 'Journey to London'],
        content: 'Maxwell brings an otter from Iraq to London. The story describes the playful nature of Mijbil and the challenges of traveling with an exotic pet.'
      },
      { 
        id: 'e7', 
        name: 'Madam Rides the Bus', 
        topics: ['Valli\'s First Journey', 'Town Experience'],
        content: 'Eight-year-old Valli saves money to fulfill her dream of riding a bus to the town. She experiences the world outside her village for the first time.'
      },
      { 
        id: 'e8', 
        name: 'The Sermon at Benares', 
        topics: ['Kisa Gotami', 'Buddha\'s Teachings'],
        content: 'Buddha teaches Kisa Gotami that death is inevitable. He uses the example of a mustard seed to show that grief is universal and peace comes from acceptance.'
      },
      { 
        id: 'e9', 
        name: 'The Proposal', 
        topics: ['Lomov & Natalya', 'One-Act Play'],
        content: 'A humorous one-act play about Lomov coming to propose to Natalya, but they end up arguing over trivial matters like land and dogs.'
      },
      { 
        id: 'e10', 
        name: 'Poetry Section', 
        topics: ['Dust of Snow', 'Fire and Ice', 'A Tiger in the Zoo'],
        content: 'A collection of poems exploring nature, human emotions, and social issues. Robert Frost\'s poems highlight the power of small moments and the destructive nature of desire/hate.'
      },
      { 
        id: 'e11', 
        name: 'A Triumph of Surgery', 
        topics: ['Tricki', 'Mrs. Pumphrey'],
        content: 'Tricki, a pampered dog, falls ill due to overfeeding. Dr. Herriot treats him by providing a proper diet and exercise, leading to a "triumph of surgery."'
      },
      { 
        id: 'e12', 
        name: 'The Thief\'s Story', 
        topics: ['Anil and Hari Singh', 'Trust & Betrayal'],
        content: 'Hari Singh, a young thief, is transformed by Anil\'s kindness and trust. He realizes that education and a honest life are more valuable than stolen money.'
      },
      { 
        id: 'e13', 
        name: 'The Midnight Visitor', 
        topics: ['Ausable', 'Max', 'Fowler'],
        content: 'Ausable, a secret agent, outwits Max, a rival agent, by creating a fake story about a balcony. It shows that intelligence is more important than physical appearance.'
      },
      { 
        id: 'e14', 
        name: 'A Question of Trust', 
        topics: ['Horace Danby', 'Lady in Red'],
        content: 'Horace Danby, a "respectable" thief, is tricked by a woman who pretends to be the owner of the house he is robbing.'
      },
      { 
        id: 'e15', 
        name: 'Footprints without Feet', 
        topics: ['Griffin', 'Invisibility'],
        content: 'Griffin, a brilliant scientist, becomes invisible but uses his power for lawless activities. He is eventually chased out of Iping.'
      },
      { 
        id: 'e16', 
        name: 'The Making of a Scientist', 
        topics: ['Richard Ebright', 'Butterflies'],
        content: 'Richard Ebright\'s journey from a butterfly collector to a world-renowned scientist. It highlights the importance of curiosity and hard work.'
      },
      { 
        id: 'e17', 
        name: 'The Necklace', 
        topics: ['Matilda Loisel', 'Borrowed Jewels'],
        content: 'Matilda Loisel\'s life is ruined when she loses a borrowed necklace. She and her husband spend ten years in poverty to pay for a replacement, only to find the original was fake.'
      },
      { 
        id: 'e18', 
        name: 'Bholi', 
        topics: ['Sulekha', 'Education & Confidence'],
        content: 'Bholi, a neglected child, finds confidence through education. She refuses to marry a greedy man, showing her self-respect and strength.'
      },
      { 
        id: 'e19', 
        name: 'The Book That Saved the Earth', 
        topics: ['Martians', 'Nursery Rhymes'],
        content: 'A play set in the future where Martians try to invade Earth but are scared away by a book of nursery rhymes, which they misinterpret as military secrets.'
      }
    ]
  },
  {
    id: 'hindi',
    name: 'Hindi (Course A)',
    description: 'Kshitij and Kritika - Complete Literature and Grammar.',
    color: '#ff4d4d',
    chapters: [
      { 
        id: 'h1', 
        name: 'Surdas ke Pad', 
        topics: ['Poetry', 'Bhakti Kaal'],
        content: 'सूरदास के पदों में गोपियों की विरह वेदना और कृष्ण के प्रति उनके अनन्य प्रेम का वर्णन है। वे उद्धव के ज्ञान मार्ग को नकार कर प्रेम मार्ग को श्रेष्ठ बताती हैं।'
      },
      { 
        id: 'h2', 
        name: 'Tulsidas - Ram Lakshman Parshuram Samvad', 
        topics: ['Poetry', 'Ramcharitmanas'],
        content: 'रामचरितमानस के बालकांड से लिया गया यह अंश धनुष टूटने के बाद परशुराम के क्रोध और लक्ष्मण के साथ उनके संवाद को दर्शाता है।'
      },
      { 
        id: 'h3', 
        name: 'Jai Shankar Prasad - Aatmakathya', 
        topics: ['Poetry', 'Chhayavad'],
        content: 'प्रसाद जी ने अपनी आत्मकथा न लिखने के कारणों को कविता के माध्यम से बताया है। वे अपने जीवन की कमियों को जगजाहिर नहीं करना चाहते।'
      },
      { 
        id: 'h4', 
        name: 'Suryakant Tripathi Nirala - Utsah, At Nahi Rahi Hai', 
        topics: ['Poetry', 'Nature'],
        content: 'उत्साह एक आह्वान गीत है जो बादलों को क्रांति के प्रतीक के रूप में बुलाता है। "अट नहीं रही है" फागुन की मादकता का वर्णन करती है।'
      },
      { 
        id: 'h5', 
        name: 'Nagarjun - Yeh Danturit Muskan, Fasal', 
        topics: ['Poetry', 'Humanity'],
        content: 'बच्चे की मुस्कान और फसल के पीछे छिपी मेहनत और प्रकृति के सहयोग का सुंदर चित्रण किया गया है।'
      },
      { 
        id: 'h6', 
        name: 'Manglesh Dabral - Sangatkaar', 
        topics: ['Poetry', 'Support'],
        content: 'मुख्य गायक का साथ देने वाले संगतकार की भूमिका और उसकी निस्वार्थ सेवा का वर्णन है।'
      },
      { 
        id: 'h7', 
        name: 'Swayam Prakash - Netaji ka Chashma', 
        topics: ['Prose', 'Patriotism'],
        content: 'हालदार साहब और चश्मे वाले कैप्टन के माध्यम से देशभक्ति की भावना को दर्शाया गया है। यह बताता है कि देशभक्ति केवल सीमा पर ही नहीं, रोजमर्रा के कामों में भी होती है।'
      },
      { 
        id: 'h8', 
        name: 'Ramvriksh Benipuri - Balgobin Bhagat', 
        topics: ['Prose', 'Social Reform'],
        content: 'बालगोबिन भगत एक ऐसे गृहस्थ थे जो कबीर के आदर्शों पर चलते थे। उन्होंने समाज की रूढ़ियों को तोड़कर एक नई मिसाल पेश की।'
      },
      { 
        id: 'h9', 
        name: 'Yashpal - Lakhnavi Andaaz', 
        topics: ['Prose', 'Satire'],
        content: 'नवाबी शान-शौकत और दिखावे की संस्कृति पर करारा व्यंग्य किया गया है।'
      },
      { 
        id: 'h10', 
        name: 'Sarveshwar Dayal Saxena - Manviya Karuna ki Divya Chamak', 
        topics: ['Prose', 'Father Bulke'],
        content: 'फादर कामिल बुल्के के व्यक्तित्व का संस्मरण है, जिन्होंने बेल्जियम से आकर भारत को अपनी कर्मभूमि बनाया और हिंदी की सेवा की।'
      },
      { 
        id: 'h11', 
        name: 'Manu Bhandari - Ek Kahani Yeh Bhi', 
        topics: ['Prose', 'Autobiography'],
        content: 'लेखिका के व्यक्तित्व निर्माण में उनके पिता और उनकी प्राध्यापिका शीला अग्रवाल के योगदान का वर्णन है।'
      },
      { 
        id: 'h12', 
        name: 'Yatindra Mishra - Naubat Khane mein Ibadat', 
        topics: ['Prose', 'Bismillah Khan'],
        content: 'शहनाई वादक बिस्मिल्लाह खान के जीवन और उनकी संगीत साधना का चित्रण है।'
      },
      { 
        id: 'h13', 
        name: 'Bhadant Anand Kausalyayan - Sanskriti', 
        topics: ['Prose', 'Culture'],
        content: 'सभ्यता और संस्कृति के बीच के अंतर को स्पष्ट किया गया है। लेखक के अनुसार, जो कल्याणकारी है वही संस्कृति है।'
      },
      { 
        id: 'h14', 
        name: 'Mata ka Aanchal', 
        topics: ['Kritika', 'Childhood'],
        content: 'ग्रामीण अंचल के बचपन का सजीव चित्रण है। बच्चा पिता के साथ ज्यादा समय बिताता है लेकिन संकट के समय माता की गोद में ही शांति पाता है।'
      },
      { 
        id: 'h15', 
        name: 'George Pancham ki Naak', 
        topics: ['Kritika', 'Satire'],
        content: 'सरकारी तंत्र की गुलाम मानसिकता और दिखावे की राजनीति पर व्यंग्य है।'
      },
      { 
        id: 'h16', 
        name: 'Sana Sana Hath Jodi', 
        topics: ['Kritika', 'Travelogue'],
        content: 'सिक्किम की यात्रा का वृत्तांत है, जिसमें हिमालय की सुंदरता और वहां के लोगों के कठिन जीवन का वर्णन है।'
      }
    ]
  },
  {
    id: 'it',
    name: 'Information Tech',
    description: 'IT Code 402 - Employability Skills and Vocational Skills.',
    color: '#4d79ff',
    chapters: [
      { 
        id: 'it1', 
        name: 'Communication Skills', 
        topics: ['Verbal/Non-verbal', 'Barriers', 'Principles'],
        content: 'Effective communication involves clarity and active listening. Verbal uses words; non-verbal uses body language. Barriers like language or emotions should be overcome for success.'
      },
      { 
        id: 'it2', 
        name: 'Self-Management Skills', 
        topics: ['Stress Management', 'Self-Awareness', 'Self-Motivation'],
        content: 'Managing oneself is key to productivity. Stress can be managed by exercise, sleep, and time management. Self-motivation keeps you going towards your goals.'
      },
      { 
        id: 'it3', 
        name: 'ICT Skills', 
        topics: ['Operating Systems', 'File Management', 'Maintenance'],
        content: 'Information and Communication Technology skills include using OS like Windows/Linux, organizing files, and regular system maintenance to prevent data loss.'
      },
      { 
        id: 'it4', 
        name: 'Entrepreneurial Skills', 
        topics: ['Characteristics', 'Role of Entrepreneurs'],
        content: 'Entrepreneurs take risks to start businesses. They innovate, create jobs, and contribute to the economy. Key traits include perseverance and vision.'
      },
      { 
        id: 'it5', 
        name: 'Green Skills', 
        topics: ['Sustainable Development', 'Our Role'],
        content: 'Green skills are needed for a sustainable future. We must conserve resources, reduce waste, and use renewable energy to protect the environment.'
      },
      { 
        id: 'it6', 
        name: 'Digital Documentation (Advanced)', 
        topics: ['Styles', 'Images', 'Mail Merge'],
        content: 'Advanced word processing includes using styles for consistency, inserting and formatting images, and using Mail Merge to send personalized letters to many people.'
      },
      { 
        id: 'it7', 
        name: 'Electronic Spreadsheet (Advanced)', 
        topics: ['Consolidate', 'Goal Seek', 'Macros'],
        content: 'Spreadsheets can consolidate data from multiple sheets. Goal Seek helps find input for a desired output. Macros automate repetitive tasks.'
      },
      { 
        id: 'it8', 
        name: 'Database Management System', 
        topics: ['SQL', 'Forms', 'Reports', 'Relationships'],
        content: 'DBMS stores data in tables. SQL is used to query data. Forms are for data entry; Reports are for output. Relationships link tables together.'
      },
      { 
        id: 'it9', 
        name: 'Web Applications and Security', 
        topics: ['Accessibility', 'Networking', 'Cyber Security'],
        content: 'Web apps should be accessible to all. Networking connects computers. Cyber security protects data from online threats like viruses and hacking.'
      }
    ]
  }
];


