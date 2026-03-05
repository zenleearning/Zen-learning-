export interface ChapterSection {
  title: string;
  content: string;
}

export interface ChapterExample {
  question: string;
  answer: string;
}

export interface ChapterQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Chapter {
  id: string;
  name: string;
  topics: string[];
  content: string; // Keep for backward compatibility or as general intro
  sections?: ChapterSection[];
  examples?: ChapterExample[];
  summary?: string;
  quiz?: ChapterQuiz[];
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
        content: 'The Fundamental Theorem of Arithmetic states that every composite number can be expressed as a product of primes. This factorization is unique. We also explore the proof of irrationality for numbers like √2, √3, and √5.',
        sections: [
          {
            title: '1.1 Introduction to Real Numbers',
            content: 'Real numbers consist of all the rational and irrational numbers. The real number system is denoted by the symbol R. In this chapter, we will focus on the properties of integers, specifically the Fundamental Theorem of Arithmetic.'
          },
          {
            title: '1.2 The Fundamental Theorem of Arithmetic',
            content: 'Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur. For example, 210 = 2 × 3 × 5 × 7.'
          },
          {
            title: '1.3 Revisiting Irrational Numbers',
            content: 'A number is called irrational if it cannot be written in the form p/q, where p and q are integers and q ≠ 0. Examples include √2, √3, π, etc. We prove irrationality using the method of contradiction.'
          }
        ],
        examples: [
          {
            question: 'Find the HCF and LCM of 6 and 20 by the prime factorisation method.',
            answer: '6 = 2¹ × 3¹. 20 = 2² × 5¹. HCF = 2¹ = 2. LCM = 2² × 3¹ × 5¹ = 60.'
          }
        ],
        summary: 'Real numbers include rational and irrational numbers. The Fundamental Theorem of Arithmetic is key to understanding prime factorisation and its applications in finding HCF and LCM.',
        quiz: [
          {
            question: 'Which of the following is an irrational number?',
            options: ['2/3', '√4', '√5', '0.5'],
            correctAnswer: 2
          }
        ]
      },
      { 
        id: 'm2', 
        name: 'Polynomials', 
        topics: ['Zeros of a Polynomial', 'Relationship between Zeros and Coefficients'],
        content: 'A polynomial is an expression consisting of variables and coefficients. We focus on quadratic polynomials, their zeros (roots), and the relationship between these zeros and the coefficients.',
        sections: [
          {
            title: '2.1 Geometrical Meaning of the Zeros',
            content: 'The zeros of a polynomial p(x) are precisely the x-coordinates of the points where the graph of y = p(x) intersects the x-axis. For a linear polynomial, there is at most one zero. For a quadratic polynomial, there are at most two zeros.'
          },
          {
            title: '2.2 Relationship between Zeros and Coefficients',
            content: 'For a quadratic polynomial ax² + bx + c, if α and β are the zeros, then: Sum of zeros (α + β) = -b/a. Product of zeros (αβ) = c/a.'
          }
        ],
        examples: [
          {
            question: 'Find the zeros of the quadratic polynomial x² + 7x + 10.',
            answer: 'x² + 7x + 10 = (x + 2)(x + 5). Zeros are -2 and -5. Sum = -7 = -b/a. Product = 10 = c/a.'
          }
        ],
        summary: 'Polynomials are algebraic expressions. Quadratic polynomials are central to this chapter, specifically their zeros and how they relate to the coefficients of the terms.',
        quiz: [
          {
            question: 'What is the product of zeros for x² - 5x + 6?',
            options: ['5', '-5', '6', '-6'],
            correctAnswer: 2
          }
        ]
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
        content: 'Chemical reactions involve breaking and making of bonds. Types include Combination, Decomposition, Displacement, and Double Displacement. Redox reactions involve simultaneous oxidation and reduction.',
        sections: [
          {
            title: '1.1 Physical and Chemical Changes',
            content: 'A physical change only affects the physical properties of a substance, while a chemical change results in the formation of new substances with different properties. A chemical reaction is a process where substances react to form new products.'
          },
          {
            title: '1.2 Writing Chemical Equations',
            content: 'A chemical equation represents a chemical reaction using symbols and formulas. For example, Mg + O₂ → MgO. To follow the Law of Conservation of Mass, we must balance the equation: 2Mg + O₂ → 2MgO.'
          },
          {
            title: '1.3 Types of Chemical Reactions',
            content: '1. Combination: Two or more reactants form one product. 2. Decomposition: One reactant breaks into two or more products. 3. Displacement: A more reactive element displaces a less reactive one. 4. Double Displacement: Exchange of ions between reactants.'
          }
        ],
        examples: [
          {
            question: 'Balance the following equation: Fe + H₂O → Fe₃O₄ + H₂',
            answer: '3Fe + 4H₂O → Fe₃O₄ + 4H₂'
          }
        ],
        summary: 'Chemical reactions are represented by balanced equations. Understanding the types of reactions helps in predicting products and understanding chemical behavior.',
        quiz: [
          {
            question: 'Which of the following is a decomposition reaction?',
            options: ['H₂ + O₂ → H₂O', 'CaCO₃ → CaO + CO₂', 'Zn + HCl → ZnCl₂ + H₂', 'NaOH + HCl → NaCl + H₂O'],
            correctAnswer: 1
          }
        ]
      },
      { 
        id: 's2', 
        name: 'Acids, Bases and Salts', 
        topics: ['Indicators', 'pH Scale', 'Common Salt Derivatives'],
        content: 'Acids are sour and turn blue litmus red. Bases are bitter and turn red litmus blue. pH scale (0-14) measures acidity. Salts like Baking Soda and Bleaching Powder are derived from common salt.',
        sections: [
          {
            title: '2.1 Chemical Properties of Acids and Bases',
            content: 'Acids react with metals to produce hydrogen gas. Bases also react with some metals to produce hydrogen. Acids and bases react with each other to form salt and water (Neutralization reaction).'
          },
          {
            title: '2.2 How Strong are Acid or Base Solutions?',
            content: 'The strength is measured using the pH scale. pH < 7 is acidic, pH > 7 is basic, and pH = 7 is neutral. The scale measures the concentration of H+ ions in the solution.'
          },
          {
            title: '2.3 More about Salts',
            content: 'Salts are formed by the neutralization of acids and bases. Common salt (NaCl) is a raw material for many chemicals like Sodium Hydroxide, Bleaching Powder, Baking Soda, and Washing Soda.'
          }
        ],
        examples: [
          {
            question: 'What happens when an acid reacts with a metal carbonate?',
            answer: 'Acid + Metal Carbonate → Salt + Carbon Dioxide + Water. For example: Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂'
          }
        ],
        summary: 'Acids and bases are fundamental chemical substances. Their interaction leads to the formation of salts, which have numerous industrial and domestic applications.',
        quiz: [
          {
            question: 'What is the pH of a neutral solution?',
            options: ['0', '7', '14', '1'],
            correctAnswer: 1
          }
        ]
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
        content: 'Mahatma Gandhi led the struggle using Satyagraha. Rowlatt Act and Jallianwala Bagh led to Non-Cooperation. Salt March started Civil Disobedience. Quit India was the final call for independence.',
        sections: [
          {
            title: '1. The First World War, Khilafat and Non-Cooperation',
            content: 'The war created a new economic and political situation in India. Forced recruitment and crop failure led to widespread anger. Gandhi introduced Satyagraha, a non-violent method of mass agitation.'
          },
          {
            title: '2. Differing Strands within the Movement',
            content: 'The Non-Cooperation-Khilafat Movement began in 1921. It spread to towns (boycott of foreign goods) and countrysides (peasant struggles in Awadh and tribal revolts in Gudem Hills).'
          },
          {
            title: '3. Towards Civil Disobedience',
            content: 'In 1930, Gandhi started the Salt March from Sabarmati to Dandi. This marked the beginning of the Civil Disobedience Movement, where people were asked not only to refuse cooperation but also to break colonial laws.'
          }
        ],
        examples: [
          {
            question: 'Why did Gandhiji decide to withdraw the Non-Cooperation Movement?',
            answer: 'Due to the Chauri Chaura incident in 1922, where a peaceful demonstration turned violent and a police station was set on fire.'
          }
        ],
        summary: 'Nationalism in India was a mass movement led by Mahatma Gandhi. It evolved through various stages like Non-Cooperation and Civil Disobedience, eventually leading to India\'s independence.',
        quiz: [
          {
            question: 'In which year did the Salt March take place?',
            options: ['1920', '1930', '1942', '1919'],
            correctAnswer: 1
          }
        ]
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
        content: 'Lencho, a poor farmer, has immense faith in God. When his crops are destroyed, he writes a letter to God asking for 100 pesos. The postmaster, moved by his faith, collects money to help him.',
        sections: [
          {
            title: '1. Lencho\'s Hope and Despair',
            content: 'Lencho was a dedicated farmer who lived on the crest of a low hill. He was expecting a good harvest, but a sudden hailstorm destroyed his entire cornfield. Left with nothing, his only hope was help from God.'
          },
          {
            title: '2. The Letter to God',
            content: 'Despite his situation, Lencho had unwavering faith. He wrote a letter to God, asking for 100 pesos to sow his field again and live until the next crop. He dropped the letter in the mailbox, addressed simply "To God".'
          },
          {
            title: '3. The Postmaster\'s Response',
            content: 'The postmaster laughed at first but was soon touched by Lencho\'s faith. He decided to answer the letter. He collected money from his employees and friends, but could only gather 70 pesos. He sent it to Lencho, signed "God".'
          }
        ],
        examples: [
          {
            question: 'Why did Lencho call the post office employees a "bunch of crooks"?',
            answer: 'Because he received only 70 pesos instead of the 100 he asked for. He believed the employees had stolen the remaining 30 pesos, not doubting for a moment that God could make a mistake.'
          }
        ],
        summary: 'The story explores the themes of extreme faith and the irony of human nature. Lencho\'s faith in God is absolute, but his distrust of fellow humans leads to a bittersweet conclusion.',
        quiz: [
          {
            question: 'How much money did Lencho receive?',
            options: ['100 pesos', '70 pesos', '50 pesos', '30 pesos'],
            correctAnswer: 1
          }
        ]
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

export const UP_BOARD_DATA: Subject[] = [
  {
    id: 'up-maths',
    name: 'गणित (Mathematics)',
    description: 'उत्तर प्रदेश माध्यमिक शिक्षा परिषद् (UPMSP) कक्षा 10 गणित का सम्पूर्ण पाठ्यक्रम।',
    color: '#00ffff',
    chapters: [
      {
        id: 'up-m1',
        name: 'वास्तविक संख्याएँ (Real Numbers)',
        topics: ['यूक्लिड विभाजन प्रमेयिका', 'अपरिमेय संख्याओं का पुनर्भ्रमण'],
        content: 'वास्तविक संख्याएँ गणित का आधार हैं। इस अध्याय में हम यूक्लिड विभाजन प्रमेयिका और अंकगणित की आधारभूत प्रमेय के बारे में विस्तार से पढ़ेंगे।',
        sections: [
          {
            title: '1.1 परिचय (Introduction)',
            content: 'वास्तविक संख्याएँ वे संख्याएँ होती हैं जिन्हें संख्या रेखा पर दर्शाया जा सकता है। इसमें परिमेय (Rational) और अपरिमेय (Irrational) दोनों संख्याएँ शामिल हैं।'
          },
          {
            title: '1.2 यूक्लिड विभाजन प्रमेयिका (Euclid\'s Division Lemma)',
            content: 'दो धनात्मक पूर्णांक a और b दिए रहने पर, ऐसी अद्वितीय पूर्ण संख्याएँ q और r विद्यमान हैं कि a = bq + r, जहाँ 0 ≤ r < b है। इसका उपयोग HCF निकालने के लिए किया जाता है।'
          },
          {
            title: '1.3 अंकगणित की आधारभूत प्रमेय (Fundamental Theorem of Arithmetic)',
            content: 'प्रत्येक भाज्य संख्या को अभाज्य संख्याओं के एक गुणनफल के रूप में व्यक्त किया जा सकता है। जैसे: 10 = 2 × 5.'
          }
        ],
        examples: [
          {
            question: '4052 और 12576 का HCF यूक्लिड विभाजन एल्गोरिथ्म का प्रयोग करके ज्ञात कीजिए।',
            answer: 'चरण 1: 12576 = 4052 × 3 + 420. चरण 2: 4052 = 420 × 9 + 272. चरण 3: 420 = 272 × 1 + 148. चरण 4: 272 = 148 × 1 + 124. चरण 5: 148 = 124 × 1 + 24. चरण 6: 124 = 24 × 5 + 4. चरण 7: 24 = 4 × 6 + 0. अतः HCF 4 है।'
          }
        ],
        summary: 'यूक्लिड विभाजन एल्गोरिथ्म दो धनात्मक पूर्णांकों का HCF निकालने की एक विधि है।',
        quiz: [
          {
            question: 'π (पाई) कैसी संख्या है?',
            options: ['परिमेय', 'अपरिमेय', 'पूर्णांक', 'प्राकृतिक'],
            correctAnswer: 1
          }
        ]
      },
      {
        id: 'up-m2',
        name: 'बहुपद (Polynomials)',
        topics: ['बहुपद के शून्यक', 'शून्यकों और गुणांकों में संबंध'],
        content: 'बहुपद बीजगणित का एक महत्वपूर्ण हिस्सा है। यहाँ हम द्विघात बहुपद और उनके शून्यकों के बारे में पढ़ेंगे।',
        sections: [
          {
            title: '2.1 बहुपद के शून्यकों का ज्यामितीय अर्थ',
            content: 'किसी बहुपद p(x) के शून्यक उन बिंदुओं के x-निर्देशांक होते हैं जहाँ y = p(x) का ग्राफ x-अक्ष को प्रतिच्छेद करता है।'
          },
          {
            title: '2.2 शून्यकों और गुणांकों में संबंध',
            content: 'द्विघात बहुपद ax² + bx + c के लिए: शून्यकों का योग (α + β) = -b/a, शून्यकों का गुणनफल (αβ) = c/a.'
          }
        ],
        quiz: [
          {
            question: 'द्विघात बहुपद की अधिकतम घात कितनी होती है?',
            options: ['1', '2', '3', '4'],
            correctAnswer: 1
          }
        ]
      },
      {
        id: 'up-m3',
        name: 'दो चरों वाले रैखिक समीकरण युग्म',
        topics: ['प्रतिस्थापन विधि', 'विलोपन विधि', 'वज्र-गुणन विधि'],
        content: 'इस अध्याय में हम दो चरों वाले रैखिक समीकरणों को हल करने की विभिन्न विधियों के बारे में सीखेंगे।',
        sections: [
          {
            title: '3.1 रैखिक समीकरण युग्म का ग्राफीय निरूपण',
            content: 'दो रेखाएँ या तो प्रतिच्छेद करेंगी (एक हल), समांतर होंगी (कोई हल नहीं), या संपाती होंगी (अनेक हल)।'
          }
        ]
      },
      {
        id: 'up-m4',
        name: 'द्विघात समीकरण (Quadratic Equations)',
        topics: ['गुणनखंडन विधि', 'पूर्ण वर्ग विधि', 'द्विघाती सूत्र'],
        content: 'ax² + bx + c = 0 के रूप के समीकरणों को द्विघात समीकरण कहते हैं।',
        sections: [
          {
            title: '4.1 विविक्तकर (Discriminant)',
            content: 'D = b² - 4ac. यदि D > 0 तो मूल वास्तविक और भिन्न होंगे। यदि D = 0 तो मूल वास्तविक और समान होंगे।'
          }
        ]
      }
    ]
  },
  {
    id: 'up-science',
    name: 'विज्ञान (Science)',
    description: 'UP Board कक्षा 10 विज्ञान - भौतिक, रसायन और जीव विज्ञान।',
    color: '#00ff80',
    chapters: [
      {
        id: 'up-s1',
        name: 'रासायनिक अभिक्रियाएँ एवं समीकरण',
        topics: ['संतुलित समीकरण', 'अभिक्रियाओं के प्रकार'],
        content: 'जब एक या एक से अधिक पदार्थ आपस में क्रिया करके नए पदार्थ बनाते हैं, तो उसे रासायनिक अभिक्रिया कहते हैं।',
        sections: [
          {
            title: '1.1 रासायनिक समीकरण लिखना',
            content: 'अभिक्रिया में भाग लेने वाले पदार्थों को अभिकारक (Reactants) और बनने वाले पदार्थों को उत्पाद (Products) कहते हैं।'
          },
          {
            title: '1.2 संतुलित रासायनिक समीकरण',
            content: 'द्रव्यमान संरक्षण के नियम के अनुसार, किसी भी रासायनिक अभिक्रिया में द्रव्यमान का न तो निर्माण होता है और न ही विनाश।'
          }
        ]
      },
      {
        id: 'up-s2',
        name: 'अम्ल, क्षारक एवं लवण (Acids, Bases and Salts)',
        topics: ['pH पैमाना', 'सूचक', 'साधारण नमक'],
        content: 'अम्ल स्वाद में खट्टे होते हैं और नीले लिटमस को लाल कर देते हैं। क्षारक स्वाद में कड़वे होते हैं और लाल लिटमस को नीला कर देते हैं।',
        sections: [
          {
            title: '2.1 pH पैमाना',
            content: 'pH पैमाना 0 से 14 तक होता है। 7 से कम अम्लीय, 7 उदासीन और 7 से अधिक क्षारीय होता है।'
          }
        ]
      }
    ]
  },
  {
    id: 'up-hindi',
    name: 'हिंदी (Hindi)',
    description: 'UP Board कक्षा 10 हिंदी - गद्य, पद्य और संस्कृत खंड।',
    color: '#ff4d4d',
    chapters: [
      {
        id: 'up-h1',
        name: 'मित्रता (आचार्य रामचंद्र शुक्ल)',
        topics: ['गद्य खंड', 'जीवन परिचय'],
        content: 'यह निबंध मित्रता के महत्व और अच्छे मित्रों के चयन की आवश्यकता पर प्रकाश डालता है।',
        sections: [
          {
            title: '1.1 मित्रता का महत्व',
            content: 'लेखक के अनुसार, जब हम घर से बाहर निकलते हैं, तो सबसे पहली समस्या मित्र चुनने की होती है। एक अच्छा मित्र औषधि के समान होता है जो हमें बुराइयों से बचाता है।'
          }
        ]
      },
      {
        id: 'up-h2',
        name: 'ममता (जयशंकर प्रसाद)',
        topics: ['कहानी', 'ऐतिहासिक पृष्ठभूमि'],
        content: 'यह कहानी एक विधवा ब्राह्मणी ममता के त्याग और उसके स्वाभिमान की कथा है।',
        sections: [
          {
            title: '2.1 ममता का चरित्र',
            content: 'ममता रोहतास दुर्ग के मंत्री चूड़ामणि की अकेली दुहिता थी। वह अपने धर्म और संस्कृति के प्रति अडिग थी।'
          }
        ]
      },
      {
        id: 'up-h3',
        name: 'पद (सूरदास)',
        topics: ['काव्य खंड', 'व्याख्या'],
        content: 'सूरदास जी के पदों में भक्ति और वात्सल्य रस की प्रधानता है।',
        sections: [
          {
            title: '3.1 चरण कमल बंदौ हरि राई',
            content: 'इस पद में सूरदास जी श्री कृष्ण के कमल रूपी चरणों की वंदना करते हैं, जिनकी कृपा से लंगड़ा व्यक्ति पर्वत लाँघ सकता है और अंधा सब कुछ देख सकता है।'
          }
        ]
      }
    ]
  },
  {
    id: 'up-english',
    name: 'English (UP Board)',
    description: 'UP Board Class 10 English - Prose, Poetry, and Supplementary Reader.',
    color: '#ff00ff',
    chapters: [
      {
        id: 'up-e1',
        name: 'A Letter to God (G.L. Fuentes)',
        topics: ['Lencho', 'Faith', 'Postmaster'],
        content: 'Lencho was a hardworking farmer. He had immense faith in God. When his crops were destroyed, he wrote a letter to God.',
        sections: [
          {
            title: '1.1 Lencho\'s Faith',
            content: 'Lencho believed that God sees everything, even what is deep in one\'s conscience. He wrote a letter asking for 100 pesos.'
          }
        ]
      },
      {
        id: 'up-e2',
        name: 'Nelson Mandela: Long Walk to Freedom',
        topics: ['Apartheid', 'Freedom', 'Sacrifice'],
        content: 'This is an extract from the autobiography of Nelson Mandela, the first black president of South Africa.',
        sections: [
          {
            title: '2.1 The Inauguration',
            content: '10th May dawned bright and clear. For the past few days, I had been pleasantly besieged by dignitaries and world leaders.'
          }
        ]
      }
    ]
  }
];
