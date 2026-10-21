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
    title: "L'Intelligence Artificielle en milieu scolaire : catalyseur d'apprentissage ou péril cognitif ?",
    subtitle: "Une analyse systémique des impacts de l'intégration des LLMs dans les collèges, lycées et universités : opportunités d'individualisation, risques d'atrophie intellectuelle, fractures éthiques et pistes concrètes pour le corps enseignant.",
    excerpt: "Entre fascination technologique et crainte du plagiat de masse, comment l'intelligence artificielle générative redéfinit-elle les fondements de la transmission du savoir ? Analyse prospective et pédagogique.",
    coverImage: '/images/ai-education.jpg',
    publishedAt: '21 Octobre 2026',
    readTime: '7 min de lecture',
    audioTime: '4 min d\'écoute',
    featured: true,
    author: {
      name: 'Eden Research & Dev',
      role: 'Pôle Recherche en Technologies Émergentes',
      organization: 'Eden Innovation Lab',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    },
    tags: ['Intelligence Artificielle', 'Éducation', 'Pédagogie', 'Sciences Cognitives', 'Éthique Tech'],
    executiveSummary: [
      {
        title: 'Tutorat universel vs Dépérissement de l’effort mental',
        description: 'L’IA offre un soutien individualisé 24h/24 capable de débloquer les élèves en difficulté, mais son utilisation passive court-circuite la phase indispensable de friction cognitive nécessaire à la mémorisation durable.',
        impact: 'neutral',
      },
      {
        title: 'Nouvelles fractures et illusion de compétence',
        description: 'Le risque majeur ne réside pas seulement dans la triche, mais dans la disparité entre élèves capables de guider l’IA de façon critique et ceux qui acceptent docilement des synthèses superficielles ou inexactes.',
        impact: 'negative',
      },
      {
        title: 'Métamorphose de la posture pédagogique',
        description: 'L’enseignant cesse d’être le détenteur exclusif du contenu pour devenir l’arbitre du discernement, réhabilitant l’évaluation orale, la métacognition et le débat contradictoire en classe.',
        impact: 'positive',
      },
    ],
    audioTranscript: "Bienvenue dans cette synthèse Eden Research & Dev. L'introduction massive des intelligences artificielles génératives dans les établissements scolaires marque une rupture historique. Longtemps perçue comme un simple générateur de devoirs à la maison, l'IA soulève désormais des enjeux fondamentaux d'apprentissage. D'un côté, elle offre une personnalisation inédite du parcours de chaque élève, capable de réexpliquer dix fois un théorème sous des métaphores variées. De l'autre, elle menace d'atrophier l'effort de réflexion propre à la construction de la pensée critique. Les enseignants sont appelés à réinventer l'évaluation, en privilégiant la confrontation d'idées, le travail collaboratif en direct et la rétro-ingénierie des réponses générées par les machines.",
    content: {
      intro: "En l'espace de quelques années seulement, l'intelligence artificielle générative s'est immiscée dans les sacs d'école et les amphis universitaires avec une vélocité sans précédent. Là où les calculatrices graphiques et Wikipédia avaient mis des décennies à s'imposer dans les débats ministériels, les grands modèles de langage (LLMs) ont bouleversé le rapport aux devoirs, à la dissertation et à la recherche documentaire en quelques mois. Face à cette déferlante, la tentation initiale du blocage institutionnel a vite cédé la place à une évidence : l'IA ne disparaîtra pas des cartables. Il devient dès lors crucial d'en radiographier les impacts concrets, tant dans leurs promesses d'émancipation que dans leurs périls cognitifs.",
      sections: [
        {
          id: 'contexte-historique',
          title: "1. De la panique du plagiat à l'inévitable intégration",
          lead: "Le milieu éducatif traverse la même phase de mutation que lors de l'apparition de l'imprimerie ou d'Internet : le rejet épidermique précède toujours l'acculturation nécessaire.",
          paragraphs: [
            "Lorsque les premiers générateurs textuels grand public sont arrivés sur le marché, le réflexe quasi-unanime des académies a été l'interdiction défensive. Détecteurs anti-triche, interdictions sur les réseaux scolaires, retour forcé au papier-crayon : les réponses ont cherché à colmater une brèche ouverte dans le modèle séculaire de l'évaluation à distance.",
            "Toutefois, cette posture répressive a rapidement révélé ses limites. D'une part, les détecteurs d'IA souffrent d'un taux inacceptable de faux positifs (pénalisant particulièrement les élèves allophones ou au style très académique). D'autre part, interdire l'outil dans l'enceinte de l'école n'empêche nullement son usage à domicile, créant une hypocrisie pédagogique préjudiciable à la formation civique des jeunes générations."
          ],
          callout: {
            type: 'quote',
            text: "Interdire l'IA à l'école revient à interdire la calculatrice dans les cours de statistiques financières : c'est préparer les élèves à un monde qui n'existe plus.",
            author: "Laboratoire Eden R&D — Prospective Éducative"
          }
        },
        {
          id: 'consequences-positives',
          title: "2. Les conséquences positives : le super-pouvoir de l'individualisation",
          lead: "Exploitée avec méthode, l'IA résout l'un des plus vieux dilemmes de l'école républicaine : comment offrir un enseignement individualisé au sein d'une classe de trente élèves ?",
          bullets: [
            {
              title: "La différenciation pédagogique sur-mesure",
              text: "L'IA excelle à reformuler un concept abstrait selon les centres d'intérêt de l'élève. Qu'il s'agisse d'expliquer les intégrales mathématiques à travers des analogies de jeux vidéo ou de vulgariser la photosynthèse par le sport, le modèle s'adapte au profil cognitif sans jamais manifester d'impatience."
            },
            {
              title: "L'inclusion des élèves à besoins éducatifs particuliers (DYS, TDAH)",
              text: "Pour les élèves dyslexiques ou dysorthographiques, l'IA offre un correcteur contextuel bienveillant, transcrit l'audio en texte structuré, adapte les contrastes et simplifie la complexité syntaxique pour libérer la charge cognitive liée au décodage."
            },
            {
              title: "Le déblocage de l'angoisse de la page blanche",
              text: "L'outil n'est plus vu comme un rédacteur délégué, mais comme un sparring-partner créatif. En proposant des plans possibles, des axes de réflexion ou des contre-arguments, il stimule l'amorce de la pensée autonome."
            },
            {
              title: "Le soulagement administratif et créatif de l'enseignant",
              text: "Génération d'exercices d'entraînement aux niveaux variés, création de grilles d'évaluation critériées, synthèse de documents pour enrichir le cours : l'enseignant gagne un temps précieux qu'il peut réinvestir dans le suivi humain et l'écoute active."
            }
          ]
        },
        {
          id: 'consequences-negatives',
          title: "3. Les conséquences négatives : le péril de la paresse cognitive",
          lead: "La facilité d'accès à la réponse immédiate porte en elle le risque sournois de désapprendre à chercher, à douter et à surmonter la frustration intellectuelle.",
          paragraphs: [
            "Le mécanisme fondamental de l'apprentissage repose sur ce que les neurosciences cognitives nomment la 'difficulté désirable' (Robert Bjork) : c'est précisément parce qu'un problème résiste, qu'il demande un effort de concentration et de manipulation mentale, que les connexions synaptiques se consolident durablement.",
            "En fournissant en quelques millisecondes une réponse soignée et grammaticalement irréprochable, l'IA offre une gratification instantanée qui anesthésie la mémoire de travail. L'élève consulte le résultat, comprend l'enchaînement en surface, mais est incapable de reproduire le raisonnement de façon autonome une heure plus tard. Il s'agit d'une dangereuse illusion de compétence."
          ],
          callout: {
            type: 'warning',
            title: 'Le piège des hallucinations et du ton assertif',
            text: "Les modèles de langage écrivent toujours avec un ton péremptoire et séduisant, même lorsqu'ils inventent des faits historiques ou des formules chimiques erronées. Sans esprit critique aiguisé, l'apprenant ingère des contre-vérités emballées dans un français impeccable."
          }
        },
        {
          id: 'tableau-comparatif',
          title: "4. Matrice d'analyse comparative : Bénéfices vs Dérives",
          lead: "Synthèse croisée des impacts observés en milieu scolaire et des leviers de régulation recommandés.",
          table: {
            headers: ["Dimension Pédagogique", "Opportunité / Accélération", "Risque / Dérive Critique", "Levier Pédagogique"],
            rows: [
              [
                "Production d'écrits",
                "Assistance à la syntaxe, suggestions de vocabulaire riche.",
                "Homogénéisation du style, perte de la voix personnelle et de l'authenticité.",
                "Ateliers d'écriture manuscrite en classe & défense orale des textes."
              ],
              [
                "Résolution de problèmes",
                "Aide au découpage logique des étapes de résolution.",
                "Copier-coller passif de la solution sans compréhension des mécanismes.",
                "Mode Socratique imposé : l'IA ne donne jamais la solution, uniquement des indices."
              ],
              [
                "Recherche documentaire",
                "Synthèse rapide de bibliographies et croisement de concepts.",
                "Hallucinations de sources, disparition du réflexe de vérification primaire.",
                "Exercices de 'Fact-Checking' : traquer les erreurs glissées par l'IA."
              ],
              [
                "Équité sociale",
                "Démocratisation d'un tuteur particulier jadis réservé aux familles aisées.",
                "Fracture entre versions gratuites basiques et modèles payants avancés.",
                "Mise à disposition par l'État de modèles souverains et sécurisés pour tous."
              ]
            ]
          }
        },
        {
          id: 'boite-a-outils-prompt',
          title: "5. Boîte à outils : le Prompt Socratique pour les élèves",
          lead: "Pour transformer l'IA d'un moteur de triche en un tuteur exigeant, voici le prompt système recommandé à intégrer dans les applications scolaires ou à fournir aux étudiants.",
          paragraphs: [
            "Plutôt que de laisser l'élève demander 'Fais ma dissertation sur la liberté chez Rousseau', nous avons conçu et validé en conditions réelles une consigne système socratique qui contraint le modèle à refuser de rédiger à la place de l'élève, et l'oblige à questionner ses intuitions."
          ],
          codeSnippet: {
            language: 'markdown',
            filename: 'tuteur_socratique_prompt.md',
            code: `# INSTRUCTIONS SYSTÈME : TUTEUR SOCRATIQUE INTERACTIF

Tu agis en tant que précepteur socratique bienveillant mais intellectuellement exigeant.
Ton objectif absolu : GUIDER L'ÉLÈVE SANS JAMAIS FAIRE LE TRAVAIL À SA PLACE.

## RÈGLES D'ENGAGEMENT :
1. RÈGLE D'OR : Ne fournis JAMAIS la réponse finale, le plan rédigé ou le paragraphe clé d'un devoir.
2. Si l'élève te demande d'écrire un texte ou de résoudre un exercice :
   - Refuse poliment mais fermement.
   - Demande-lui : "Quelle est la première intuition ou idée qui te vient à l'esprit ?"
3. Découpe chaque difficulté en sous-questions ciblées qui incitent à la réflexion.
4. Encourage les erreurs productives : analyse pourquoi un raisonnement est faux plutôt que de corriger brutalement.
5. Félicite la ténacité et l'effort d'argumentation plutôt que la rapidité de réponse.

Format de chaque réponse :
- 1 phrase d'encouragement ou d'accusé de réception.
- 1 indice subtil ou contre-exemple stimulant.
- 1 question ouverte précise nécessitant une réponse de l'élève.`,
            explanation: "Ce template transforme le chatbot en un entraîneur dialectique qui stimule la réflexion au lieu de la neutraliser."
          }
        },
        {
          id: 'recommandations-strategiques',
          title: "6. Recommandations concrètes pour les établissements scolaires",
          lead: "Face à cette réalité, quelle feuille de route adopter pour les équipes pédagogiques et les directions ?",
          bullets: [
            {
              title: "Déplacer le centre de gravité de l'évaluation",
              text: "L'évaluation du 'produit fini' (le devoir maison rendu sur tableur ou feuille libre) a perdu sa valeur de mesure des acquis. L'école doit valoriser le 'processus' : brouillons commentés, soutenances orales impromptues, explication des choix argumentatifs."
            },
            {
              title: "Créer des cours obligatoires d'hygiène et de littératie numérique",
              text: "Comprendre ce qu'est un token, un biais probabiliste, une empreinte carbone de calcul et un droit d'auteur doit faire partie du socle commun des compétences citoyennes dès la classe de 5e."
            },
            {
              title: "Instaurer des défis de rétro-ingénierie",
              text: "Donner aux élèves une dissertation entièrement générée par une IA contenant volontairement trois erreurs logiques et historiques subtiles, et leur attribuer des points sur leur capacité à les détecter et les corriger avec des sources certifiées."
            }
          ]
        }
      ],
      conclusion: {
        title: "Conclusion : L'IA ne remplace pas l'effort, elle le déplace",
        text: "L'intelligence artificielle en milieu scolaire n'est ni le fossoyeur annoncé de l'instruction publique, ni la panacée miraculeuse qui effacera d'un coup de baguette magique les difficultés d'apprentissage. Elle agit avant tout comme un amplificateur impitoyable : entre les mains d'un élève curieux et guidé, elle devient une passerelle prodigieuse vers le savoir universel ; abandonnée sans cadre à un apprenant démotivé, elle se transforme en béquille aliénante qui anesthésie sa capacité de penser par lui-même. L'avenir de l'école ne se jouera donc pas dans les serveurs des géants technologiques, mais dans la relation humaine irremplaçable qui unit le maître et son disciple.",
        takeaways: [
          "L'interdiction est vouée à l'échec ; seule l'acculturation critique forge des esprits libres.",
          "Le Prompt Socratique doit remplacer la simple consommation de réponses brutes.",
          "L'évaluation scolaire doit se recentrer sur l'oralité, la démarche et la métacognition.",
          "L'humain reste au centre : la bienveillance, l'empathie et l'exigence de l'enseignant sont inimitables."
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
      name: 'Eden Research & Dev',
      role: 'Ingénierie Logicielle & Systèmes IA',
      organization: 'Eden Innovation Lab',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
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
      name: 'Eden Research & Dev',
      role: 'Pédagogie & Méthodologies Cognitives',
      organization: 'Eden Innovation Lab',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
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
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string): Post[] {
  return POSTS.filter((p) => p.slug !== currentSlug);
}
