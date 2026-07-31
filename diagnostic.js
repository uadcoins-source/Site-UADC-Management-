'use strict';

/*
  ==========================================================
  UADC MANAGEMENT — QUESTIONNAIRE INTELLIGENT V3.1
  GUIDE PERSONNALISÉ
  ==========================================================

  Parcours officiel :

  - Score faible : 0 à 39
    → Guide personnalisé gratuit
    → Envoi par e-mail
    → WhatsApp
    → CRM via n8n

  - Score moyen : 40 à 69
    → Audit offert de 15 minutes
    → Calendly
    → CRM via n8n

  - Score élevé : 70 à 100
    → Rendez-vous prioritaire
    → Calendly
    → CRM via n8n

  À renseigner plus tard :

  1. WHATSAPP_NUMBER
  2. N8N_WEBHOOK_URL
*/

const CONFIG = {
  WHATSAPP_NUMBER: '',

  CALENDLY_AUDIT_URL:
    'https://calendly.com/support-uadc/diagnostic-gratuit',

  CALENDLY_PRIORITY_URL:
    'https://calendly.com/support-uadc/diagnostic-gratuit',

  N8N_WEBHOOK_URL: 'https://automate-uadc.app.n8n.cloud/webhook/uadc-diagnostic'
};

/*
  ==========================================================
  QUESTIONS DU DIAGNOSTIC
  ==========================================================
*/

const questions = [
  {
    id: 'q1',

    title:
      'Combien de personnes travaillent dans votre entreprise ?',

    help:
      'Sélectionnez la situation qui correspond le mieux à votre structure.',

    answers: [
      {
        label: 'Je travaille seul',
        points: 0
      },
      {
        label: '2 à 5 personnes',
        points: 4
      },
      {
        label: '6 à 20 personnes',
        points: 7
      },
      {
        label: 'Plus de 20 personnes',
        points: 10
      }
    ]
  },

  {
    id: 'q2',

    title:
      'Où sont stockés vos documents administratifs ?',

    help:
      'Devis, factures, contrats, reçus et dossiers clients.',

    answers: [
      {
        label: 'Un peu partout',
        points: 10
      },
      {
        label: 'Sur plusieurs ordinateurs ou téléphones',
        points: 8
      },
      {
        label: 'Dans quelques dossiers organisés',
        points: 4
      },
      {
        label: 'Tout est centralisé et facilement accessible',
        points: 0
      }
    ]
  },

  {
    id: 'q3',

    title:
      'Suivez-vous facilement vos factures clients ?',

    help:
      'Pensez au statut des factures, aux échéances et aux paiements reçus.',

    answers: [
      {
        label: 'Non',
        points: 10
      },
      {
        label: 'Difficilement',
        points: 8
      },
      {
        label: 'Plutôt oui',
        points: 4
      },
      {
        label: 'Oui, parfaitement',
        points: 0
      }
    ]
  },

  {
    id: 'q4',

    title:
      'Les paiements en attente sont-ils suivis régulièrement ?',

    help:
      'Sélectionnez la fréquence qui correspond à votre fonctionnement actuel.',

    answers: [
      {
        label: 'Non',
        points: 10
      },
      {
        label: 'Parfois',
        points: 6
      },
      {
        label: 'Souvent',
        points: 3
      },
      {
        label: 'Toujours',
        points: 0
      }
    ]
  },

  {
    id: 'q5',

    title:
      'Combien de temps perdez-vous chaque semaine à rechercher des documents ?',

    help:
      'Estimez le temps cumulé pour vous et votre équipe.',

    answers: [
      {
        label: 'Plus de 5 heures',
        points: 10
      },
      {
        label: 'Entre 2 et 5 heures',
        points: 7
      },
      {
        label: 'Entre 30 minutes et 2 heures',
        points: 3
      },
      {
        label: 'Presque jamais',
        points: 0
      }
    ]
  },

  {
    id: 'q6',

    title:
      'Utilisez-vous un tableau de bord pour piloter votre activité ?',

    help:
      'Par exemple : factures, paiements, relances, priorités ou indicateurs.',

    answers: [
      {
        label: 'Je n’ai aucun tableau de bord',
        points: 10
      },
      {
        label: 'J’utilise quelques tableaux Excel ou Google Sheets',
        points: 6
      },
      {
        label: 'Oui, mais il est incomplet',
        points: 3
      },
      {
        label: 'Oui, il est clair et régulièrement actualisé',
        points: 0
      }
    ]
  },

  {
    id: 'q7',

    title:
      'Comment effectuez-vous les relances clients ?',

    help:
      'Pensez aux factures impayées et aux échéances dépassées.',

    answers: [
      {
        label: 'Je ne fais pas de relances régulières',
        points: 10
      },
      {
        label: 'Je relance quand j’y pense',
        points: 7
      },
      {
        label: 'J’utilise un calendrier ou des rappels',
        points: 3
      },
      {
        label: 'Nous avons un processus de relance organisé',
        points: 0
      }
    ]
  },

  {
    id: 'q8',

    title:
      'Vos collaborateurs retrouvent-ils rapidement les documents nécessaires ?',

    help:
      'Répondez selon le fonctionnement réel de votre équipe.',

    answers: [
      {
        label: 'Non',
        points: 10
      },
      {
        label: 'Pas toujours',
        points: 6
      },
      {
        label: 'Souvent',
        points: 3
      },
      {
        label: 'Toujours',
        points: 0
      }
    ]
  },

  {
    id: 'q9',

    title:
      'Quels outils utilisez-vous principalement aujourd’hui ?',

    help:
      'Choisissez le niveau qui correspond le mieux à votre organisation.',

    answers: [
      {
        label: 'Aucun outil particulier',
        points: 10
      },
      {
        label: 'Principalement WhatsApp',
        points: 7
      },
      {
        label: 'Excel ou Google Sheets',
        points: 4
      },
      {
        label: 'Des outils structurés et bien organisés',
        points: 0
      }
    ]
  },

  {
    id: 'q10',

    title:
      'Quelle est votre priorité aujourd’hui ?',

    help:
      'Choisissez votre besoin principal.',

    answers: [
      {
        label: 'Mieux organiser l’entreprise',
        points: 10
      },
      {
        label: 'Gagner du temps',
        points: 8
      },
      {
        label: 'Mieux suivre les paiements',
        points: 6
      },
      {
        label: 'Digitaliser progressivement',
        points: 4
      }
    ]
  }
];

