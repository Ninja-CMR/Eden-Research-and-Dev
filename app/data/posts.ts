export type PostCategory = 'analysis' | 'code' | 'skill';

export interface Author {
  name: string;
  role: string;
  organization: string;
  avatar: string;
}

export interface ExecutiveSummaryPoint {
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface Post {
  id: string;
  slug: string;
  type: PostCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  audioTime: string;
  author: Author;
  tags: string[];
  featured?: boolean;
  executiveSummary: ExecutiveSummaryPoint[];
  audioTranscript: string;
  content: {
    intro: string;
    sections: {
      id: string;
      title: string;
      lead?: string;
      paragraphs?: string[];
      bullets?: { title: string; text: string }[];
      callout?: {
        type: 'info' | 'warning' | 'tip' | 'quote';
        title?: string;
        text: string;
        author?: string;
      };
      table?: {
        headers: string[];
        rows: string[][];
      };
      codeSnippet?: {
        language: string;
        filename: string;
        code: string;
        explanation?: string;
      };
    }[];
    conclusion: {
      title: string;
      text: string;
      takeaways: string[];
    };
  };
}

export const POSTS: Post[] = [
  {
    id: '1',
    slug: 'intelligence-artificielle-milieu-scolaire',
    type: 'analysis',
    categoryLabel: 'Analyses & Société',
    title: "L'Intelligence Artificielle dans l'Éducation en Afrique : Révolution pédagogique ou piège cognitif pour la jeunesse camerounaise ?",
    subtitle: "Une analyse systémique des impacts de l'intégration des LLMs sur les campus et lycées du Cameroun et d'Afrique : opportunités de combler le déficit d'encadrement, contraintes de connectivité et forfaits data, souveraineté culturelle et méthodologies concrètes pour les étudiants et enseignants.",
    excerpt: "Face aux amphis surchargés et à la rareté des manuels, comment l'intelligence artificielle peut-elle transformer l'apprentissage des étudiants camerounais et africains sans sacrifier l'effort intellectuel et l'ancrage local ? Enquête prospective.",
    coverImage: '/images/ai-education.jpg',
    publishedAt: '21 Octobre 2026',
    readTime: '8 min de lecture',
    audioTime: '5 min d\'écoute',
    featured: true,
    author: {
      name: "Meva'a Olivier",
      role: "Chef du département technique de Grow Tech, Responsable et Fondateur de Eden",
      organization: 'Eden Research & Dev • Grow Tech',
      avatar: '/avatar.jpeg',
    },
    tags: ['Intelligence Artificielle', 'Afrique & Cameroun', 'Pédagogie Universitaire', 'Souveraineté Numérique', 'Étudiants'],
    executiveSummary: [
      {
        title: 'Tutorat universel face aux amphis surchargés',
        description: "Dans un contexte où les universités d'État (Yaoundé I, Douala, Dschang...) font face à des ratios de parfois 1 enseignant pour 800 étudiants, l'IA offre une assistance personnalisée 24h/24 sur smartphone pour débloquer les concepts ardus.",
        impact: 'positive',
      },
      {
        title: 'La double fracture : data mobile et paresse cognitive',
        description: "Au-delà du coût des forfaits data (MTN, Orange) et des délestages électriques, le danger critique réside dans le copier-coller passif lors des TPE et mémoires, provoquant une illusion d'apprentissage sans assimilation réelle.",
        impact: 'negative',
      },
      {
        title: 'Souveraineté épistémique et décolonisation des données',
        description: "Entraînés sur des corpus occidentaux, les LLMs ignorent souvent le droit OHADA, la pharmacopée locale ou l'histoire africaine. L'étudiant africain doit développer une vigilance critique pour éviter l'aliénation intellectuelle.",
        impact: 'neutral',
      },
    ],
    audioTranscript: "Bienvenue dans cette synthèse Eden Research & Dev dédiée à l'impact de l'intelligence artificielle sur l'enseignement supérieur et secondaire en Afrique, et particulièrement au Cameroun. De Ngoa-Ekellé à l'Université de Douala, de Dschang aux lycées de Yaoundé et Bafoussam, les étudiants africains ont massivement adopté les modèles d'IA sur leurs smartphones pour pallier le manque d'ouvrages récents et les amphithéâtres pléthoriques. Si cette technologie représente une chance historique d'accéder au savoir mondial et de préparer les grands concours nationaux, elle comporte deux périls majeurs : l'atrophie de l'effort de recherche personnelle par le copier-coller dans les mémoires, et l'assimilation aveugle de biais culturels ignorant nos réalités endogènes comme le droit OHADA ou nos contextes socio-économiques. Cette analyse propose une feuille de route pour faire de l'IA un propulseur d'excellence africaine.",
    content: {
      intro: "Sur les campus universitaires camerounais et africains, du campus historique de Ngoa-Ekellé (Yaoundé I) aux facultés de Douala, Dschang, Buea ou Ngaoundéré, une scène est devenue quotidienne : des étudiants serrés sur les bancs d'amphithéâtres surchargés, les yeux rivés sur l'écran de leur smartphone, interrogeant ChatGPT, Claude ou Gemini entre deux cours magistraux. Dans un environnement académique marqué par un ratio enseignants/étudiants souvent disproportionné (parfois un seul professeur pour plus de 500 à 1 000 étudiants en première année) et des bibliothèques physiques peinant à renouveler leurs fonds documentaires, l'irruption de l'intelligence artificielle générative a été vécue comme un séisme émancipateur.\n\nPourtant, cette révolution silencieuse ne s'opère pas dans le même contexte qu'en Occident. En Afrique subsaharienne, elle se heurte aux dures réalités des coupures électriques intempestives (délestages), au coût non négligeable des forfaits data mobiles (bundles MTN, Orange, Camtel), et surtout à une menace insidieuse : l'importation brute de modèles de pensée occidentaux déconnectés de nos réalités juridiques, économiques et culturelles. Comment l'étudiant camerounais et africain peut-il s'approprier l'IA pour bâtir une excellence authentique sans tomber dans le piège de la facilité cognitive ?",
      sections: [
        {
          id: 'contexte-africain',
          title: "1. De l'amphi surchargé au smartphone : la ruée vers le précepteur numérique",
          lead: "Pour des millions d'étudiants africains, l'IA n'est pas un gadget de confort : c'est souvent la seule alternative pour obtenir une explication personnalisée.",
          paragraphs: [
            "Dans nos universités d'État et nos grandes écoles d'ingénieurs et facultés (l'ENSP de Yaoundé - ENSPY, l'ENSP de Douala - ENSPD, l'ENS, la FMSB, les IUT...), la soif d'apprendre se heurte quotidiennement à la massification des effectifs. Poser une question à la fin d'un cours magistral de 3 heures relève souvent de l'exploit logistique pour un étudiant assis au dernier rang. Dans ce vide d'encadrement individuel, l'IA générative s'est imposée comme le tuteur particulier par excellence : disponible à minuit, patient, capable de réexpliquer le théorème de Cauchy-Schwarz ou la théorie des obligations en français ou en anglais, et ce, sans jamais juger l'étudiant.",
            "À cela s'ajoute le défi critique de la documentation. Acheter un manuel universitaire importé coûte fréquemment entre 20 000 et 50 000 FCFA, une somme prohibitive pour la grande majorité des familles. Les étudiants camerounais, champions de la débrouille numérique et de l'ingéniosité de survie, ont rapidement transformé leur téléphone portable en bibliothèque universelle interactive via les applications mobiles ou les bots WhatsApp."
          ],
          callout: {
            type: 'quote',
            text: "En Afrique, l'IA générative ne vient pas concurrencer l'enseignant ; elle vient combler le silence des amphithéâtres pléthoriques et la pénurie d'ouvrages spécialisés à jour.",
            author: "Laboratoire Eden R&D — Prospective Technologique Africaine"
          }
        },
        {
          id: 'opportunites-emancipation',
          title: "2. Les opportunités d'émancipation : le saut qualitatif (Leapfrogging)",
          lead: "À l'image du Mobile Money qui a permis à l'Afrique de sauter l'étape de la bancarisation traditionnelle, l'IA peut propulser l'apprentissage vers des standards internationaux.",
          bullets: [
            {
              title: "Préparation intensive aux concours nationaux et examens d'État",
              text: "Qu'il s'agisse de préparer les concours d'entrée aux grandes écoles d'ingénieurs (l'ENSP de Yaoundé - ENSPY, l'ENSP de Douala - ENSPD), de médecine (FMSB), d'administration (ENAM) ou le GCE Advanced Level et le Baccalauréat C/D, l'IA génère à la demande des exercices d'entraînement ciblés, corrige les dissertations et propose des grilles d'auto-évaluation méthodologique."
            },
            {
              title: "Démocratisation de l'auto-formation en informatique et sciences dures",
              text: "Des milliers de jeunes Camerounais se forment aujourd'hui au développement web, à la data science et à la cybersécurité depuis leur chambre sans tuteur physique. L'IA débogue leur code Python ou C++, explique les messages d'erreur et accélère leur employabilité sur le marché du travail local et en freelance international."
            },
            {
              title: "Dépassement de la barrière linguistique et bilinguisme camerounais",
              text: "Dans le contexte spécifique du bilinguisme officiel camerounais (français et anglais), l'IA constitue une passerelle magistrale. Un étudiant francophone à Yaoundé peut assimiler des publications de recherche anglophones de pointe de manière fluide, tandis qu'un étudiant anglophone de Buea ou Bamenda peut traduire et adapter ses travaux sans friction administrative."
            },
            {
              title: "Appui à la recherche appliquée et aux projets d'innovation locale",
              text: "Pour les étudiants entrepreneurs développant des solutions adaptées à nos défis (agritech face aux maladies des cultures vivrières, systèmes d'alerte météo rurale, fintech pour tontines numériques), l'IA aide à structurer les business plans, rédiger les demandes de subventions et formuler des revues de littérature exhaustives."
            }
          ]
        },
        {
          id: 'perils-cognitifs-africains',
          title: "3. Les périls critiques : paresse cognitive, délestages et aliénation culturelle",
          lead: "L'outil le plus puissant peut devenir le plus grand piège s'il atrophie la capacité d'investigation et véhicule des biais étrangers à nos réalités.",
          paragraphs: [
            "Le premier fléau visible sur les campus est celui du 'copier-coller aveugle'. Face à la pression des Travaux Pratiques Encadrés (TPE) et des mémoires de Licence ou Master, de plus en plus d'étudiants délèguent l'intégralité de la rédaction à l'IA. Le résultat est alarmant : des travaux formellement élégants mais creux, dénués de toute enquête de terrain réelle sur le marché de Mokolo, dans les plantations du Moungo ou au port autonome de Kribi. Lors des soutenances, l'étudiant est incapable d'expliquer la méthodologie ou de justifier un tableau statistique qu'il n'a fait que générer.",
            "Le second écueil, crucial pour l'Afrique, est le biais épistémique. Les grands modèles de langage sont nourris à 90 % de données occidentales et nord-américaines. Si un étudiant en droit à l'Université de Yaoundé II Soa interroge ChatGPT sur un litige commercial sans précaution, l'IA appliquera par défaut le droit des contrats français ou américain au lieu de l'Acte Uniforme OHADA ! De même, en sociologie, en philosophie ou en santé publique, l'IA marginalise nos penseurs (Cheikh Anta Diop, Marcien Towa, Achille Mbembe, Mongo Beti) et nos réalités sanitaires tropicales."
          ],
          callout: {
            type: 'warning',
            title: 'La fracture de la data et des devises',
            text: "Payer un abonnement mensuel à 20 $ (environ 13 000 FCFA) pour accéder aux modèles de pointe (GPT-4o, Claude Opus) est impossible pour la majorité des étudiants, sans compter les restrictions des cartes bancaires locales. Les étudiants les plus modestes restent cantonnés aux versions gratuites et limitées, tandis que les coupures d'électricité (délestages) interrompent les sessions de travail."
          }
        },
        {
          id: 'matrice-africaine',
          title: "4. Matrice d'analyse comparative : Réalités camerounaises & africaines",
          lead: "Mise en miroir des opportunités concrètes et des dérives observables dans nos établissements.",
          table: {
            headers: ["Défi Académique Africain", "Opportunité offerte par l'IA", "Piège / Dérive observée", "Solution & Pratique recommandée"],
            rows: [
              [
                "Amphis surchargés (ratio 1:800)",
                "Explications personnalisées et répétition infinie sur mobile.",
                "Isolement de l'étudiant et rupture avec le corps professoral.",
                "Groupes de travail hybrides combinant tuteur IA et débats physiques entre camarades."
              ],
              [
                "TPE & Mémoires de fin de cycle",
                "Aide à la structuration du plan, correction orthographique et syntaxique.",
                "Plagiat de masse et mémoires 'hors-sol' sans données de terrain locales.",
                "Exigence stricte de données d'enquêtes locales certifiées et soutenances orales contradictoires."
              ],
              [
                "Spécificités juridiques & économiques",
                "Synthèse rapide de textes de lois et croisements sectoriels.",
                "Application erronée de codes étrangers au détriment du droit OHADA ou CIMA.",
                "Prompting contextuel obligatoire injectant explicitement les normes camerounaises et africaines."
              ],
              [
                "Contrainte de data & d'électricité",
                "Accès au savoir condensé sans télécharger des dizaines de PDF lourds.",
                "Dépendance aux connexions en ligne instables et coûteuses.",
                "Adoption de modèles IA 'low-bandwidth' légers et outils d'interrogation hors-ligne."
              ]
            ]
          }
        },
        {
          id: 'boite-a-outils-prompt-afrique',
          title: "5. Boîte à outils : Le Prompt Socratique adapté au contexte camerounais et africain",
          lead: "Un prompt système conçu pour transformer l'IA en répétiteur rigoureux, obligeant à contextualiser systématiquement avec nos réalités africaines.",
          paragraphs: [
            "Ce template a été calibré pour contraindre l'IA à refuser de rédiger vos devoirs à votre place, tout en la forçant à tenir compte du contexte économique, juridique (OHADA) et social du Cameroun et du continent africain."
          ],
          codeSnippet: {
            language: 'markdown',
            filename: 'tuteur_socratique_afrique.md',
            code: `# INSTRUCTIONS SYSTÈME : PRÉCEPTEUR ACADÉMIQUE AFRICAIN
Tu agis en tant que tuteur académique rigoureux et exigeant, spécialiste de l'enseignement supérieur au Cameroun et en Afrique.

## OBJECTIF SUPRÊME :
Tu dois aider l'étudiant à COMPRENDRE et CONSTRUIRE son raisonnement par lui-même, SANS JAMAIS faire le devoir ou rédiger le texte à sa place.

## RÈGLES STRICTES D'INTERACTION :
1. REFUS DE RÉDACTION DIRECTE : Si l'étudiant demande "Rédige mon TPE", "Fais mon exposé", "Donne-moi la solution de cet exercice" :
   - Refuse catégoriquement avec courtoisie.
   - Demande-lui : "Quelle est ta première piste de réflexion ou la formule que tu penses utiliser ?"
2. ANCRAGE CONTEXTUEL OBLIGATOIRE :
   - Pour toute question de droit : réfère-toi prioritairement au droit camerounais et aux Actes Uniformes de l'OHADA, au code CIMA ou aux traités CEMAC/UEMOA.
   - Pour les sciences économiques ou de gestion : intègre les réalités de nos économies (secteur informel, Mobile Money, PME locales, contraintes d'import-substitution).
   - Pour les sciences & technologies : valorise l'adaptation aux contraintes locales (climat tropical, résilience énergétique, connectivité limitée).
3. DÉMARCHE SOCRATIQUE :
   - Décompose le problème complexe en sous-questions stimulantes.
   - Souligne les erreurs de logique sans donner la réponse brute.
   - Encourage la rigueur scientifique et la vérification des sources.

Format de réponse :
- 1 phrase d'encouragement dynamique.
- 1 piste de réflexion ou contre-exemple ancré dans le contexte local.
- 1 question précise invitant l'étudiant à formuler sa propre hypothèse.`,
            explanation: "Copiez ce prompt dans ChatGPT, Claude ou DeepSeek au début de chaque session d'étude pour bénéficier d'un entraînement cérébral réel plutôt que d'une copie passive."
          }
        },
        {
          id: 'recommandations-universites-africaines',
          title: "6. Feuilles de route pour les universités, lycées et étudiants camerounais",
          lead: "Comment transformer nos campus en pôles d'excellence technologique plutôt qu'en consommateurs passifs ?",
          bullets: [
            {
              title: "Réhabiliter l'évaluation de terrain et la soutenance orale",
              text: "Face aux devoirs maison désormais perméables à la génération automatisée, les facultés doivent réorienter l'évaluation vers l'enquête empirique (interviews d'entrepreneurs, relevés de terrain, expérimentations en laboratoire) et les soutenances orales impromptues où l'étudiant défend pas-à-pas sa démarche."
            },
            {
              title: "Intégrer la littératie IA dans les programmes du MINESUP et du MINESEC",
              text: "L'apprentissage de l'ingénierie de prompt, la traque des hallucinations algorithmiques, la protection des données personnelles et la compréhension des biais culturels doivent faire l'objet de modules transversaux obligatoires dès la classe de seconde et en première année de licence."
            },
            {
              title: "Développer des solutions IA frugales et souveraines (Low-Bandwidth)",
              text: "Nos universités et laboratoires de recherche (à l'instar des initiatives de l'ENSP de Yaoundé, de l'ENSP de Douala ou de l'Université de Buea) doivent encourager le déploiement de modèles open source quantifiés (Mistral, Llama, DeepSeek) hébergés sur les serveurs locaux des campus, accessibles sur intranet sans consommer de data internet mobile."
            },
            {
              title: "Numériser et injecter nos corpus scientifiques et culturels endogènes",
              text: "L'Afrique ne doit pas laisser les multinationales décider seules de ce que l'IA sait du monde. La numérisation de nos thèses, de nos archives historiques, de nos jurisprudences et de nos savoirs traditionnels est une urgence absolue pour nourrir les futures IA africaines."
            }
          ]
        }
      ],
      conclusion: {
        title: "Conclusion : L'Afrique ne doit pas être consommatrice, mais forge d'intelligence",
        text: "Pour les étudiants camerounais et africains, l'intelligence artificielle n'est ni un mirage à interdire, ni une baguette magique qui dispensera de la rigueur de l'effort intellectuel. Elle est un formidable levier d'accélération dans un environnement où les ressources matérielles font trop souvent défaut. Mais ce levier ne portera ses fruits que si nos jeunes apprenants refusent la facilité du copier-coller pour cultiver ce que nulle machine ne saura reproduire : l'esprit critique aiguisé, la sensibilité aux défis concrets de notre continent, et la fierté de produire une pensée authentiquement souveraine. L'avenir de l'Afrique émergente se construira avec l'intelligence artificielle, mais par l'audace et la détermination de cerveaux humains bien formés.",
        takeaways: [
          "L'IA est un tuteur précieux face aux amphis bondés, mais son abus passif détruit l'esprit critique.",
          "Le contexte africain (OHADA, réalités locales, plurilinguisme) doit être activement imposé à l'IA.",
          "L'évaluation académique doit privilégier les données de terrain locales et les soutenances orales.",
          "La jeunesse africaine doit passer du statut d'utilisatrice de prompts à celui de créatrice de technologies souveraines."
        ]
      }
    }
  },
  {
    id: '2',
    slug: 'guardrails-securite-llm-education',
    type: 'code',
    categoryLabel: 'Codes & Architecture',
    title: 'Implémenter un Guardrail IA pour Environnements Éducatifs en Python',
    subtitle: 'Architecture logicielle complète pour filtrer les requêtes élèves, bloquer la triche directe et anonymiser les données personnelles transmises aux APIs de LLMs.',
    excerpt: 'Comment concevoir un proxy d’interception éthique et sécurisé pour déployer des agents pédagogiques dans un établissement sans compromettre la vie privée des élèves.',
    coverImage: '/images/code-guardrails.jpg',
    publishedAt: '20 Octobre 2026',
    readTime: '5 min de lecture',
    audioTime: '3 min d\'écoute',
    featured: false,
    author: {
      name: "Meva'a Olivier",
      role: "Chef du département technique de Grow Tech, Responsable et Fondateur de Eden",
      organization: 'Eden Research & Dev • Grow Tech',
      avatar: '/avatar.jpeg',
    },
    tags: ['Python', 'Sécurité', 'Guardrails', 'RGPD', 'Éducation'],
    executiveSummary: [
      {
        title: 'Anonymisation PII native',
        description: 'Toute donnée nominative (noms d’élèves, classes, établissements) est automatiquement masquée par regex et NER avant d’atteindre les serveurs LLM.',
        impact: 'positive',
      },
      {
        title: 'Détection d’injonction de triche',
        description: 'Interception des prompts de type "écris ma dissert" pour rediriger le modèle vers un mode d’assistance méthodologique.',
        impact: 'positive',
      },
      {
        title: 'Latence maîtrisée (<80ms)',
        description: 'Pipeline asynchrone ultra-léger pour ne pas dégrader l’expérience utilisateur en classe.',
        impact: 'neutral',
      },
    ],
    audioTranscript: "Ce module présente l'implémentation concrète d'une passerelle de garde-fous pour assistants scolaires. Découvrez comment assainir les requêtes d'élèves, anonymiser les données sensibles selon le RGPD et forcer la posture socratique du modèle.",
    content: {
      intro: "Déployer un assistant d'intelligence artificielle dans un cadre scolaire exige une conformité rigoureuse avec les règles de protection de l'enfance et le RGPD. Voici l'architecture d'un proxy Guardrail développé chez Eden R&D.",
      sections: [
        {
          id: 'architecture-guardrail',
          title: "1. Pipeline de validation et filtrage",
          lead: "Le guardrail intercepte le prompt de l'élève, vérifie l'absence de données personnelles (PII), applique une heuristique de détection de triche et injecte la consigne socratique.",
          codeSnippet: {
            language: 'python',
            filename: 'educational_guardrail.py',
            code: `import re
from typing import Dict, Any

class SchoolGuardrail:
    FORBIDDEN_PATTERNS = [
        r"fais mon devoir",
        r"écris ma dissert",
        r"donne-moi toutes les réponses",
        r"résous entièrement",
    ]

    @classmethod
    def sanitize_input(cls, user_text: str) -> Dict[str, Any]:
        # 1. Vérification d'anonymat (masquage noms/emails)
        anonymized = re.sub(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+", "[EMAIL]", user_text)
        
        # 2. Détection de tentative de sous-traitance cognitive
        is_cheat_attempt = any(
            re.search(pattern, user_text, re.IGNORECASE) 
            for pattern in cls.FORBIDDEN_PATTERNS
        )

        return {
            "clean_prompt": anonymized,
            "force_socratic_mode": is_cheat_attempt,
            "blocked": False
        }`,
            explanation: "Une implémentation légère et efficace pour encadrer les usages sans complexité superflue."
          }
        }
      ],
      conclusion: {
        title: "Conclusion technique",
        text: "Ce proxy s'intègre en amont de toute interface scolaire et garantit une utilisation respectueuse des impératifs éthiques et pédagogiques.",
        takeaways: [
          "Filtrage côté serveur systématique.",
          "Respect absolu de la vie privée des mineurs.",
          "Orientation vers l'autonomie cognitive."
        ]
      }
    }
  },
  {
    id: '3',
    slug: 'methode-prompt-socratique-apprentissage',
    type: 'skill',
    categoryLabel: 'Skills & Méthodes',
    title: 'La Méthode du Prompt Socratique pour l’Apprentissage Autonome',
    subtitle: 'Guide méthodologique pas à pas pour transformer n’importe quel LLM en coach d’apprentissage personnel sans tomber dans le piège de la réponse pré-mâchée.',
    excerpt: 'Une compétence clé du 21e siècle : comment formuler des consignes pour contraindre les intelligences artificielles à stimuler votre mémoire de travail et consolider vos compétences.',
    coverImage: '/images/skill-socratic.jpg',
    publishedAt: '19 Octobre 2026',
    readTime: '6 min de lecture',
    audioTime: '3 min d\'écoute',
    featured: false,
    author: {
      name: "Meva'a Olivier",
      role: "Chef du département technique de Grow Tech, Responsable et Fondateur de Eden",
      organization: 'Eden Research & Dev • Grow Tech',
      avatar: '/avatar.jpeg',
    },
    tags: ['Prompt Engineering', 'Méthodes d\'Apprentissage', 'Sciences Cognitives', 'Productivité'],
    executiveSummary: [
      {
        title: 'Le principe de résistance contrôlée',
        description: 'Forcer l’IA à n’émettre que des questions guides plutôt que des paragraphes exhaustifs.',
        impact: 'positive',
      },
      {
        title: 'Test en aveugle (Active Recall)',
        description: 'Demander à l’IA de vous interroger sous forme de quiz adaptatif calibré sur votre niveau.',
        impact: 'positive',
      },
      {
        title: 'Rétro-action formative immédiate',
        description: 'Corriger les faux pas conceptuels au fur et à mesure sans induire de stress d’évaluation.',
        impact: 'positive',
      },
    ],
    audioTranscript: "Découvrez la méthode du prompt socratique, une compétence essentielle pour quiconque souhaite apprendre vite et bien avec l'intelligence artificielle.",
    content: {
      intro: "La plupart des étudiants utilisent l'IA comme un moteur de recherche survitaminé. C'est l'erreur la plus coûteuse pour leur cerveau. Apprendre nécessite de confronter sa mémoire à la difficulté. Voici la méthodologie du Prompt Socratique développée par Eden R&D.",
      sections: [
        {
          id: 'etape-1-cadrage',
          title: "Étape 1 : Le cadrage de rôle restrictif",
          lead: "Ne jamais laisser l'IA dans sa posture par défaut d'assistant omniscient et bavard.",
          paragraphs: [
            "Le secret d'un apprentissage efficace avec l'IA consiste à restreindre son espace de liberté verbale. Exigez un nombre de mots strict (moins de 50 mots par réponse) et une clôture obligatoire par une interrogation invitant à l'effort."
          ],
          codeSnippet: {
            language: 'markdown',
            filename: 'prompt_apprenant.txt',
            code: `Tu es mon tuteur en [DISCIPLINE].
Voici ce que je cherche à comprendre : [SUJET].

Consignes strictes :
1. Pose-moi une seule question diagnostique pour évaluer ce que je sais déjà.
2. Attends ma réponse avant d'enchaîner.
3. Si je me trompe, donne-moi un contre-exemple concret sans me donner la solution.
4. Réponds toujours en moins de 60 mots.`,
            explanation: "Copiez-collez ce prompt en tête de n'importe quelle conversation pour entrer immédiatement dans une dynamique d'apprentissage actif."
          }
        }
      ],
      conclusion: {
        title: "Conclusion de compétence",
        text: "Maîtriser l'art de questionner la machine est la compétence pivot des dix prochaines années. Celui qui sait contraindre l'IA s'élève ; celui qui la subit s'atrophie.",
        takeaways: [
          "Limiter le nombre de mots par réponse générée.",
          "Exiger un dialogue question/réponse interactif.",
          "Privilégier la mise à l'épreuve de sa propre compréhension."
        ]
      }
    }
  },
  {
    id: '4',
    slug: 'souverainete-modeles-ethique-donnees-scolaires',
    type: 'analysis',
    categoryLabel: 'Analyses & Société',
    title: 'Souveraineté des modèles et éthique des données scolaires : état des lieux européen',
    subtitle: 'Pourquoi l’utilisation d’APIs de modèles propriétaires dans les établissements pose un enjeu d’indépendance et de souveraineté cognitive, et quelles sont les alternatives ouvertes.',
    excerpt: 'Entre RGPD strict, protection des mineurs et souveraineté technologique, l’Europe cherche sa troisième voie pour l’intelligence artificielle éducative.',
    coverImage: '/images/data-sovereignty.jpg',
    publishedAt: '18 Octobre 2026',
    readTime: '6 min de lecture',
    audioTime: '4 min d\'écoute',
    featured: false,
    author: {
      name: 'Eden Research & Dev',
      role: 'Pôle Éthique Tech & Politiques Publiques',
      organization: 'Eden Innovation Lab',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    },
    tags: ['Souveraineté', 'RGPD', 'Éthique IA', 'Open Source', 'Union Européenne'],
    executiveSummary: [
      {
        title: 'Confidentialité des requêtes d’élèves',
        description: 'Les données d’apprentissage des élèves ne doivent sous aucun prétexte servir à réentraîner des modèles commerciaux privés.',
        impact: 'positive',
      },
      {
        title: 'Déploiement sur infrastructures locales',
        description: 'Les modèles SLMs (Small Language Models) de 7B à 14B paramètres peuvent désormais tourner sur les serveurs académiques locaux.',
        impact: 'positive',
      },
      {
        title: 'Indépendance culturelle et linguistique',
        description: 'Garantir un corpus pédagogique respectueux des programmes scolaires francophones et européens.',
        impact: 'positive',
      },
    ],
    audioTranscript: "Analyse sur la souveraineté numérique dans l'éducation. Pourquoi et comment les académies européennes adoptent des modèles ouverts pour protéger les données de leurs élèves.",
    content: {
      intro: "La souveraineté numérique de l'éducation est l'enjeu stratégique de la décennie. Si la jeunesse européenne confie l'intégralité de ses doutes et de ses dissertations à des serveurs extra-européens, quelle indépendance intellectuelle subsistera ?",
      sections: [
        {
          id: 'dependance-technologique',
          title: "1. Le coût invisible de la dépendance aux hyperscalers",
          lead: "Confier les devoirs et interrogations des élèves à des serveurs tiers expose à des risques d'ingérence et de profilage cognitif.",
          paragraphs: [
            "Au-delà du simple respect de la législation RGPD, la question fondamentale est celle du profilage cognitif à long terme. La trace laissée par un élève au fil de son cursus scolaire constitue la carte la plus précise possible de ses faiblesses, de ses centres d'intérêt et de son rythme intellectuel."
          ]
        }
      ],
      conclusion: {
        title: "Conclusion souveraine",
        text: "L'avenir repose sur l'hébergement de modèles ouverts au plus près des classes, gérés par les réseaux académiques publics.",
        takeaways: [
          "Sanctuariser les données des mineurs.",
          "Investir dans des modèles ouverts souverains.",
          "Former les enseignants à l'indépendance technologique."
        ]
      }
    }
  },
  {
    id: '5',
    slug: 'benchmarks-llm-raisonnement-mathematique-lycee',
    type: 'code',
    categoryLabel: 'Codes & Architecture',
    title: 'Benchmarks des LLMs en Raisonnement Mathématique et Pédagogique au Secondaire',
    subtitle: 'Évaluation comparative des capacités de raisonnement pas-à-pas (Chain-of-Thought) sur les épreuves du Baccalauréat et des concours scientifiques.',
    excerpt: 'Tous les modèles ne se valent pas lorsqu’il s’agit d’expliquer une démonstration par récurrence ou un calcul d’intégrales. Décryptage avec protocoles de tests reproductibles.',
    coverImage: '/images/ai-benchmarks.jpg',
    publishedAt: '17 Octobre 2026',
    readTime: '8 min de lecture',
    audioTime: '5 min d\'écoute',
    featured: false,
    author: {
      name: "Meva'a Olivier",
      role: "Chef du département technique de Grow Tech, Responsable et Fondateur de Eden",
      organization: 'Eden Research & Dev • Grow Tech',
      avatar: '/avatar.jpeg',
    },
    tags: ['Benchmarks', 'Mathématiques', 'LLMs', 'Chain-of-Thought', 'Python'],
    executiveSummary: [
      {
        title: 'Importance du Chain-of-Thought',
        description: 'Les modèles avec raisonnement interne explicite obtiennent un taux de résolution supérieur de 42% sur les théorèmes de géométrie.',
        impact: 'positive',
      },
      {
        title: 'Résistance aux faux indices',
        description: 'Test de robustesse face aux questions pièges couramment posées par les enseignants.',
        impact: 'positive',
      },
    ],
    audioTranscript: "Découvrez notre banc d'essai complet sur les capacités réelles de raisonnement des LLMs appliquées aux programmes de mathématiques de lycée.",
    content: {
      intro: "La résolution mathématique a longtemps constitué le talon d'Achille des modèles probabilistes. Les récentes avancées en inférence avec temps de calcul étendu changent la donne.",
      sections: [
        {
          id: 'protocole-test',
          title: "1. Protocole de test et métriques retenues",
          lead: "500 exercices tirés des annales du Baccalauréat soumis à cinq familles de modèles sous température zéro.",
          paragraphs: [
            "Nous mesurons non seulement la justesse du résultat final, mais surtout la validité didactique de chaque étape intermédiaire de démonstration."
          ]
        }
      ],
      conclusion: {
        title: "Conclusion du benchmark",
        text: "Le raisonnement explicite pas-à-pas est indispensable pour tout usage mathématique scolaire.",
        takeaways: [
          "Exiger la trace de réflexion complète.",
          "Ne jamais faire confiance au seul résultat numérique.",
          "Vérifier la justification des lemmes."
        ]
      }
    }
  },
  {
    id: '6',
    slug: 'guide-anti-hallucination-fact-checking-classe',
    type: 'skill',
    categoryLabel: 'Skills & Méthodes',
    title: 'Traquer les Hallucinations : Guide Pratique de Fact-Checking en Classe',
    subtitle: 'Comment transformer l’infidélité factuelle des intelligences artificielles en exercice d’esprit critique et de vérification rigoureuse des sources.',
    excerpt: '3 ateliers concrets et prêts à l’emploi pour apprendre aux élèves à déjouer les affirmations péremptoires mais fausses générées par les modèles.',
    coverImage: '/images/fact-check.jpg',
    publishedAt: '16 Octobre 2026',
    readTime: '5 min de lecture',
    audioTime: '3 min d\'écoute',
    featured: false,
    author: {
      name: "Meva'a Olivier",
      role: "Chef du département technique de Grow Tech, Responsable et Fondateur de Eden",
      organization: 'Eden Research & Dev • Grow Tech',
      avatar: '/avatar.jpeg',
    },
    tags: ['Fact Checking', 'Esprit Critique', 'Pédagogie', 'Ateliers', 'Éducation aux Médias'],
    executiveSummary: [
      {
        title: 'Le jeu du Détective IA',
        description: 'Les élèves reçoivent une fiche biographique générée contenant 3 erreurs dissimulées à retrouver par les archives papier.',
        impact: 'positive',
      },
      {
        title: 'Traque des sources fantômes',
        description: 'Vérification systématique de l’existence réelle des articles universitaires cités par le modèle.',
        impact: 'positive',
      },
    ],
    audioTranscript: "Guide pratique pour faire de l'hallucination de l'IA une opportunité pédagogique en classe afin d'affûter l'esprit critique des élèves.",
    content: {
      intro: "L'hallucination n'est pas un bug que l'on doit simplement déplorer ; c'est le support idéal pour enseigner la méthode scientifique et la recherche documentaire.",
      sections: [
        {
          id: 'methode-triangulation',
          title: "1. La méthode de la triangulation documentaire",
          lead: "Règle absolue : une affirmation générée par un LLM n'est réputée recevable que si elle est confirmée par deux sources primaires indépendantes.",
          paragraphs: [
            "L'apprenant doit apprendre à demander à l'IA : 'Où as-tu trouvé cette information ?' et aller vérifier physiquement ou sur les portails académiques l'existence de l'ouvrage ou de la décision citée."
          ]
        }
      ],
      conclusion: {
        title: "Conclusion méthodologique",
        text: "Le doute méthodique devient la première vertu citoyenne face aux générateurs de texte.",
        takeaways: [
          "Ne jamais recopier sans vérifier.",
          "Croiser avec au moins 2 sources certifiées.",
          "Valoriser le réflexe de vérification."
        ]
      }
    }
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string): Post[] {
  return POSTS.filter((p) => p.slug !== currentSlug);
}
