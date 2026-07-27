'use strict';

/*
  ==========================================================
  UADC MANAGEMENT — QUESTIONNAIRE INTELLIGENT V3.0
  ==========================================================

  Architecture officielle du tunnel :

  - Score faible (0 à 39)
    → Guide PDF gratuit
    → WhatsApp
    → CRM via n8n
    → Relances automatiques

  - Score moyen (40 à 69)
    → Audit offert de 15 minutes
    → Réservation via Calendly
    → CRM via n8n
    → Relances automatiques

  - Score élevé (70 à 100)
    → Rendez-vous prioritaire
    → Réservation via Calendly
    → CRM via n8n
    → Relances automatiques

  Configuration restante :

  1. WHATSAPP_NUMBER : à renseigner plus tard
  2. CALENDLY_AUDIT_URL : configuré
  3. CALENDLY_PRIORITY_URL : configuré
  4. GUIDE_PDF_URL : à renseigner
  5. N8N_WEBHOOK_URL : à renseigner
*/

const CONFIG = {
  WHATSAPP_NUMBER: '',

  CALENDLY_AUDIT_URL:
    'https://calendly.com/support-uadc/diagnostic-gratuit',

  CALENDLY_PRIORITY_URL:
    'https://calendly.com/support-uadc/diagnostic-gratuit',

  GUIDE_PDF_URL: '',

  N8N_WEBHOOK_URL: ''
};

const questions = [
  {
    id: 'q1',
    title: 'Combien de personnes travaillent dans votre entreprise ?',
    help: 'Sélectionnez la situation qui correspond le mieux à votre structure.',
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
    title: 'Où sont stockés vos documents administratifs ?',
    help: 'Devis, factures, contrats, reçus et dossiers clients.',
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
    title: 'Suivez-vous facilement vos factures clients ?',
    help: 'Pensez au statut des factures, aux échéances et aux paiements reçus.',
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
    title: 'Les paiements en attente sont-ils suivis régulièrement ?',
    help: 'Sélectionnez la fréquence qui correspond à votre fonctionnement actuel.',
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
    title: 'Combien de temps perdez-vous chaque semaine à rechercher des documents ?',
    help: 'Estimez le temps cumulé pour vous et votre équipe.',
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
    title: 'Utilisez-vous un tableau de bord pour piloter votre activité ?',
    help: 'Par exemple : factures, paiements, relances, priorités ou indicateurs.',
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
    title: 'Comment effectuez-vous les relances clients ?',
    help: 'Pensez aux factures impayées et aux échéances dépassées.',
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
    title: 'Vos collaborateurs retrouvent-ils rapidement les documents nécessaires ?',
    help: 'Répondez selon le fonctionnement réel de votre équipe.',
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
    title: 'Quels outils utilisez-vous principalement aujourd’hui ?',
    help: 'Choisissez le niveau qui correspond le mieux à votre organisation.',
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
    title: 'Quelle est votre priorité aujourd’hui ?',
    help: 'Choisissez votre besoin principal.',
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

const state = {
  currentQuestionIndex: 0,
  answers: {},
  contact: {},
  score: 0,
  level: '',
  source: getTrafficSource()
};

const screens = {
  intro: document.getElementById('intro-screen'),
  question: document.getElementById('question-screen'),
  contact: document.getElementById('contact-screen'),
  loading: document.getElementById('loading-screen'),
  result: document.getElementById('result-screen')
};

const startButton = document.getElementById('start-button');
const questionForm = document.getElementById('question-form');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

const progressLabel = document.getElementById('progress-label');
const progressPercent = document.getElementById('progress-percent');
const progressBar = document.getElementById('progress-bar');

const questionTitle = document.getElementById('question-title');
const questionHelp = document.getElementById('question-help');
const answersContainer = document.getElementById('answers-container');
const questionError = document.getElementById('question-error');

const contactForm = document.getElementById('contact-form');
const contactError = document.getElementById('contact-error');
const backToQuestionsButton = document.getElementById('back-to-questions');

const resultLevelLabel = document.getElementById('result-level-label');
const scoreValue = document.getElementById('score-value');
const scoreCircle = document.getElementById('score-circle');

const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const findingsList = document.getElementById('findings-list');
const recommendationText = document.getElementById('recommendation-text');
const resultActions = document.getElementById('result-actions');

const restartButton = document.getElementById('restart-button');

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
  const parameters = new URLSearchParams(window.location.search);

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

function renderQuestion() {
  const question = questions[state.currentQuestionIndex];

  const questionNumber = state.currentQuestionIndex + 1;

  const progress = Math.round(
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

  questionError.textContent = '';

  answersContainer.innerHTML = '';

  question.answers.forEach(function (answer, answerIndex) {
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

    input.type = 'radio';
    input.name = question.id;
    input.value = String(answerIndex);

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

        questionError.textContent = '';
      }
    );

    label.appendChild(input);
    label.appendChild(marker);
    label.appendChild(text);

    answersContainer.appendChild(label);
  });

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

    answerIndex,

    points:
      selectedAnswer.points
  };

  return true;
}

function calculateScore() {
  state.score = Object.values(
    state.answers
  ).reduce(function (total, answer) {
    return total + answer.points;
  }, 0);

  if (state.score <= 39) {
    state.level = 'faible';
  } else if (state.score <= 69) {
    state.level = 'moyen';
  } else {
    state.level = 'eleve';
  }
}