/*
  ==========================================================
  BIBLIOTHÈQUE OFFICIELLE DES RECOMMANDATIONS
  ==========================================================

  Règles obligatoires :

  - Les recommandations proviennent uniquement de cette
    bibliothèque.

  - L’IA pourra reformuler les textes.

  - L’IA ne pourra pas :
    • inventer une recommandation ;
    • ajouter un conseil juridique ;
    • ajouter un conseil fiscal ;
    • ajouter un conseil comptable ;
    • ajouter un conseil financier ;
    • promettre un résultat.
*/

const RECOMMENDATION_LIBRARY = {
  documentCentralization: {
    id: 'document-centralization',

    questionId: 'q2',

    minimumPoints: 6,

    title:
      'Centraliser les documents administratifs',

    category:
      'Organisation documentaire',

    observation:
      'Les documents administratifs semblent être répartis entre plusieurs emplacements, appareils ou supports.',

    objective:
      'Créer un espace unique, clair et facilement accessible pour retrouver les documents importants.',

    immediateAction: {
      period:
        'Cette semaine',

      title:
        'Regrouper les documents essentiels',

      description:
        'Rassemblez dans un emplacement principal les devis, factures, contrats, reçus et dossiers clients actuellement dispersés.'
    },

    fifteenDayAction: {
      period:
        'Sous quinze jours',

      title:
        'Créer une arborescence de classement',

      description:
        'Classez les documents par catégorie, par année et, lorsque cela est utile, par client ou par fournisseur.'
    },

    thirtyDayAction: {
      period:
        'Sous trente jours',

      title:
        'Définir une règle de rangement',

      description:
        'Décidez qui classe les documents, à quel moment et selon quelle méthode afin de conserver une organisation régulière.'
    },

    fixedGuideSection:
      'Méthodes de classement des documents'
  },

  invoiceTracking: {
    id:
      'invoice-tracking',

    questionId:
      'q3',

    minimumPoints:
      6,

    title:
      'Structurer le suivi des factures clients',

    category:
      'Facturation',

    observation:
      'Le statut des factures, les échéances ou les règlements reçus ne semblent pas toujours être visibles immédiatement.',

    objective:
      'Connaître rapidement les factures émises, payées, en attente ou en retard.',

    immediateAction: {
      period:
        'Cette semaine',

      title:
        'Recenser les factures en cours',

      description:
        'Listez les factures récemment émises et indiquez pour chacune le client, le montant, la date d’émission, l’échéance et le statut.'
    },

    fifteenDayAction: {
      period:
        'Sous quinze jours',

      title:
        'Créer un tableau de suivi',

      description:
        'Mettez en place un tableau simple sur Excel ou Google Sheets afin de centraliser les factures et leurs échéances.'
    },

    thirtyDayAction: {
      period:
        'Sous trente jours',

      title:
        'Mettre en place une vérification régulière',

      description:
        'Prévoyez un moment fixe chaque semaine pour contrôler les nouvelles factures, les paiements reçus et les retards.'
    },

    fixedGuideSection:
      'Suivi des devis et des factures'
  },

  paymentMonitoring: {
    id:
      'payment-monitoring',

    questionId:
      'q4',

    minimumPoints:
      6,

    title:
      'Améliorer le suivi des paiements en attente',

    category:
      'Encaissements',

    observation:
      'Les paiements en attente ne semblent pas faire l’objet d’un contrôle suffisamment régulier.',

    objective:
      'Identifier rapidement les montants à recevoir et limiter les oublis de suivi.',

    immediateAction: {
      period:
        'Cette semaine',

      title:
        'Identifier les paiements en attente',

      description:
        'Dressez la liste des factures échues ou prochainement exigibles et vérifiez les règlements déjà reçus.'
    },

    fifteenDayAction: {
      period:
        'Sous quinze jours',

      title:
        'Classer les paiements par priorité',

      description:
        'Classez les factures selon leur date d’échéance, leur niveau de retard et leur montant afin de traiter les situations prioritaires.'
    },

    thirtyDayAction: {
      period:
        'Sous trente jours',

      title:
        'Créer une routine de contrôle',

      description:
        'Planifiez un contrôle régulier des encaissements et mettez à jour le statut de chaque facture après réception d’un paiement.'
    },

    fixedGuideSection:
      'Gestion des paiements et des impayés'
  },

  documentSearchReduction: {
    id:
      'document-search-reduction',

    questionId:
      'q5',

    minimumPoints:
      6,

    title:
      'Réduire le temps consacré à la recherche de documents',

    category:
      'Productivité administrative',

    observation:
      'La recherche de documents semble mobiliser plusieurs heures ou créer des interruptions fréquentes.',

    objective:
      'Réduire le temps perdu et permettre un accès plus rapide aux informations utiles.',

    immediateAction: {
      period:
        'Cette semaine',

      title:
        'Identifier les documents les plus difficiles à retrouver',

      description:
        'Notez les catégories de documents qui provoquent le plus souvent des recherches longues ou répétées.'
    },

    fifteenDayAction: {
      period:
        'Sous quinze jours',

      title:
        'Uniformiser les noms des fichiers',

      description:
        'Adoptez une méthode de nommage commune comprenant, lorsque cela est pertinent, la date, le client et le type de document.'
    },

    thirtyDayAction: {
      period:
        'Sous trente jours',

      title:
        'Mesurer le temps gagné',

      description:
        'Vérifiez si la nouvelle organisation réduit effectivement le temps consacré à retrouver les informations.'
    },

    fixedGuideSection:
      'Méthodes de classement des documents'
  },

    dashboardCreation: {
    id:
      'dashboard-creation',

    questionId:
      'q6',

    minimumPoints:
      6,

    title:
      'Mettre en place un tableau de bord simple',

    category:
      'Pilotage de l’activité',

    observation:
      'L’entreprise ne dispose pas encore d’une vue suffisamment claire et actualisée de ses informations administratives essentielles.',

    objective:
      'Suivre quelques indicateurs utiles sans complexifier l’organisation de l’entreprise.',

    immediateAction: {
      period:
        'Cette semaine',

      title:
        'Choisir les indicateurs essentiels',

      description:
        'Sélectionnez quelques informations réellement utiles, comme les factures émises, les paiements reçus, les retards et les actions à effectuer.'
    },

    fifteenDayAction: {
      period:
        'Sous quinze jours',

      title:
        'Créer le premier tableau de bord',

      description:
        'Rassemblez les indicateurs sélectionnés dans un tableau simple sur Excel ou Google Sheets.'
    },

    thirtyDayAction: {
      period:
        'Sous trente jours',

      title:
        'Organiser sa mise à jour',

      description:
        'Définissez une fréquence de mise à jour et désignez la personne responsable lorsque plusieurs collaborateurs interviennent.'
    },

    fixedGuideSection:
      'Tableaux de bord simples'
  },

  customerReminderProcess: {
    id:
      'customer-reminder-process',

    questionId:
      'q7',

    minimumPoints:
      6,

    title:
      'Organiser les relances clients',

    category:
      'Relances et impayés',

    observation:
      'Les relances semblent être effectuées de manière irrégulière ou uniquement lorsqu’un retard est remarqué.',

    objective:
      'Créer une méthode de relance régulière, traçable et adaptée aux échéances.',

    immediateAction: {
      period:
        'Cette semaine',

      title:
        'Lister les relances à effectuer',

      description:
        'Identifiez les clients concernés, les factures correspondantes, les montants et les dates d’échéance.'
    },

    fifteenDayAction: {
      period:
        'Sous quinze jours',

      title:
        'Préparer des modèles de messages',

      description:
        'Rédigez plusieurs modèles simples correspondant à un rappel avant échéance, un premier retard et une relance complémentaire.'
    },

    thirtyDayAction: {
      period:
        'Sous trente jours',

      title:
        'Créer un calendrier de relances',

      description:
        'Définissez les moments auxquels les rappels doivent être envoyés et consignez les échanges réalisés avec chaque client.'
    },

    fixedGuideSection:
      'Organisation des relances'
  },

  teamDocumentAccess: {
    id:
      'team-document-access',

    questionId:
      'q8',

    minimumPoints:
      6,

    title:
      'Faciliter l’accès aux documents pour les collaborateurs',

    category:
      'Organisation de l’équipe',

    observation:
      'Les collaborateurs ne semblent pas toujours retrouver rapidement les documents nécessaires à leur travail.',

    objective:
      'Permettre à chaque personne autorisée d’accéder facilement aux bonnes informations.',

    immediateAction: {
      period:
        'Cette semaine',

      title:
        'Identifier les besoins d’accès',

      description:
        'Listez les documents que chaque collaborateur doit pouvoir consulter pour accomplir ses missions.'
    },

    fifteenDayAction: {
      period:
        'Sous quinze jours',

      title:
        'Créer un espace partagé organisé',

      description:
        'Mettez en place un espace commun avec des dossiers clairement nommés et des droits d’accès adaptés.'
    },

    thirtyDayAction: {
      period:
        'Sous trente jours',

      title:
        'Formaliser les règles d’utilisation',

      description:
        'Expliquez à l’équipe où enregistrer les nouveaux documents et comment éviter les doublons ou les versions contradictoires.'
    },

    fixedGuideSection:
      'Méthodes de classement des documents'
  },

  toolStructuring: {
    id:
      'tool-structuring',

    questionId:
      'q9',

    minimumPoints:
      6,

    title:
      'Structurer progressivement les outils de gestion',

    category:
      'Digitalisation',

    observation:
      'L’organisation repose principalement sur des échanges informels ou sur des outils qui ne centralisent pas suffisamment les informations.',

    objective:
      'Digitaliser progressivement les tâches utiles sans imposer un système trop complexe.',

    immediateAction: {
      period:
        'Cette semaine',

      title:
        'Recenser les outils actuellement utilisés',

      description:
        'Listez les usages de WhatsApp, des fichiers Excel, des e-mails, des téléphones et des documents papier.'
    },

    fifteenDayAction: {
      period:
        'Sous quinze jours',

      title:
        'Attribuer une fonction précise à chaque outil',

      description:
        'Déterminez quel outil doit servir au stockage, au suivi, à la communication et à la planification.'
    },

    thirtyDayAction: {
      period:
        'Sous trente jours',

      title:
        'Centraliser une première activité',

      description:
        'Choisissez un processus prioritaire, comme le suivi des factures, et regroupez-le dans un seul outil avant d’en digitaliser d’autres.'
    },

    fixedGuideSection:
      'Conseils de digitalisation progressive'
  }
};