function getImportantFindings() {
  return Object.values(state.answers)
    .filter(function (answer) {
      return answer.points >= 6;
    })
    .sort(function (answerA, answerB) {
      return answerB.points - answerA.points;
    })
    .slice(0, 4)
    .map(function (answer) {
      return answer.answer;
    });
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
    link.target = '_blank';

    link.rel =
      'noopener noreferrer';
  }

  link.addEventListener(
    'click',
    function (event) {
      if (!url) {
        event.preventDefault();

        window.alert(
          'Ce lien sera activé dès que sa configuration sera terminée.'
        );
      }

      trackEvent(eventName, {
        score:
          state.score,

        level:
          state.level
      });
    }
  );

  return link;
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

function renderResult() {
  scoreValue.textContent =
    String(state.score);

  findingsList.innerHTML = '';

  const findings =
    getImportantFindings();

  if (findings.length === 0) {
    findings.push(
      'Votre organisation dispose déjà de bases relativement structurées.'
    );
  }

  findings.forEach(function (finding) {
    const listItem =
      document.createElement('li');

    listItem.textContent =
      finding;

    findingsList.appendChild(listItem);
  });

  resultActions.innerHTML = '';

  /*
    ======================================================
    SCORE FAIBLE : 0 À 39
    Guide PDF gratuit → WhatsApp
    ======================================================
  */

  if (state.level === 'faible') {
    resultLevelLabel.textContent =
      'Organisation globalement structurée';

    resultTitle.textContent =
      'Votre entreprise dispose déjà de bonnes bases.';

    resultDescription.textContent =
      'Votre score indique que plusieurs éléments de votre organisation sont déjà maîtrisés. Quelques améliorations ciblées pourraient néanmoins vous permettre de gagner du temps et de renforcer votre suivi.';

    recommendationText.textContent =
      'Nous vous recommandons de consulter notre guide pratique gratuit. Vous pourrez ensuite échanger avec UADC Management sur WhatsApp si vous souhaitez obtenir une première orientation.';

    scoreCircle.style.borderColor =
      '#dcefe1';

    resultActions.appendChild(
      createActionButton(
        'Télécharger le guide PDF gratuit',
        CONFIG.GUIDE_PDF_URL,
        'primary',
        'pdf_download'
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
    Audit offert de 15 minutes → Calendly
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
    Rendez-vous prioritaire → Calendly
    ======================================================
  */

  if (state.level === 'eleve') {
    resultLevelLabel.textContent =
      'Accompagnement prioritaire recommandé';

    resultTitle.textContent =
      'Votre organisation administrative nécessite une attention prioritaire.';

    resultDescription.textContent =
      'Votre score révèle plusieurs difficultés importantes dans l’organisation de vos documents, le suivi administratif ou la visibilité sur votre activité.';

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

  trackEvent('diagnostic_completed', {
    score:
      state.score,

    level:
      state.level,

    recommendation:
      getRecommendationLabel()
  });
}

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

  contactError.textContent = '';

  return true;
}

function buildLeadPayload() {
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

    source:
      state.source,

    pageUrl:
      window.location.href,

    userAgent:
      navigator.userAgent
  };
}

function getRecommendationLabel() {
  if (state.level === 'faible') {
    return 'Guide PDF gratuit puis orientation WhatsApp';
  }

  if (state.level === 'moyen') {
    return 'Audit offert de 15 minutes via Calendly';
  }

  return 'Rendez-vous prioritaire via Calendly';
}

async function sendLeadToAutomation(payload) {
  /*
    Tant que N8N_WEBHOOK_URL est vide,
    les données sont uniquement sauvegardées localement
    dans le navigateur pour les tests.
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
      success: true,
      mode: 'local'
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
    success: true,
    mode: 'n8n'
  };
}

startButton.addEventListener(
  'click',
  function () {
    state.currentQuestionIndex = 0;

    renderQuestion();

    showScreen('question');

    trackEvent(
      'diagnostic_started'
    );
  }
);

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
      state.currentQuestionIndex += 1;

      renderQuestion();

      return;
    }

    calculateScore();

    showScreen('contact');
  }
);

previousButton.addEventListener(
  'click',
  function () {
    if (state.currentQuestionIndex === 0) {
      return;
    }

    saveCurrentAnswer();

    state.currentQuestionIndex -= 1;

    renderQuestion();
  }
);

backToQuestionsButton.addEventListener(
  'click',
  function () {
    state.currentQuestionIndex =
      questions.length - 1;

    renderQuestion();

    showScreen('question');
  }
);

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
      await sendLeadToAutomation(payload);

      trackEvent(
        'lead_created',
        {
          score:
            state.score,

          level:
            state.level
        }
      );

      window.setTimeout(
        renderResult,
        1100
      );
    } catch (error) {
      console.error(error);

      showScreen('contact');

      contactError.textContent =
        'Une erreur est survenue pendant l’enregistrement. Veuillez réessayer ou contacter Support.UADC@gmail.com.';
    }
  }
);

restartButton.addEventListener(
  'click',
  function () {
    state.currentQuestionIndex = 0;

    state.answers = {};

    state.contact = {};

    state.score = 0;

    state.level = '';

    questionForm.reset();

    contactForm.reset();

    showScreen('intro');
  }
);