/*
  ==========================================================
  PRIORITÉ DÉCLARÉE À LA QUESTION 10
  ==========================================================
*/

const PRIORITY_MAPPING = {
  'Mieux organiser l’entreprise': [
    'document-centralization',
    'team-document-access',
    'tool-structuring'
  ],

  'Gagner du temps': [
    'document-search-reduction',
    'tool-structuring',
    'dashboard-creation'
  ],

  'Mieux suivre les paiements': [
    'invoice-tracking',
    'payment-monitoring',
    'customer-reminder-process'
  ],

  'Digitaliser progressivement': [
    'tool-structuring',
    'dashboard-creation',
    'team-document-access'
  ]
};

/*
  ==========================================================
  ÉTAT DU QUESTIONNAIRE
  ==========================================================
*/

const state = {
  currentQuestionIndex: 0,
  answers: {},
  contact: {},
  score: 0,
  level: '',
  source: getTrafficSource()
};

/*
  ==========================================================
  ÉLÉMENTS HTML
  ==========================================================
*/

const screens = {
  intro:
    document.getElementById('intro-screen'),

  question:
    document.getElementById('question-screen'),

  contact:
    document.getElementById('contact-screen'),

  loading:
    document.getElementById('loading-screen'),

  result:
    document.getElementById('result-screen')
};

const startButton =
  document.getElementById('start-button');

const questionForm =
  document.getElementById('question-form');

const previousButton =
  document.getElementById('previous-button');

const nextButton =
  document.getElementById('next-button');

const progressLabel =
  document.getElementById('progress-label');

const progressPercent =
  document.getElementById('progress-percent');

const progressBar =
  document.getElementById('progress-bar');

const questionTitle =
  document.getElementById('question-title');

const questionHelp =
  document.getElementById('question-help');

const answersContainer =
  document.getElementById('answers-container');

const questionError =
  document.getElementById('question-error');

const contactForm =
  document.getElementById('contact-form');

const contactError =
  document.getElementById('contact-error');

const backToQuestionsButton =
  document.getElementById('back-to-questions');

const resultLevelLabel =
  document.getElementById('result-level-label');

const scoreValue =
  document.getElementById('score-value');

const scoreCircle =
  document.getElementById('score-circle');

const resultTitle =
  document.getElementById('result-title');

const resultDescription =
  document.getElementById('result-description');

const findingsList =
  document.getElementById('findings-list');

const recommendationText =
  document.getElementById('recommendation-text');

const resultActions =
  document.getElementById('result-actions');

const restartButton =
  document.getElementById('restart-button');

/*
  ==========================================================
  OUTILS GÉNÉRAUX
  ==========================================================
*/

function showScreen(screenName) {
  Object.values(screens).forEach(function (screen) {
    screen.classList.remove('active');
  });

  screens[screenName].classList.add('active');

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function trackEvent(eventName, parameters) {
  if (typeof window.gtag === 'function') {
    window.gtag(
      'event',
      eventName,
      parameters || {}
    );
  }
}

function getTrafficSource() {
  const parameters =
    new URLSearchParams(window.location.search);

  return {
    source:
      parameters.get('utm_source') ||
      document.referrer ||
      'direct',

    medium:
      parameters.get('utm_medium') ||
      '',

    campaign:
      parameters.get('utm_campaign') ||
      '',

    content:
      parameters.get('utm_content') ||
      ''
  };
}

function getWhatsAppUrl(message) {
  if (!CONFIG.WHATSAPP_NUMBER) {
    return '';
  }

  const phone =
    CONFIG.WHATSAPP_NUMBER.replace(
      /\D/g,
      ''
    );

  return (
    `https://wa.me/${phone}` +
    `?text=${encodeURIComponent(message)}`
  );
}

function createActionButton(
  label,
  url,
  cssClass,
  eventName
) {
  const link =
    document.createElement('a');

  link.className =
    `btn ${cssClass}`;

  link.textContent =
    label;

  link.href =
    url || '#';

  if (url) {
    link.target =
      '_blank';

    link.rel =
      'noopener noreferrer';
  }

  link.addEventListener(
    'click',
    function (event) {
      if (!url) {
        event.preventDefault();

        window.alert(
          'Cette fonction sera activée dès que le workflow n8n sera connecté.'
        );
      }

      trackEvent(
        eventName,
        {
          score:
            state.score,

          level:
            state.level
        }
      );
    }
  );

  return link;
}

/*
  ==========================================================
  AFFICHAGE DES QUESTIONS
  ==========================================================
*/

function renderQuestion() {
  const question =
    questions[state.currentQuestionIndex];

  const questionNumber =
    state.currentQuestionIndex + 1;

  const progress =
    Math.round(
      (questionNumber / questions.length) * 100
    );

  progressLabel.textContent =
    `Question ${questionNumber} sur ${questions.length}`;

  progressPercent.textContent =
    `${progress} %`;

  progressBar.style.width =
    `${progress}%`;

  questionTitle.textContent =
    question.title;

  questionHelp.textContent =
    question.help || '';

  questionError.textContent =
    '';

  answersContainer.innerHTML =
    '';

  question.answers.forEach(
    function (answer, answerIndex) {
      const label =
        document.createElement('label');

      label.className =
        'answer-option';

      const savedAnswer =
        state.answers[question.id];

      if (
        savedAnswer &&
        savedAnswer.answerIndex === answerIndex
      ) {
        label.classList.add('selected');
      }

      const input =
        document.createElement('input');

      input.type =
        'radio';

      input.name =
        question.id;

      input.value =
        String(answerIndex);

      input.checked =
        Boolean(
          savedAnswer &&
          savedAnswer.answerIndex === answerIndex
        );

      const marker =
        document.createElement('span');

      marker.className =
        'answer-marker';

      marker.setAttribute(
        'aria-hidden',
        'true'
      );

      const text =
        document.createElement('span');

      text.className =
        'answer-text';

      text.textContent =
        answer.label;

      input.addEventListener(
        'change',
        function () {
          document
            .querySelectorAll('.answer-option')
            .forEach(function (option) {
              option.classList.remove('selected');
            });

          label.classList.add('selected');

          questionError.textContent =
            '';
        }
      );

      label.appendChild(input);
      label.appendChild(marker);
      label.appendChild(text);

      answersContainer.appendChild(label);
    }
  );

  previousButton.style.visibility =
    state.currentQuestionIndex === 0
      ? 'hidden'
      : 'visible';

  nextButton.textContent =
    state.currentQuestionIndex === questions.length - 1
      ? 'Continuer'
      : 'Suivant';
}

function saveCurrentAnswer() {
  const question =
    questions[state.currentQuestionIndex];

  const selectedInput =
    questionForm.querySelector(
      `input[name="${question.id}"]:checked`
    );

  if (!selectedInput) {
    questionError.textContent =
      'Veuillez sélectionner une réponse avant de continuer.';

    return false;
  }

  const answerIndex =
    Number(selectedInput.value);

  const selectedAnswer =
    question.answers[answerIndex];

  state.answers[question.id] = {
    question:
      question.title,

    answer:
      selectedAnswer.label,

    answerIndex:
      answerIndex,

    points:
      selectedAnswer.points
  };

  return true;
}

/*
  ==========================================================
  CALCUL DU SCORE
  ==========================================================
*/

function calculateScore() {
  state.score =
    Object.values(state.answers).reduce(
      function (total, answer) {
        return total + answer.points;
      },
      0
    );

  if (state.score <= 39) {
    state.level =
      'faible';
  } else if (state.score <= 69) {
    state.level =
      'moyen';
  } else {
    state.level =
      'eleve';
  }
}
/*
  ==========================================================
  MOTEUR DU GUIDE PERSONNALISÉ
  ==========================================================
*/

function getDeclaredPriority(answers) {
  if (
    !answers ||
    !answers.q10 ||
    !answers.q10.answer
  ) {
    return '';
  }

  return answers.q10.answer;
}

function getPriorityPreferenceRank(
  recommendationId,
  declaredPriority
) {
  const preferredRecommendations =
    PRIORITY_MAPPING[declaredPriority] || [];

  const index =
    preferredRecommendations.indexOf(
      recommendationId
    );

  if (index === -1) {
    return 999;
  }

  return index;
}

function selectPriorityRecommendations(answers) {
  const declaredPriority =
    getDeclaredPriority(answers);

  return Object.values(RECOMMENDATION_LIBRARY)
    .filter(function (recommendation) {
      const answer =
        answers[recommendation.questionId];

      return Boolean(
        answer &&
        typeof answer.points === 'number' &&
        answer.points >= recommendation.minimumPoints
      );
    })

    .map(function (recommendation) {
      const answer =
        answers[recommendation.questionId];

      return {
        ...recommendation,

        detectedPoints:
          answer.points,

        detectedAnswer:
          answer.answer,

        preferenceRank:
          getPriorityPreferenceRank(
            recommendation.id,
            declaredPriority
          )
      };
    })

    .sort(function (recommendationA, recommendationB) {
      if (
        recommendationB.detectedPoints !==
        recommendationA.detectedPoints
      ) {
        return (
          recommendationB.detectedPoints -
          recommendationA.detectedPoints
        );
      }

      if (
        recommendationA.preferenceRank !==
        recommendationB.preferenceRank
      ) {
        return (
          recommendationA.preferenceRank -
          recommendationB.preferenceRank
        );
      }

      return recommendationA.title.localeCompare(
        recommendationB.title,
        'fr'
      );
    })

    .slice(0, 4);
}

function getGuideLevel(score) {
  if (score <= 39) {
    return {
      id:
        'faible',

      label:
        'Organisation globalement structurée',

      summary:
        'Votre entreprise dispose déjà de plusieurs bases administratives. Certaines améliorations ciblées peuvent néanmoins vous aider à gagner du temps et à renforcer votre suivi.'
    };
  }

  if (score <= 69) {
    return {
      id:
        'moyen',

      label:
        'Plusieurs axes d’amélioration',

      summary:
        'Votre organisation présente plusieurs points d’amélioration pouvant affecter le suivi administratif, la visibilité et la gestion des paiements.'
    };
  }

  return {
    id:
      'eleve',

    label:
      'Attention prioritaire recommandée',

    summary:
      'Vos réponses font apparaître plusieurs difficultés importantes. Un accompagnement prioritaire est recommandé afin de structurer votre organisation administrative.'
  };
}

function getCompanySizeContext(answers) {
  const companySizeAnswer =
    answers &&
    answers.q1 &&
    answers.q1.answer
      ? answers.q1.answer
      : '';

  const contexts = {
    'Je travaille seul':
      'Les recommandations sont formulées pour une organisation individuelle et doivent rester simples à maintenir au quotidien.',

    '2 à 5 personnes':
      'Les recommandations tiennent compte d’une petite équipe dans laquelle les responsabilités administratives doivent être clairement réparties.',

    '6 à 20 personnes':
      'Les recommandations tiennent compte d’une équipe structurée nécessitant des règles communes et une meilleure coordination documentaire.',

    'Plus de 20 personnes':
      'Les recommandations tiennent compte d’une organisation plus importante, nécessitant des responsabilités définies, des accès maîtrisés et des procédures partagées.'
  };

  return {
    answer:
      companySizeAnswer,

    context:
      contexts[companySizeAnswer] ||
      'Les recommandations doivent être adaptées à la taille et au fonctionnement réel de l’entreprise.'
  };
}

function formatGuidePriority(
  recommendation,
  priorityIndex
) {
  return {
    order:
      priorityIndex + 1,

    id:
      recommendation.id,

    title:
      recommendation.title,

    category:
      recommendation.category,

    detectedQuestionId:
      recommendation.questionId,

    detectedAnswer:
      recommendation.detectedAnswer,

    detectedPoints:
      recommendation.detectedPoints,

    observation:
      recommendation.observation,

    objective:
      recommendation.objective,

    actions: [
      {
        period:
          recommendation.immediateAction.period,

        title:
          recommendation.immediateAction.title,

        description:
          recommendation.immediateAction.description
      },

      {
        period:
          recommendation.fifteenDayAction.period,

        title:
          recommendation.fifteenDayAction.title,

        description:
          recommendation.fifteenDayAction.description
      },

      {
        period:
          recommendation.thirtyDayAction.period,

        title:
          recommendation.thirtyDayAction.title,

        description:
          recommendation.thirtyDayAction.description
      }
    ],

    fixedGuideSection:
      recommendation.fixedGuideSection
  };
}

function buildPersonalizedGuideData({
  answers,
  score,
  contact
}) {
  const safeAnswers =
    answers || {};

  const safeContact =
    contact || {};

  const numericScore =
    Number.isFinite(Number(score))
      ? Number(score)
      : 0;

  const level =
    getGuideLevel(numericScore);

  const declaredPriority =
    getDeclaredPriority(safeAnswers);

  const companySize =
    getCompanySizeContext(safeAnswers);

  const selectedRecommendations =
    selectPriorityRecommendations(safeAnswers);

  const priorities =
    selectedRecommendations.map(
      function (recommendation, index) {
        return formatGuidePriority(
          recommendation,
          index
        );
      }
    );

  return {
    guide: {
      name:
        'Guide personnalisé d’amélioration administrative',

      version:
        '1.0',

      generatedAt:
        new Date().toISOString(),

      documentType:
        'Guide d’orientation gratuit',

      disclaimer:
        'Ce document ne constitue pas un diagnostic administratif complet, juridique, fiscal, comptable ou financier.'
    },

    company: {
      name:
        safeContact.company || '',

      activity:
        safeContact.activity || '',

      city:
        safeContact.city || '',

      employees:
        safeContact.employees ||
        companySize.answer ||
        '',

      sizeContext:
        companySize.context
    },

    recipient: {
      firstName:
        safeContact.firstName || '',

      lastName:
        safeContact.lastName || '',

      email:
        safeContact.email || '',

      phone:
        safeContact.phone || ''
    },

    diagnostic: {
      score:
        numericScore,

      maximumScore:
        100,

      levelId:
        level.id,

      levelLabel:
        level.label,

      levelSummary:
        level.summary,

      declaredPriority:
        declaredPriority,

      numberOfPriorities:
        priorities.length
    },

    priorities:
      priorities,

    generationRules: {
      maximumPriorities:
        4,

      aiCanRephrase:
        true,

      aiCanCreateNewRecommendations:
        false,

      aiCanAddLegalAdvice:
        false,

      aiCanAddTaxAdvice:
        false,

      aiCanAddAccountingAdvice:
        false,

      aiCanAddFinancialAdvice:
        false,

      aiCanPromiseResults:
        false
    }
  };
}

/*
  ==========================================================
  ÉLÉMENTS IMPORTANTS AFFICHÉS À L’ÉCRAN
  ==========================================================
*/

function getImportantFindings() {
  const recommendations =
    selectPriorityRecommendations(state.answers);

  if (recommendations.length === 0) {
    return [
      'Votre organisation dispose déjà de bases relativement structurées.'
    ];
  }

  return recommendations.map(
    function (recommendation) {
      return recommendation.title;
    }
  );
}

/*
  ==========================================================
  AFFICHAGE DU RÉSULTAT
  ==========================================================
*/

function renderResult() {
  scoreValue.textContent =
    String(state.score);

  findingsList.innerHTML =
    '';

  const findings =
    getImportantFindings();

  findings.forEach(function (finding) {
    const listItem =
      document.createElement('li');

    listItem.textContent =
      finding;

    findingsList.appendChild(listItem);
  });

  resultActions.innerHTML =
    '';

  /*
    ======================================================
    SCORE FAIBLE : 0 À 39
    GUIDE PERSONNALISÉ → E-MAIL → WHATSAPP
    ======================================================
  */

  if (state.level === 'faible') {
    resultLevelLabel.textContent =
      'Organisation globalement structurée';

    resultTitle.textContent =
      'Votre guide personnalisé est en préparation.';

    resultDescription.textContent =
      'Votre score indique que plusieurs éléments de votre organisation sont déjà maîtrisés. À partir de vos réponses, UADC Management prépare un guide contenant vos principales priorités et un plan d’action progressif.';

    recommendationText.textContent =
      'Votre guide personnalisé sera envoyé à l’adresse e-mail renseignée dans le questionnaire dès que le système de génération sera connecté. Vous pourrez ensuite échanger avec UADC Management sur WhatsApp.';

    scoreCircle.style.borderColor =
      '#dcefe1';

    resultActions.appendChild(
      createActionButton(
        'Recevoir mon guide personnalisé gratuit',
        '',
        'primary',
        'personalized_guide_request'
      )
    );

    resultActions.appendChild(
      createActionButton(
        'Échanger avec UADC sur WhatsApp',
        getWhatsAppUrl(
          `Bonjour UADC Management, je viens de terminer l’évaluation de mon entreprise avec un score de ${state.score}/100. Je souhaite obtenir une première orientation.`
        ),
        'secondary',
        'whatsapp_click'
      )
    );
  }

  /*
    ======================================================
    SCORE MOYEN : 40 À 69
    AUDIT OFFERT → CALENDLY
    ======================================================
  */

  if (state.level === 'moyen') {
    resultLevelLabel.textContent =
      'Plusieurs axes d’amélioration';

    resultTitle.textContent =
      'Votre organisation peut être améliorée rapidement.';

    resultDescription.textContent =
      'Votre score montre que certaines difficultés administratives peuvent vous faire perdre du temps, limiter votre visibilité ou ralentir le suivi de vos paiements.';

    recommendationText.textContent =
      'Nous vous recommandons de réserver un audit offert de 15 minutes afin d’identifier les actions prioritaires et de déterminer les améliorations les plus adaptées à votre entreprise.';

    scoreCircle.style.borderColor =
      '#f2dfbf';

    resultActions.appendChild(
      createActionButton(
        'Réserver mon audit offert de 15 minutes',
        CONFIG.CALENDLY_AUDIT_URL,
        'primary',
        'audit_booking_click'
      )
    );

    resultActions.appendChild(
      createActionButton(
        'Poser une question par e-mail',
        'mailto:Support.UADC@gmail.com?subject=Audit%20offert%20UADC%20Management',
        'secondary',
        'email_click'
      )
    );
  }

  /*
    ======================================================
    SCORE ÉLEVÉ : 70 À 100
    RENDEZ-VOUS PRIORITAIRE → CALENDLY
    ======================================================
  */

  if (state.level === 'eleve') {
    resultLevelLabel.textContent =
      'Accompagnement prioritaire recommandé';

    resultTitle.textContent =
      'Votre organisation administrative nécessite une attention prioritaire.';

    resultDescription.textContent =
      'Votre score révèle plusieurs difficultés importantes dans l’organisation des documents, le suivi administratif ou la visibilité sur votre activité.';

    recommendationText.textContent =
      'Nous vous recommandons de réserver un rendez-vous prioritaire afin d’examiner votre situation et de définir un plan d’amélioration adapté à votre entreprise.';

    scoreCircle.style.borderColor =
      '#f3c9c5';

    resultActions.appendChild(
      createActionButton(
        'Prendre un rendez-vous prioritaire',
        CONFIG.CALENDLY_PRIORITY_URL,
        'primary',
        'priority_booking_click'
      )
    );

    resultActions.appendChild(
      createActionButton(
        'Contacter UADC sur WhatsApp',
        getWhatsAppUrl(
          `Bonjour UADC Management, je viens d’obtenir un score de ${state.score}/100. Je souhaite discuter d’un accompagnement prioritaire.`
        ),
        'secondary',
        'whatsapp_click'
      )
    );
  }

  showScreen('result');

  trackEvent(
    'diagnostic_completed',
    {
      score:
        state.score,

      level:
        state.level,

      recommendation:
        getRecommendationLabel()
    }
  );
}

/*
  ==========================================================
  COLLECTE DES COORDONNÉES
  ==========================================================
*/

function collectContactData() {
  const formData =
    new FormData(contactForm);

  state.contact = {
    firstName:
      String(
        formData.get('firstName') || ''
      ).trim(),

    lastName:
      String(
        formData.get('lastName') || ''
      ).trim(),

    company:
      String(
        formData.get('company') || ''
      ).trim(),

    activity:
      String(
        formData.get('activity') || ''
      ).trim(),

    city:
      String(
        formData.get('city') || ''
      ).trim(),

    employees:
      String(
        formData.get('employees') || ''
      ).trim(),

    phone:
      String(
        formData.get('phone') || ''
      ).trim(),

    email:
      String(
        formData.get('email') || ''
      ).trim(),

    dataConsent:
      formData.get('dataConsent') === 'on',

    marketingConsent:
      formData.get('marketingConsent') === 'on'
  };
}

function validateContactForm() {
  if (!contactForm.checkValidity()) {
    contactError.textContent =
      'Veuillez compléter tous les champs obligatoires et accepter l’utilisation de vos données.';

    contactForm.reportValidity();

    return false;
  }

  const turnstileToken =
    contactForm.querySelector(
      '[name="cf-turnstile-response"]'
    )?.value;

  if (!turnstileToken) {
    contactError.textContent =
      'Veuillez compléter la vérification de sécurité.';

    return false;
  }

  contactError.textContent = '';

  return true;
}

/*
  ==========================================================
  RECOMMANDATION DU PARCOURS
  ==========================================================
*/

function getRecommendationLabel() {
  if (state.level === 'faible') {
    return 'Guide personnalisé gratuit puis orientation WhatsApp';
  }

  if (state.level === 'moyen') {
    return 'Audit offert de 15 minutes via Calendly';
  }

  return 'Rendez-vous prioritaire via Calendly';
}

/*
  ==========================================================
  PAYLOAD TRANSMIS À N8N
  ==========================================================
*/

function buildLeadPayload() {
  const personalizedGuide =
    buildPersonalizedGuideData({
      answers:
        state.answers,

      score:
        state.score,

      contact:
        state.contact
    });

  return {
    submittedAt:
      new Date().toISOString(),

    diagnosticName:
      'Évaluer l’organisation de mon entreprise',

    score:
      state.score,

    level:
      state.level,

    recommendation:
      getRecommendationLabel(),

    contact:
      state.contact,

    answers:
      state.answers,

    personalizedGuide:
      personalizedGuide,

    shouldGeneratePersonalizedGuide:
      state.level === 'faible',

    source:
      state.source,

    pageUrl:
      window.location.href,

    userAgent:
      navigator.userAgent
  };
}

/*
  ==========================================================
  ENVOI VERS N8N
  ==========================================================
*/

async function sendLeadToAutomation(payload) {
  /*
    Tant que N8N_WEBHOOK_URL est vide :

    - les données sont enregistrées localement ;
    - aucun PDF n’est généré ;
    - aucun e-mail n’est envoyé.
  */

  localStorage.setItem(
    'uadcLastDiagnostic',
    JSON.stringify(payload)
  );

  if (!CONFIG.N8N_WEBHOOK_URL) {
    console.info(
      'Mode test : aucun webhook n8n configuré.',
      payload
    );

    return {
      success:
        true,

      mode:
        'local'
    };
  }

  const response =
    await fetch(
      CONFIG.N8N_WEBHOOK_URL,
      {
        method:
          'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body:
          JSON.stringify(payload)
      }
    );

  if (!response.ok) {
    throw new Error(
      `Erreur du webhook : ${response.status}`
    );
  }

  return {
    success:
      true,

    mode:
      'n8n'
  };
}

/*
  ==========================================================
  DÉMARRAGE DU QUESTIONNAIRE
  ==========================================================
*/

startButton.addEventListener(
  'click',
  function () {
    state.currentQuestionIndex =
      0;

    renderQuestion();

    showScreen('question');

    trackEvent(
      'diagnostic_started'
    );
  }
);

/*
  ==========================================================
  VALIDATION D’UNE QUESTION
  ==========================================================
*/

questionForm.addEventListener(
  'submit',
  function (event) {
    event.preventDefault();

    if (!saveCurrentAnswer()) {
      return;
    }

    trackEvent(
      'diagnostic_step_completed',
      {
        question:
          state.currentQuestionIndex + 1
      }
    );

    if (
      state.currentQuestionIndex <
      questions.length - 1
    ) {
      state.currentQuestionIndex +=
        1;

      renderQuestion();

      return;
    }

    calculateScore();

    showScreen('contact');
  }
);

/*
  ==========================================================
  QUESTION PRÉCÉDENTE
  ==========================================================
*/

previousButton.addEventListener(
  'click',
  function () {
    if (state.currentQuestionIndex === 0) {
      return;
    }

    /*
      On sauvegarde la réponse actuelle uniquement
      lorsqu’une option est sélectionnée.
    */

    const question =
      questions[state.currentQuestionIndex];

    const selectedInput =
      questionForm.querySelector(
        `input[name="${question.id}"]:checked`
      );

    if (selectedInput) {
      saveCurrentAnswer();
    }

    state.currentQuestionIndex -=
      1;

    renderQuestion();
  }
);

/*
  ==========================================================
  RETOUR À LA DERNIÈRE QUESTION
  ==========================================================
*/

backToQuestionsButton.addEventListener(
  'click',
  function () {
    state.currentQuestionIndex =
      questions.length - 1;

    renderQuestion();

    showScreen('question');
  }
);

/*
  ==========================================================
  VALIDATION DU FORMULAIRE DE CONTACT
  ==========================================================
*/

contactForm.addEventListener(
  'submit',
  async function (event) {
    event.preventDefault();

    if (!validateContactForm()) {
      return;
    }

    collectContactData();

    calculateScore();

    const payload =
      buildLeadPayload();

    showScreen('loading');

    try {
      const automationResult =
        await sendLeadToAutomation(payload);

      trackEvent(
        'lead_created',
        {
          score:
            state.score,

          level:
            state.level,

          personalizedGuideRequested:
            state.level === 'faible',

          automationMode:
            automationResult.mode
        }
      );

      window.setTimeout(
        renderResult,
        1100
      );
    } catch (error) {
      console.error(
        'Erreur pendant l’envoi du diagnostic :',
        error
      );

      showScreen('contact');

      contactError.textContent =
        'Une erreur est survenue pendant l’enregistrement. Veuillez réessayer ou contacter Support.UADC@gmail.com.';
    }
  }
);

/*
  ==========================================================
  RECOMMENCER LE QUESTIONNAIRE
  ==========================================================
*/

restartButton.addEventListener(
  'click',
  function () {
    state.currentQuestionIndex =
      0;

    state.answers =
      {};

    state.contact =
      {};

    state.score =
      0;

    state.level =
      '';

    state.source =
      getTrafficSource();

    questionForm.reset();

    contactForm.reset();

    questionError.textContent =
      '';

    contactError.textContent =
      '';

    progressLabel.textContent =
      '';

    progressPercent.textContent =
      '';

    progressBar.style.width =
      '0%';

    findingsList.innerHTML =
      '';

    resultActions.innerHTML =
      '';

    showScreen('intro');

    trackEvent(
      'diagnostic_restarted'
    );
  }
);
